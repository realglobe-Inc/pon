/**
 * Mix context feature
 * @function contextMix
 * @param {function} BaseClass
 * @returns {function} Mixed class
 */
'use strict'

const ponContext = require('pon-context')

/** @lends contextMix */
function contextMix (BaseClass) {
  class ContextMix extends BaseClass {
    get $$contextMixed () {
      return true
    }

    constructor () {
      super(...arguments)
      const s = this
      s._contextes = []
    }

    /**
     * Create new context
     * @param {Object} [values={}] - Context values
     * @returns {PonContext}
     */
    newContext (values = {}) {
      const s = this
      let ctx = ponContext(values)
      s._contextes.push(ctx)
      return ctx
    }
  }
  return ContextMix
}

module.exports = contextMix
