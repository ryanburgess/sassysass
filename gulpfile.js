var gulp        = require('gulp'),
  jsonlint      = require("gulp-jsonlint"),
  jshint        = require('gulp-jshint'),
  jshintStyle   = require('jshint-stylish'),
  path          = require('path');

// JS Hint
gulp.task('jshint', function() {
  return gulp.src('./bin/*')
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStyle))
    .pipe(jshint.reporter('fail'));
});

// JSON Lint
gulp.task('jsonlint', function() {
  return gulp.src(['./templates/json/*.json', 'package.json'])
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(jshintStyle));
});

gulp.task('watch', function() {
  gulp.watch('bin/*', ['jshint']);
  gulp.watch(['./templates/json/*.json', 'package.json'], ['jsonlint']);
});

gulp.task('default', ['watch']);
