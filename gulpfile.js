var gulp        = require('gulp'),
  jshint        = require('gulp-jshint'),
  jshintStyle   = require('jshint-stylish'),
  path          = require('path');

gulp.task('jshint', function() {
  return gulp.src('./bin/*')
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStyle))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  gulp.watch('bin/*', ['jshint']);
});

gulp.task('default', ['watch']);
