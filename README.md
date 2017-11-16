# edigeo-reproject

[![npm version](https://badge.fury.io/js/%40etalab%2Fedigeo-reproject.svg)](https://badge.fury.io/js/%40etalab%2Fedigeo-reproject)
[![CircleCI](https://circleci.com/gh/etalab/edigeo-reproject/tree/master.svg?style=svg)](https://circleci.com/gh/etalab/edigeo-reproject/tree/master)
[![codecov](https://codecov.io/gh/etalab/edigeo-reproject/branch/master/graph/badge.svg)](https://codecov.io/gh/etalab/edigeo-reproject)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Reprojection à la volée des feuilles EDIGÉO

## Pré-requis

* Node.js >= 8
* bzip2

## Utilisation en ligne de commande

### Installation

```bash
npm install -g edigeo-reproject
```

### Exemple d'utilisation

```bash
curl https://cadastre.data.gouv.fr/data/dgfip-pci-vecteur/2017-10-12/edigeo/feuilles/54/54084/edigeo-54084000AB01.tar.bz2 | edigeo-reproject -d 54 > edigeocc-54084000AB01.tar.bz2
```

## Licence

MIT
