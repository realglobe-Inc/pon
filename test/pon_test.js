/**
 * Test case for pon.
 * Runs with mocha.
 */
'use strict'

const Pon = require('../lib/pon.js')
const asleep = require('asleep')
const assert = require('assert')
const co = require('co')

describe('pon', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Pon', () => co(function * () {
    let run = new Pon({
      foo: () => co(function * () {
        yield asleep(100)
        return 'foo finished!'
      })
    }).bind()
    yield run('foo')

  }))
})

/* global describe, before, after, it */
