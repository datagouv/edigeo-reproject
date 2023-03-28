# edigeo-reproject

[![npm version](https://badge.fury.io/js/edigeo-reproject.svg)](https://badge.fury.io/js/edigeo-reproject)
[![CircleCI](https://img.shields.io/circleci/project/github/etalab/edigeo-reproject/master.svg)](https://circleci.com/gh/etalab/edigeo-reproject/tree/master)
[![codecov](https://codecov.io/gh/etalab/edigeo-reproject/branch/master/graph/badge.svg)](https://codecov.io/gh/etalab/edigeo-reproject)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Reprojection à la volée des feuilles EDIGÉO

## Pré-requis

* Node.js >= 8 (pour `edigeo-reproject@0.2.0`), Node.js >= 10 pour ES6 (package courant)
* bzip2

## Utilisation côté serveur

### Installation

```bash
npm install @etalab/edigeo-reproject
```

If you need to use CommonJS syntax, you will need to use the package version 0.2.0 and install it with `npm install edigeo-reproject@0.2.0`

### Exemple d'utilisation

Get sample data

```
wget https://cadastre.data.gouv.fr/data/dgfip-pci-vecteur/2023-01-01/edigeo/feuilles/54/54008/edigeo-540080000C01.tar.bz2
```

#### Sample for ES6 syntax

A file `index-es6.mjs` as below

```js
import { readFile, writeFile } from 'fs/promises'
import { reprojectArchive } from 'edigeo-reproject'

// Actuellement l'opérateur await ne fonctionne que dans une fonction asynchrone
async function doJob() {
  const originalArchive = await readFile('edigeo-540080000C01.tar.bz2')
  const reprojectedArchive = await reprojectArchive(originalArchive, '54', 'L93toCC') // L93toCC ou CCtoL93
  await writeFile('edigeo-cc-540080000C01.tar.bz2', reprojectedArchive)
}

doJob().catch(console.error)
```


#### Sample for CommonJS syntax

It works only if using `edigeo-reproject@0.2.0` package.

A file `index-commonjs.js` as below

```js
const fs = require('fs')
const fsPromises = fs.promises // Available with Node 10+
const {reprojectArchive} = require('edigeo-reproject')

// Actuellement l'opérateur await ne fonctionne que dans une fonction asynchrone
async function doJob() {
  const originalArchive = await fsPromises.readFile('edigeo-540080000C01.tar.bz2')
  const reprojectedArchive = await reprojectArchive(originalArchive, '54', 'L93toCC') // L93toCC ou CCtoL93
  await fsPromises.writeFile('edigeo-cc-540080000C01.tar.bz2', reprojectedArchive)
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
curl edigeo-540080000C01.tar.bz2 | edigeo-reproject -d 54 -m L93toCC > edigeo-cc-540080000C01.tar.bz2
# ou directement à partir d'une ressource distante
curl https://cadastre.data.gouv.fr/data/dgfip-pci-vecteur/2023-01-01/edigeo/feuilles/54/54008/edigeo-540080000C01.tar.bz2 | edigeo-reproject -d 54 -m L93toCC > edigeo-cc-540080000C01.tar.bz2
```

## Licence

MIT
