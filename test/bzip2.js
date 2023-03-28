import {Buffer} from 'node:buffer'
import test from 'ava'
import decompressBzip2 from 'decompress-bzip2'
import {compress} from '../lib/bzip2.js'

test('bzip2 tests', async t => {
  const inputBuffer = Buffer.from('Hello world!')
  t.is(inputBuffer.length, 12)
  const compressedBuffer = await compress(inputBuffer)
  t.true(compressedBuffer.length !== 12)
  let decompressedBuffer = await decompressBzip2()(compressedBuffer)
  decompressedBuffer = decompressedBuffer[0].data
  t.is(decompressedBuffer.toString(), 'Hello world!')
})
