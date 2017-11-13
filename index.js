'use strict'

const getStream = require('get-stream')
const decompress = require('decompress')

const {pack} = require('./lib/tar')
const {compress} = require('./lib/bzip2')

async function reprojectArchive(inputStream) {
  const inputArchive = await getStream.buffer(inputStream)
  const files = await decompress(inputArchive)
  const packedFiles = await pack(files)
  return compress(packedFiles)
}

reprojectArchive(process.stdin)
  .then(result => process.stdout.write(result))
  .catch(console.error)
