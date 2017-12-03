/**
 * Super simple task runner to call named functions from CLI
 * @module pon
 */

'use strict'

const define = require('./define')
const Pon = require('./pon')
const ponfile = require('./ponfile')
const isPon = require('./is_pon')

const lib = define.bind(this)

Object.assign(lib, Pon, {
  define,
  Pon,
  ponfile,
  isPon
})

module.exports = lib
