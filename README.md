# edigeo-reproject

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
