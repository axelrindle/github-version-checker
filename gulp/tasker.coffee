gulp = require('gulp')

module.exports = (tasks) ->

  # loop through the task array
  tasks.forEach (name) ->

    # define a gulp task with the task's name and function
    gulp.task name, require('./tasks/' + name)

  # then return the gulp object with the created tasks
  return gulp
