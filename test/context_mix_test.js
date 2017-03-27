/**
 * Test case for contextMix.
 * Runs with mocha.
 */
'use strict'

const contextMix = require('../lib/mixins/context_mix.js')
const { ok } = require('assert')
const co = require('co')

describe('context-mix', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Context mix', () => co(function * () {
    let contextMixed = contextMix(class {})
    ok(contextMixed)
  }))
})

/* global describe, before, after, it */
