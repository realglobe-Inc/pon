/**
 * Simple task runner to make you happy.
 * @module pon
 */

'use strict'

const define = require('./define')
const Pon = require('./pon')
const isPon = require('./is_pon')

const lib = define.bind(this)

Object.assign(lib, Pon, {
  define,
  Pon,
  isPon
})

module.exports = lib
