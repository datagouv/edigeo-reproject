const fs = require('fs')
const {join} = require('path')
const {promisify} = require('util')

const test = require('ava')

const {printCoord, rewriteVEC, rewriteGEO} = require('../lib/rewrite')
const {getReference} = require('../lib/references')

const readFile = promisify(fs.readFile)

test('printCoord', t => {
  t.is(printCoord(1234.5679), '+1234.57')
  t.is(printCoord(-1234.899), '-1234.90')
})

test('rewriteVEC', async t => {
  const targetSrs = getReference('RGF93CC49').proj4
  const originalVEC = await readFile(join(__dirname, 'fixtures', 'edigeo-54', 'EX.VEC'))
  const expectedVEC = await readFile(join(__dirname, 'fixtures', 'edigeo-54-reprojected', 'EX.VEC'))
  const reprojectedVEC = rewriteVEC(originalVEC, targetSrs)
  t.is(reprojectedVEC.toString(), expectedVEC.toString())
})

test('rewriteGEO', async t => {
  const ignfCode = 'RGF93CC49'
  const originalGEO = await readFile(join(__dirname, 'fixtures', 'edigeo-54', 'EX.GEO'))
  const expectedGEO = await readFile(join(__dirname, 'fixtures', 'edigeo-54-reprojected', 'EX.GEO'))
  const reprojectedGEO = rewriteGEO(originalGEO, ignfCode)
  t.is(reprojectedGEO.toString(), expectedGEO.toString())
})
