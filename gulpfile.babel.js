import gulp from 'gulp';
import babel from 'gulp-babel';
import jasmineNode from 'gulp-jasmine-node';

gulp.task('default', () =>
gulp.src(['src/inverted-index.js', 'tests/inverted-index-test.js'])
.pipe((babel())).pipe(gulp.dest('dist')));

gulp.task('test', ['default'], () =>
gulp.src(['tests/inverted-index-test.js'])
.pipe(jasmineNode())
);
