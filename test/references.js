import test from 'ava'
import {ignf2epsg, epsg2ignf, getReference} from '../lib/references.js'

test('ignf2epsg: unknown code', t => {
  t.throws(() => ignf2epsg('FAIL'), undefined, 'Unknown IGNF code: FAIL')
})

test('ignf2epsg: known code', t => {
  t.is(ignf2epsg('LAMB93'), 2154)
})

test('ignf2epsg: known code (via correction)', t => {
  t.is(ignf2epsg('RGM04'), 4471)
})

test('epsg2ignf: unknown code', t => {
  t.throws(() => epsg2ignf(1234), undefined, 'No IGNF matching code: 1234')
})

test('epsg2ignf: known code', t => {
  t.is(epsg2ignf(2154), 'LAMB93')
  t.is(epsg2ignf(4471), 'RGM04UTM38S')
})

test('getReference: known codes', t => {
  t.is(getReference('RGF93CC49').name, 'RGF93 / CC49')
  t.is(getReference(3949).name, 'RGF93 / CC49')
})

test('getReference: unknown codes', t => {
  t.throws(() => getReference('LALALA'), undefined, 'Unknown IGNF code: LALALA')
  t.throws(() => getReference(12_345_678), undefined, 'Unknown EPSG code: 12345678')
})
