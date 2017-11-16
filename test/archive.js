const fs = require('fs')
const {join} = require('path')
const {promisify} = require('util')

const test = require('ava')
const decompress = require('decompress')

const {reprojectArchive} = require('../')

const readFile = promisify(fs.readFile)
const fixturesPath = join(__dirname, 'fixtures')

test('reprojectArchive: fixture archive', async t => {
  const originalArchive = await readFile(join(fixturesPath, 'edigeo-54.tar.bz2'))
  const reprojectedArchive = await reprojectArchive(originalArchive, '54')
  const result = await decompress(reprojectedArchive)

  t.is(result.length, 3)

  const expectedVEC = (await readFile(join(fixturesPath, 'edigeo-54-reprojected', 'EX.VEC'))).toString()
  const expectedTHF = (await readFile(join(fixturesPath, 'edigeo-54-reprojected', 'EX.THF'))).toString()
  const expectedGEO = (await readFile(join(fixturesPath, 'edigeo-54-reprojected', 'EX.GEO'))).toString()

  t.is(result.find(f => f.path === 'EX.VEC').data.toString(), expectedVEC)
  t.is(result.find(f => f.path === 'EX.GEO').data.toString(), expectedGEO)
  t.is(result.find(f => f.path === 'EX.THF').data.toString(), expectedTHF)
})

test('reprojectArchive: real archive', async t => {
  const originalArchive = await readFile(join(fixturesPath, 'edigeo-54084000AB01.tar.bz2'))
  const reprojectedArchive = await reprojectArchive(originalArchive, '54')
  const result = await decompress(reprojectedArchive)

  t.is(result.length, 10)
})
