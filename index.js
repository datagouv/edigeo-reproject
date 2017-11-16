'use strict'

const decompress = require('decompress')

const {pack} = require('./lib/tar')
const {compress} = require('./lib/bzip2')
const {getZoneByDepartement} = require('./lib/zones')
const {getReference} = require('./lib/references')
const {rewriteGEO, rewriteVEC} = require('./lib/rewrite')

async function reprojectArchive(inputArchive, depCode) {
  const ccZoneCode = getZoneByDepartement(depCode)
  const targetSrs = getReference(ccZoneCode).proj4
  const files = await decompress(inputArchive)
  const packedFiles = await pack(files.map(file => {
    if (file.path.endsWith('GEO')) {
      const newFile = {...file}
      newFile.data = rewriteGEO(file.data, ccZoneCode)
      return newFile
    }
    if (file.path.endsWith('VEC')) {
      const newFile = {...file}
      newFile.data = rewriteVEC(file.data, targetSrs)
      return newFile
    }
    return file
  }))
  return compress(packedFiles)
}

module.exports = {reprojectArchive}
