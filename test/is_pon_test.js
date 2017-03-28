/**
 * Test case for isPon.
 * Runs with mocha.
 */
'use strict'

const isPon = require('../lib/is_pon.js')
const Pon = require('../lib/pon')
const { ok } = require('assert')
const co = require('co')

describe('is-pon', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Is pon', () => co(function * () {
    ok(isPon(new Pon({})))
    ok(!isPon(null))
    ok(!isPon(''))
    ok(!isPon(false))
    ok(!isPon({ foo: 'bar' }))
  }))
})

/* global describe, before, after, it */
