'use strict'

const pon = require('pon')

async function tryNested () {
  const run = pon({
    // Just pass a async function to define custom task
    async yell () { /* ... */ },
    // Arrayed functions runs sequentially
    swing: [ async function up () { /* ... */ }, async function down () { /* ... */ } ],
    fitness: {
      async walk () { /* ... */ },
      async run () { /* ... */ },
      // Default call
      default: [ 'fitness/walk', 'fitness/run' ]
    },
    // Call another tasks
    yellAndRun: [ 'yell', 'fitness/run' ]
  })

  await run('yell', 'swing') // Runs tasks sequentially
  await run('fitness/*') // By pattern
  await run('fitness') // Same as call `await run('fitness.default')
  await run('yellAndRun') // Call another tasks
}

tryNested()
