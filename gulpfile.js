// Require modules
const gulp = require('gulp');
const coffeelint = require('gulp-coffeelint');

// Configuration
const conf = require('./coffeelint.json');
const path = 'lib/**/*.coffee';

// Task definitions
gulp.task('default', function() {
  return gulp.src(path)
    .pipe(coffeelint(conf))
    .pipe(coffeelint.reporter('coffeelint-stylish'));
});
