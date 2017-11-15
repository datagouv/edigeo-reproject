#!/usr/bin/env node
const argv = require('yargs').argv
const getStream = require('get-stream')

const {reprojectArchive} = require('../')

if (!argv.d && !argv.dep) {
  console.error('Le code département doit être fourni via -d ou --dep')
  console.error('')
  console.error('Exemple :')
  console.error('  $ edigeo-reproject -d 36')
  process.exit(1)
}

const depCode = argv.d || argv.dep

getStream.buffer(process.stdin)
  .then(inputArchive => reprojectArchive(inputArchive, depCode))
  .then(result => process.stdout.write(result))
