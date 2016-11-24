const gulp = require('gulp');
const jsonlint = require('gulp-jsonlint');
const nodeunit = require('gulp-nodeunit');
const jshintStyle = require('jshint-stylish');
const eslint = require('gulp-eslint');
const path = require('path');

// ESLint
gulp.task('lint', function () {
  return gulp.src(['./bin/*', './lib/commands/*'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

// JSON Lint
gulp.task('jsonlint', function() {
  return gulp.src(['./templates/json/*.json', './*.json'])
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(jshintStyle));
});

// watch tasks
gulp.task('watch', function() {
  gulp.watch(['./*.json', './templates/json/*.json'], ['jsonlint']);
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
