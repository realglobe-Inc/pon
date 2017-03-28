#!/usr/bin/env node

/**
 * Set environment variables in Travis CI
 */

process.chdir(`${__dirname}/../..`)

const { setEnv } = require('sugos-travis')
const { PublicRepo, PrivateRepo } = setEnv.presets

setEnv({
  // TODO OSS
  // values: PublicRepo,
  values: PrivateRepo
})
