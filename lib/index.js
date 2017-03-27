/**
 * Web UI buider with quick setup
 * @module pon
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get mixins () { return d(require('./mixins')) },
  get pon () { return d(require('./pon')) }
}
