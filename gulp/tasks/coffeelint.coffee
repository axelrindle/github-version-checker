# require modules from npm
gulp = require 'gulp'
coffeelint = require 'gulp-coffeelint'
conf = require '../coffeelint.json'

# path to source files
path = 'lib/**/*.coffee'

task = () ->
  gulp.src(path)
    .pipe coffeelint(conf)
    .pipe coffeelint.reporter('coffeelint-stylish')

# register the task
gulp.task 'coffeelint', task
module.exports = task
