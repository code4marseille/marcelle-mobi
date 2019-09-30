# marcelle-mobi

> Déplacez-vous autrement dans Marseille

## SETUP

Installer ou upgrader vers NodeJS 10 https://nodejs.org/fr/download/ 

**Mac OS (avec homebrew)**
```
brew install node
**OR**
brew update 
brew upgrade node
```

**Linux (avec apt)**
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs
```

Installer Yarn (gestionnaire de packages) https://yarnpkg.com/en/docs/install

**Mac OS**
```
brew install yarn 
```

**Linux**
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

### OPTION 1 : Travailler dans l'application existante (En VueJS ou Vue+JSX ou React ou VanillaJS+Webpack)

1. Forker le repo
2. Cloner votre repo 
3. Créer une branche
4. A la fin du Hackathon : pousser votre branche sur Github et faire une Pull Request

**Cloner le repo**
```
git clone git@github.com:KevinBerthier/marcelle-mobi.git 
cd marcelle-mobi
yarn install
```
Lancer le serveur en local sur http://localhost:3000
```
yarn dev
```

### OPTION 2 : Créer votre propre projet

1. Creer un projet avec le langage de votre choix
2. Faire un repo Github
3. Me transmettre l'url de votre repo


## ACCÈS API

Endpoint : https://marcelle-mobi-api.herokuapp.com
DOCUENTATION : 

## Librairies utilisées



**Bon Hackathon !**

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
