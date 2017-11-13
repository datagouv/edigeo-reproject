'use strict'

const tar = require('tar-stream')
const getStream = require('get-stream')

function pack(files) {
  const archive = tar.pack()
  files.forEach(file => archive.entry({name: file.path}, file.data))
  archive.finalize()
  return getStream.buffer(archive)
}

module.exports = {pack}
