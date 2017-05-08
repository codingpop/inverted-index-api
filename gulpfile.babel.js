import gulp from 'gulp';
import babel from 'gulp-babel';
import jasmineNode from 'gulp-jasmine-node';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import coveralls from 'gulp-coveralls';

gulp.task('default', () =>
gulp.src(['src/inverted-index.js', 'tests/inverted-index-test.js'])
.pipe((babel())).pipe(gulp.dest('dist')));

gulp.task('run-tests', ['default'], () =>
gulp.src(['tests/inverted-index-test.js'])
.pipe(jasmineNode())
);

gulp.task('test', (cb) => {
  gulp.src('src/inverted-index.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('tests/inverted-index-test.js')
      .pipe(babel())
      .pipe(injectModules())
      .pipe(jasmineNode())
      .pipe(istanbul.writeReports())
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }))
      .on('end', cb);
    });
});

gulp.task('coverage', ['test'], () =>
gulp.src('coverage/lcov.info')
.pipe(coveralls()));
