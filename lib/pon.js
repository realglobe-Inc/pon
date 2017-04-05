/**
 * Simple task runner
 * @class Pon
 * @param {Object<string, function>} tasks
 */
'use strict'

const co = require('co')
const { PonRunner } = require('pon-runner')

/** @lends Pon */
class Pon extends PonRunner {
  get $$pon () {
    return true
  }

  /**
   * Returns runner function bound to the instance
   * @returns {ponBound} Bound function
   */
  bind () {
    const s = this
    const bound = super.bind()
    return Object.assign(bound, {
      $$pon: true
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
