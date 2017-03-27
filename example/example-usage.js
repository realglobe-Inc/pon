'use strict'

const pon = require('pon')

const scss = require('pon-task-scss')
const browserify = require('pon-task-browserify')

async function tryExample () {
  let run = pon({
    'ui:style': scss('ui/stylesheets', 'public'),
    'ui:bundle': browserify('shim/entrypoints', 'public')
  })

  // Execute task by names
  await run('ui:style', 'ui:bundle')
}

tryExample()
