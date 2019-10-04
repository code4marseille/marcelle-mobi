# marcelle-mobi
![marcelle-mobi](static/icon.png)
> Déplacez-vous autrement dans Marseille

## SETUP

1. Installer ou upgrader vers NodeJS 10 https://nodejs.org/fr/download/ 

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

2. Installer Yarn (gestionnaire de packages) https://yarnpkg.com/en/docs/install

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

### OPTION 1 : Travailler dans l'application existante 

#### En VueJS [exemple pour ajouter une page dans l'app](exemples/page.vue)
#### VueJS+JSX [exemple en JSX](exemples/jsx.vue)
#### HTML+CSS+JS [exemple Vanilla](exemples/vanilla.vue)


1. Forker le repo [Aide](https://help.github.com/en/articles/fork-a-repo)
2. Cloner votre repo 

**Cloner votre repo**
```
git clone git@github.com:VOTRE_USERNAME_GITHUB/marcelle-mobi.git 
cd marcelle-mobi
yarn install
```
Ajouter un fichier nommé `.env` à la racine du dossier de votre application, qui contient :
``` 
CODE4MARSEILLE_API_KEY=LE_TOKEN_QUI_VOUS EST_DONNÉ_LE_JOUR_DU_HACKATHON
```

Lancer le serveur en local sur http://localhost:3000
```
yarn dev
```

3. Créer une branche
4. A la fin du Hackathon : pousser votre branche sur Github et faire une Pull Request

### OPTION 2 : Créer votre propre projet

1. Creer un projet avec le langage de votre choix
2. Faire un repo Github
3. Mettre le projet en ligne
3. Me transmettre l'url de votre repo et de l'app


## ACCÈS API

DOCUMENTATION : https://documenter.getpostman.com/view/8993685/SVtN5YCA?version=latest

## Librairies utilisées
https://github.com/KevinBerthier/marcelle-mobi/network/dependencies


**Bon Hackathon !**

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
