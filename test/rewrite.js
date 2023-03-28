import fs from 'node:fs'
import path, {join} from 'node:path'
import {promisify} from 'node:util'
import {fileURLToPath} from 'node:url'
import test from 'ava'
import {printCoord, rewriteVEC, rewriteGEO} from '../lib/rewrite.js'
import {getReference} from '../lib/references.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readFile = promisify(fs.readFile)

test('printCoord', t => {
  t.is(printCoord(1234.5679), '+1234.57')
  t.is(printCoord(-1234.899), '-1234.90')
})

test('rewriteVEC', async t => {
  const targetSrs = getReference('RGF93CC49').proj4
  const originalVEC = await readFile(join(__dirname, 'fixtures', 'edigeo-54', 'EX.VEC'))
  const expectedVEC = await readFile(join(__dirname, 'fixtures', 'edigeo-54-reprojected', 'EX.VEC'))
  const reprojectedVEC = rewriteVEC(originalVEC, 'L93toCC', targetSrs)
  t.is(reprojectedVEC.toString(), expectedVEC.toString())
})

test('rewriteGEO: supported', async t => {
  const ignfCode = 'RGF93CC49'
  const originalGEO = await readFile(join(__dirname, 'fixtures', 'edigeo-54', 'EX.GEO'))
  const expectedGEO = await readFile(join(__dirname, 'fixtures', 'edigeo-54-reprojected', 'EX.GEO'))
  const reprojectedGEO = rewriteGEO(originalGEO, ignfCode)
  t.is(reprojectedGEO.toString(), expectedGEO.toString())
})

test('rewriteGEO: not supported', async t => {
  const ignfCode = 'RGF93CC49'
  const originalGEO = await readFile(join(__dirname, 'fixtures', 'edigeo-971', 'EX.GEO'))
  t.throws(() => rewriteGEO(originalGEO, ignfCode), undefined, 'Not supported')
})
