var gulp        = require('gulp'),
  jsonlint      = require("gulp-jsonlint"),
  jshint        = require('gulp-jshint'),
  nodeunit      = require('gulp-nodeunit'),
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

// watch tasks
gulp.task('watch', function() {
  gulp.watch('bin/*', ['jshint']);
  gulp.watch(['./templates/json/*.json', 'package.json'], ['jsonlint']);
});

// nodeunit tests
gulp.task('nodeunit', function () {
  gulp.src('tests/**/*.js')
    .pipe(nodeunit({
      reporter: 'junit',
      reporterOptions: {
        output: 'test-output'
      }
    }));
});

gulp.task('test', ['jsonlint', 'jshint', 'nodeunit']);
gulp.task('default', ['watch']);
