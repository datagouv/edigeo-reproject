# edigeo-reproject

[![npm version](https://badge.fury.io/js/edigeo-reproject.svg)](https://badge.fury.io/js/edigeo-reproject)
[![CircleCI](https://img.shields.io/circleci/project/github/etalab/edigeo-reproject/master.svg)](https://circleci.com/gh/etalab/edigeo-reproject/tree/master)
[![codecov](https://codecov.io/gh/etalab/edigeo-reproject/branch/master/graph/badge.svg)](https://codecov.io/gh/etalab/edigeo-reproject)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Reprojection à la volée des feuilles EDIGÉO

## Pré-requis

* Node.js >= 8
* bzip2

## Utilisation côté serveur

### Installation

```bash
npm install edigeo-reproject
```

### Exemple d'utilisation

```js
const fs = require('fs')
const {promisify} = require('util')

const {reprojectArchive} = require('edigeo-reproject')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// Actuellement l'opérateur await ne fonctionne que dans une fonction asynchrone
async function doJob() {
  const originalArchive = await readFile('/path/to/edigeo-54XXXYYYZZ0000.tar.bz2')
  const reprojectedArchive = await reprojectArchive(originalArchive, '54', 'L93toCC') // L93toCC ou CCtoL93
  await writeFile('/path/to/edigeocc-54XXXYYYZZ0000.tar.bz2', reprojectedArchive)
}

doJob().catch(console.error)
```

## Utilisation en ligne de commande

### Installation

```bash
npm install -g edigeo-reproject
```

### Exemple d'utilisation

```bash
curl /path/to/edigeo-54084000AB01.tar.bz2 | edigeo-reproject -d 54 -m L93toCC > edigeocc-54084000AB01.tar.bz2
# ou directement à partir d'une ressource distante
curl https://cadastre.data.gouv.fr/data/dgfip-pci-vecteur/2017-10-12/edigeo/feuilles/54/54084/edigeo-54084000AB01.tar.bz2 | edigeo-reproject -d 54 -m L93toCC > edigeocc-54084000AB01.tar.bz2
```

## Licence

MIT
