import decompress from 'decompress'
import {pack} from './lib/tar.js'
import {compress} from './lib/bzip2.js'
import {getZoneByDepartement} from './lib/zones.js'
import {getReference} from './lib/references.js'
import {rewriteGEO, rewriteVEC} from './lib/rewrite.js'

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

export {reprojectArchive, MODES}
