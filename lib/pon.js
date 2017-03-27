/**
 * Simple task runner
 * @class Pon
 * @param {Object<string, function>} tasks
 */
'use strict'

const co = require('co')
const { EventEmitter } = require('events')
const {
  taskMix,
  contextMix
} = require('./mixins')

const PonBase = [
  taskMix,
  contextMix
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
      let results = {}
      for (let pattern of patterns) {
        let tasks = s.resolveTasks(...pattern.split(','))
        let taskNames = Object.keys(tasks)
        let ctx = s.newContext({
          tasks: taskNames
        })
        let { timer, logger } = ctx
        for (let taskName of taskNames) {
          let task = tasks[ taskName ]
          timer.tick()
          logger.info(`Task "${taskName}" started...`)
          results[ taskName ] = yield Promise.resolve(task(ctx))
          let took = timer.tick()
          logger.info(`... task "${taskName}" done! (${took}ms)\n`)
        }
      }
      return results
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
