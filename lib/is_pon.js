/**
 * Detect pon instance or not
 * @function isPon
 * @param {*} obj
 * @returns {boolean}
 */
'use strict'

const Pon = require('./pon')

/** @lends isPon */
function isPon (obj) {
  if (!obj) {
    return false
  }
  return (obj instanceof Pon) || obj.$$pon
}

module.exports = isPon
