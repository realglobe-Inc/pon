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
    deepEqual(results, { foo: [ 'foo finished!' ] })
  }))

  it('pattern', () => co(function * () {
    let run = new Pon({
      foo: (ctx) => co(function * () {
        yield asleep(100)
        ctx.logger.debug('Log of foo')
        return 'foo finished!'
      }),
      bar: (ctx) => co(function * () {
        yield asleep(100)
        ctx.logger.debug('Log of bar')
        return 'bar finished!'
      })
    }).bind()
    let results = yield run('*')
    deepEqual(results, {
      foo: [ 'foo finished!' ],
      bar: [ 'bar finished!' ]
    })
  }))

  it('Nested', () => co(function * () {
    let run = new Pon({
      foo: {
        bar: () => 'This is baz!'
      }
    }).bind()
    let results = yield run('foo.bar')
    deepEqual(results, { 'foo.bar': [ 'This is baz!' ] })
  }))

  it('Alias', () => co(function * () {
    let run = new Pon({
      foo: {
        bar: () => 'This is baz!'
      },
      baz: [ 'foo.bar' ]
    }).bind()
    let results = yield run('baz')
    deepEqual(results, { 'baz': [ 'This is baz!' ] })
  }))
})

/* global describe, before, after, it */
