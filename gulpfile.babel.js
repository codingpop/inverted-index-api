import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('default', () =>
gulp.src(['src/inverted-index.js', 'tests/inverted-index-spec.js'])
.pipe((babel())).pipe(gulp.dest('dist')));
