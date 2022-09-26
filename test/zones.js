import test from 'ava'
import {getZoneByDepartement} from '../lib/zones.js'

test('getZoneByDepartement: known code', t => {
  t.is(getZoneByDepartement('54'), 'RGF93CC49')
  t.is(getZoneByDepartement('2A'), 'RGF93CC42')
  t.is(getZoneByDepartement('59'), 'RGF93CC50')
})

test('getZoneByDepartement: unknown code', t => {
  t.throws(() => getZoneByDepartement('971'), undefined, 'Pas de zone CC pour ce département: 971')
})
