'use strict'

const decompress = require('decompress')

const {pack} = require('./lib/tar')
const {compress} = require('./lib/bzip2')
const {getZoneByDepartement} = require('./lib/zones')
const {getReference} = require('./lib/references')
const {rewriteGEO, rewriteVEC} = require('./lib/rewrite')

const MODES = ['L93toCC', 'CCtoL93']

async function reprojectArchive(inputArchive, depCode, mode = 'L93toCC') {
  if (!MODES.includes(mode)) {
    throw new Error('mode must be L93toCC or CCtoL93')
  }
  const ccZoneCode = getZoneByDepartement(depCode)
  const ccSrs = getReference(ccZoneCode).proj4
  const files = await decompress(inputArchive)
  const packedFiles = await pack(files.map(file => {
    if (file.path.endsWith('GEO')) {
      const newFile = {...file}
      newFile.data = rewriteGEO(file.data, mode === 'L93toCC' ? ccZoneCode : 'LAMB93')
      return newFile
    }
    if (file.path.endsWith('VEC')) {
      const newFile = {...file}
      newFile.data = rewriteVEC(file.data, mode, ccSrs)
      return newFile
    }
    return file
  }))
  return compress(packedFiles)
}

module.exports = {reprojectArchive, MODES}
