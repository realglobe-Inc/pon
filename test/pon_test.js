/**
 * Test case for pon.
 * Runs with mocha.
 */
'use strict'

const Pon = require('../lib/pon.js')
const asleep = require('asleep')
const {deepEqual} = require('assert')
const co = require('co')

describe('pon', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Pon', async () => {
    let run = new Pon({
      foo: async () => {
        yield asleep(100)
        return 'foo finished!'
      }
    }).bind()
    let results = yield run('foo')
    deepEqual(results, {foo: ['foo finished!']})
  })

  it('pattern', async () => {
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
      foo: ['foo finished!'],
      bar: ['bar finished!']
    })
  })

  it('Nested', async () => {
    let run = new Pon({
      foo: {
        bar: () => 'This is baz!'
      }
    }).bind()
    let results = yield run('foo/bar')
    deepEqual(results, {'foo/bar': ['This is baz!']})
  })

  it('Alias', async () => {
    let run = new Pon({
      foo: {
        bar: () => 'This is baz!'
      },
      baz: ['foo/bar'],
      quz: ['baz']
    }).bind()
    let results = yield run('quz')
    deepEqual(results, {'foo/bar': ['This is baz!']})
  })
})

/* global describe, before, after, it */
