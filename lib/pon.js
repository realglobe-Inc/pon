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

const TICK_TASK = 'pon:task'

const PonBase = [
  taskMix,
  contextMix
].reduce((Mixed, mix) => mix(Mixed), EventEmitter)

/** @lends Pon */
class Pon extends PonBase {
  get $$pon () {
    return true
  }

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
        let tasks = s.tasksWithPatterns(...pattern.split(','))
        // Run parallel
        yield Promise.all(
          Object.keys(tasks).map((taskName) => co(function * () {
            let ctx = s.newContext({
              task: taskName
            })
            let { timer, logger } = ctx
            logger.PREFIX = `[${taskName}] `
            for (let task of [].concat(tasks[ taskName ])) {
              if (typeof task === 'object') {
                task = task.default
              }
              if (typeof task === 'string') {
                let subResults = yield s.run(task)
                for (let name of Object.keys(subResults)) {
                  results[ name ] = [ ...(results[ name ] || []), ...subResults[ name ] ]
                }
                continue
              }
              timer.tick(TICK_TASK)
              logger.info(`Task started...`)
              let result = yield Promise.resolve(task(ctx))
              results[ taskName ] = [ ...(results[ taskName ] || []), result ]
              let took = timer.tick(TICK_TASK)
              logger.info(`...done! (${took}ms)\n`)
            }
          }))
        )
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
    return Object.assign(run, {
      $$pon: true,
      bind: () => s.bind(),
      run,
      tasks: s.tasks
    })
  }

}

module.exports = Pon

/**
 * @typedef {Object<string, function|tasks>} tasks
 */

/**
 * @typedef {function} ponBound
 */
