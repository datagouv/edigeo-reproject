import {createRequire} from 'node:module'
import {keyBy} from 'lodash-es'

const require = createRequire(import.meta.url)
const table = require('../zones_cc.json')

const indexedEntries = keyBy(table, 'departement_code')

function getZoneByDepartement(depCode) {
  if (!(depCode in indexedEntries)) {
    throw new Error('Pas de zone CC pour ce département: ' + depCode)
  }

  return `RGF93${indexedEntries[depCode].zone_cc}`
}

export {getZoneByDepartement}
