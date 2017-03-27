'use strict'

const pon = require('pon')

async function tryTrigger () {
  let run = pon({
    async open () { /* ... */ },
    async write () { /* ... */ },
    async close () { /* ... */ },
    // Define a combined task with array of task names.
    doFlush: [ 'open', 'write', 'close' ]
  })

  await run('doFlush')
}

tryTrigger()
