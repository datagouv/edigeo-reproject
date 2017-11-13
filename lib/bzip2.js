'use strict'

const execa = require('execa')
const getStream = require('get-stream')

async function compress(inputBuffer) {
  const cp = execa('bzip2', {input: inputBuffer})
  const [stdout, stderr] = await Promise.all([
    getStream.buffer(cp.stdout),
    getStream(cp.stderr)
  ])
  if (stderr) {
    throw new Error('bzip2 compression has failed: ' + stderr)
  }
  return stdout
}

module.exports = {compress}
