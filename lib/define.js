/**
 * Create and bind pon instance
 * @function bind
 * @param {Object.<string, function|Object>} tasks - Tasks to bind
 * @returns {function} bound function
 */
'use strict'

const Pon = require('./pon')

/** @lends bind */
function bind (tasks) {
  return new Pon(tasks).bind()
}

module.exports = bind
