import gulp from 'gulp';
import babel from 'gulp-babel';
import jasmineNode from 'gulp-jasmine-node';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import coveralls from 'gulp-coveralls';
import exit from 'gulp-exit';

gulp.task('default', () =>
gulp.src(['src/inverted-index.js', 'tests/inverted-index-test.js'])
.pipe((babel())).pipe(gulp.dest('dist')));

gulp.task('run-tests', ['default'], () =>
gulp.src(['tests/inverted-index-test.js'])
.pipe(jasmineNode())
);

gulp.task('coverage', () => {
  gulp.src('src/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('tests/*.js')
      .pipe(babel())
      .pipe(injectModules())
      .pipe(jasmineNode())
      .pipe(istanbul.writeReports())
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 30 } }))
      .on('end', () => {
        gulp.src('coverage/lcov.info')
        .pipe(coveralls());
      });
    });
});
