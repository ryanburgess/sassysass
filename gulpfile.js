var gulp        = require('gulp'),
  jsonlint      = require("gulp-jsonlint"),
  nodeunit      = require('gulp-nodeunit'),
  jshintStyle   = require('jshint-stylish'),
  eslint        = require('gulp-eslint'),
  path          = require('path');

// ESLint
gulp.task('lint', function () {
  return gulp.src(['./bin/*', './lib/commands/*'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

// JSON Lint
gulp.task('jsonlint', function() {
  return gulp.src(['./templates/json/*.json', 'package.json'])
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(jshintStyle));
});

// watch tasks
gulp.task('watch', function() {
  gulp.watch(['bin/*', 'lib/**/*'], ['lint']);
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

gulp.task('test', ['lint', 'jsonlint', 'nodeunit']);
gulp.task('default', ['watch']);
