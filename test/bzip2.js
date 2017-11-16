const test = require('ava')
const decompressBzip2 = require('decompress-bzip2')
const {compress} = require('../lib/bzip2')

test(async t => {
  const inputBuffer = Buffer.from('Hello world!')
  t.is(inputBuffer.length, 12)
  const compressedBuffer = await compress(inputBuffer)
  t.true(compressedBuffer.length !== 12)
  const decompressedBuffer = (await decompressBzip2()(compressedBuffer))[0].data
  t.is(decompressedBuffer.toString(), 'Hello world!')
})
