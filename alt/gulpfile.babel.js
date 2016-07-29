import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('scripts', () => {
  return gulp.src('./*.js')
    .pipe(babel())
    .pipe(gulp.dest('../build/'));
});

gulp.task('watch', () => {
  gulp.watch('./*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);