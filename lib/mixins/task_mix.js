/**
 * @function taskMix
 * @param {function} BaseClass
 * @returns {function} Mixed class
 */
'use strict'

const co = require('co')
const { flatten } = require('objnest')
const astimer = require('astimer')
const uuid = require('uuid')
const minimatch = require('minimatch')

/** @lends taskMix */
function taskMix (BaseClass) {
  /** @class */
  class TaskMixed extends BaseClass {
    get $$taskMix () {
      return true
    }

    constructor () {
      super(...arguments)
      const s = this
      s.tasks = {}
    }

    registerTasks (tasks) {
      const s = this
      for (let name of Object.keys(tasks)) {
        s.registerTask(name, tasks[ name ])
      }
    }

    registerTask (name, task) {
      const s = this
      s.tasks[ name ] = s.decorateTask(name, task)
    }

    decorateTask (name, task) {
      const s = this

      let history = []

      function taskDecoration () {
        return co(function * () {
          let timer = astimer()
          timer.tick()
          yield Promise.resolve(s.beforeTask(name))
          let result = yield Promise.resolve((task()))
          let took = timer.tick()
          yield Promise.resolve(s.afterTask(name, took))
          return result
        })
      }

      return Object.assign(taskDecoration, {
        taskName: name,
        history
      })
    }

    resolveTasks (...patterns) {
      patterns = patterns.map((pattern) => String(pattern).trim())
      const s = this
      const tasks = flatten(s.tasks)
      return Object.keys(tasks)
        .filter((name) => typeof tasks[ name ] === 'function')
        .filter((name) => patterns.some((pattern) => minimatch(name, pattern)))
        .reduce((resolved, name) => Object.assign(resolved, {
          [name]: tasks[ name ]
        }), {})
    }

    beforeTask (name) {
      const s = this
      return co(function * () {

      })
    }

    afterTask (name, took) {
      const s = this
      return co(function * () {

      })
    }
  }
  return TaskMixed
}

module.exports = taskMix
