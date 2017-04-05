/**
 * Detect pon instance or not
 * @function isPon
 * @param {*} obj
 * @returns {boolean}
 */
'use strict'

const { isRunner } = require('pon-runner')
const Pon = require('./pon')

/** @lends isPon */
function isPon (obj) {
  if (!obj) {
    return false
  }
  return isRunner(obj) || (obj instanceof Pon) || obj.$$pon
}

module.exports = isPon
