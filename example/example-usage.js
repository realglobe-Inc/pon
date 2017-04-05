'use strict'

const pon = require('pon')

const css = require('pon-task-css')
const browser = require('pon-task-browser')

async function tryExample () {
  let run = pon({
    'ui:css': css('ui/stylesheets', 'public'),
    'ui:browser': browser('shim/entrypoints', 'public')
  })

  // Execute task by names
  await run('ui:css', 'ui:browser')
}

tryExample()
