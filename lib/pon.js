/**
 * Simple task runner
 * @class Pon
 * @param {Object<string, function>} tasks
 */
'use strict'

const co = require('co')
const { EventEmitter } = require('events')
const {
  taskMix
} = require('./mixins')

const PonBase = [
  taskMix
].reduce((Mixed, mix) => mix(Mixed), EventEmitter)

/** @lends Pon */
class Pon extends PonBase {
  constructor (tasks) {
    super()
    const s = this
    s.registerTasks(tasks)
  }

  /**
   * Run a function
   * @param {...string} patterns - Name patten(s) to run
   * @returns {Promise}
   */
  run (...patterns) {
    const s = this
    if (patterns.length === 0) {
      patterns = [ '*' ]
    }
    return co(function * () {
      for (let pattern of patterns) {
        let tasks = s.resolveTasks(...pattern.split(','))
        yield Promise.all(
          Object.keys((tasks))
            .map((name) => tasks[ name ])
            .map((task) => task())
        )
      }
    })
  }

  /**
   * Returns runner function bound to the instance
   * @returns {ponBound} Bound function
   */
  bind () {
    const s = this
    const run = s.run.bind(s)
    return Object.assign(run, {})
  }

}

module.exports = Pon

/**
 * @typedef {Object<string, function|tasks>} tasks
 */

/**
 * @typedef {function} ponBound
 */
