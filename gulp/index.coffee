# which tasks to laod
tasks = [
  'coffeelint'
]

# load tasks
gulp = require('./tasker')(tasks)

# execute tasks
gulp.task 'default', gulp.series tasks
