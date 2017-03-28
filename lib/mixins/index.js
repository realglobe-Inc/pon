/**
 * Mixin functions
 * @module mixins
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get contextMix () { return d(require('./context_mix')) },
  get taskMix () { return d(require('./task_mix')) }
}
