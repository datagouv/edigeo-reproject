const test = require('ava')
const decompress = require('decompress')
const {pack} = require('../lib/tar')

test(async t => {
  const file1 = {path: 'hello.txt', data: Buffer.from('Hello world!')}
  const file2 = {path: 'salut.txt', data: Buffer.from('Salut tout le monde !')}
  const packedFiles = await pack([file1, file2])
  const unpackedFiles = await decompress(packedFiles)
  t.is(unpackedFiles.length, 2)
  t.is(unpackedFiles.find(f => f.path === 'hello.txt').data.toString(), 'Hello world!')
  t.is(unpackedFiles.find(f => f.path === 'salut.txt').data.toString(), 'Salut tout le monde !')
})
