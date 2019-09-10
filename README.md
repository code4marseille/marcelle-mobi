# marcelle-mobi

> Déplacez-vous autrement dans Marseille

## SETUP

Installer Yarn (gestionnaire de packages)

```
# OSX
brew install yarn
```
```
# Ubuntu
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

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

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
