/**
 * Mix task feature
 * @function taskMix
 * @param {function} BaseClass
 * @returns {function} Mixed class
 */
'use strict'

const minimatch = require('minimatch')

/** @lends taskMix */
function taskMix (BaseClass) {
  /** @class */
  class TaskMixed extends BaseClass {
    get $$taskMixed () {
      return true
    }

    constructor () {
      super(...arguments)
      const s = this
      s.tasks = {}
    }

    getTask (name) {
      const s = this
      return s.tasks[ name ]
    }

    registerTasks (tasks) {
      const s = this
      for (let name of Object.keys(tasks)) {
        let task = tasks[ name ]
        s.registerTask(name, task)
      }
    }

    registerTask (name, task) {
      const s = this
      s.tasks[ name ] = task
      let subNames = Object.keys(task)
        .filter((subName) => typeof task[ subName ] === 'function')
      for (let subName of subNames) {
        s.registerTask([ name, subName ].join('/'), task[ subName ])
      }
    }

    tasksWithPatterns (...patterns) {
      patterns = patterns.map((pattern) => String(pattern).trim())
      const s = this
      const { tasks } = s
      return Object.keys(tasks)
        .filter((name) => patterns.some((pattern) => minimatch(name, pattern)))
        .reduce((resolved, name) => Object.assign(resolved, {
          [name]: tasks[ name ]
        }), {})
    }


  }
  return TaskMixed
}

module.exports = taskMix
