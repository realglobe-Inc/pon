'use strict'

const pon = require('pon')

async function tryNested () {
  let run = pon({
    build: {
      async structure () { /* ... */ },
      async compile () { /* ... */ },
      // Default call
      default: [ 'build.structure', 'build.compile' ]
    }
  })

  await run('build')
}

tryNested()
