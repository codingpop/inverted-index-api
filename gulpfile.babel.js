import gulp from 'gulp';
import babel from 'gulp-babel';
import report from 'gulp-istanbul-report';
import jasmineNode from 'gulp-jasmine-node';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import coveralls from 'gulp-coveralls';

gulp.task('transpile', () =>
gulp.src(['src/inverted-index.js', 'tests/inverted-index-test.js'])
.pipe(babel()).pipe(gulp.dest('dist')));

gulp.task('test', () =>
gulp.src('./coverage/coverage.json')
.pipe(report()));

gulp.task('run-test', ['transpile'], () =>
gulp.src(['tests/inverted-index-test.js'])
.pipe(jasmineNode()));

gulp.task('coverage', (cb) => {
  gulp.src(['src/inverted-index.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('tests/inverted-index-test.js')
      .pipe(babel())
      .pipe(injectModules())
      .pipe(jasmineNode())
      .pipe(istanbul.writeReports())
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 50 } }))
      .on('end', cb);
    });
});

gulp.task('coveralls', ['run-test'], () =>
gulp.src('coverage/lcov.info')
.pipe(coveralls()));

gulp.task('default', ['run-test', 'coverage', 'coveralls', 'test']);
