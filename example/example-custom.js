'use strict'

const pon = require('pon')

async function tryCustom () {
  let run = pon({
    // Just pass a async function to define custom task
    async customTask () {
      /* ... */
    }
  })

  await run()
}

tryCustom()
