import {Buffer} from 'node:buffer'
import {padStart} from 'lodash-es'
import proj4 from 'proj4'
import {getReference} from './references.js'

function printCoord(coord) {
  return coord < 0 ? coord.toFixed(2) : '+' + coord.toFixed(2)
}

const l93 = getReference('LAMB93').proj4

function rewriteVEC(inputBuffer, mode, ccSrs) {
  return rewriteBase(inputBuffer, line => {
    if (line.length < 7 || line.slice(5, 7) === '00') {
      return line
    }

    const lineType = line.slice(0, 5)
    if (['CORCC', 'CM1CC', 'CM2CC'].includes(lineType)) {
      const coords = line.slice(8).split(';').filter(Boolean).map(coord => Number.parseFloat(coord))
      const reprojCoords = mode === 'L93toCC'
        ? proj4(l93, ccSrs, coords)
        : proj4(ccSrs, l93, coords)
      const lineValue = reprojCoords.map(coord => printCoord(coord)).join(';') + ';'
      return `${lineType}${padStart(lineValue.length.toString(), 2, '0')}:${lineValue}`
    }

    return line
  })
}

function rewriteGEO(inputBuffer, ignfCode) {
  return rewriteBase(inputBuffer, line => {
    if (line.startsWith('RELSA')) {
      if (!line.includes('RGF93CC') && !line.includes('LAMB93')) {
        throw new Error('Not supported')
      }

      return `RELSA${padStart(ignfCode.length.toString(), 2, '0')}:${ignfCode}`
    }

    return line
  })
}

function rewriteBase(inputBuffer, rewriteLine) {
  const splittedContent = inputBuffer
    .toString('latin1')
    .split('\r\n')
    .map(line => rewriteLine(line))

  return Buffer.from(splittedContent.join('\r\n'), 'latin1')
}

export {printCoord, rewriteGEO, rewriteVEC}
