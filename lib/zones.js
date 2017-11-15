'use strict'

const {keyBy} = require('lodash')
const table = require('../zones_cc.json')

const indexedEntries = keyBy(table, 'departement_code')

function getZoneByDepartement(depCode) {
  if (!(depCode in indexedEntries)) {
    throw new Error('Pas de zone CC pour ce département')
  }
  return `RGF93${indexedEntries[depCode].zone_cc}`
}

module.exports = {getZoneByDepartement}
