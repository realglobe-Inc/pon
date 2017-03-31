/**
 * Test case for taskMix.
 * Runs with mocha.
 */
'use strict'

const taskMix = require('../lib/mixins/task_mix.js')
const { deepEqual, ok } = require('assert')
const co = require('co')

describe('task-mix', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Task mix', () => co(function * () {
    let TaskMixed = taskMix(class {
    })
    let taskMixed = new TaskMixed({})
    ok(taskMixed)
    taskMixed.registerTasks({
      'ui:style': () => {},
      'ui:style/watch': () => {},
      'ui:react': () => {},
      'ui:react/watch': () => {},
      'ui': [ 'ui:*' ],
      'default': [ 'ui' ]

    })
    deepEqual(Object.keys(taskMixed.tasksWithPatterns('ui:*')), [ 'ui:style', 'ui:react' ])
  }))
})

/* global describe, before, after, it */
