import fs from 'node:fs'
import path, {join} from 'node:path'
import {promisify} from 'node:util'
import {fileURLToPath} from 'node:url'
import test from 'ava'
import decompress from 'decompress'
import {reprojectArchive} from '../index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readFile = promisify(fs.readFile)
const fixturesPath = join(__dirname, 'fixtures')

test('reprojectArchive: fixture archive', async t => {
  const originalArchive = await readFile(join(fixturesPath, 'edigeo-54.tar.bz2'))
  const reprojectedArchive = await reprojectArchive(originalArchive, '54')
  const result = await decompress(reprojectedArchive)

  t.is(result.length, 3)

  let expectedVEC = await readFile(join(fixturesPath, 'edigeo-54-reprojected', 'EX.VEC'))
  expectedVEC = expectedVEC.toString()
  let expectedTHF = await readFile(join(fixturesPath, 'edigeo-54-reprojected', 'EX.THF'))
  expectedTHF = expectedTHF.toString()
  let expectedGEO = await readFile(join(fixturesPath, 'edigeo-54-reprojected', 'EX.GEO'))
  expectedGEO = expectedGEO.toString()

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
