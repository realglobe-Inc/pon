/**
 * Test case for pon.
 * Runs with mocha.
 */
'use strict'

const Pon = require('../lib/pon.js')
const asleep = require('asleep')
const { deepEqual } = require('assert')
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
    let results = yield run('foo')
    deepEqual(results, { foo: 'foo finished!' })
  }))
})

/* global describe, before, after, it */
