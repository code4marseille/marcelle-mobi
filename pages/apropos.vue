<template>
  <div id="aProposPage">
    <header class="px-3 py-2 d-flex">
      <h2 class="text-uppercase pt-2 text-center flex-grow-1">A PROPOS</h2>
    </header>
    <content class="d-flex justify-content-around">
      <div class="mt-5">
        <first>
          <div class="category_apropos" v-b-toggle.collapse-1>
            <p class="text_card_apropos" style="position: absolute; top: 65px; right: 20px;">Données</p>
            <img src="~/assets/images/Data.svg" class="image_data" alt style="width:220px;" />
          </div>
          <b-collapse id="collapse-1" class="mt-2">
            <b-card class="collapse_card_apropos">
              <b-list-group
                class="list-group list-group-flush links-container border-bottom"
                v-for="link in links"
                :key="link.title"
              >
                <img svg-inline :src="link.icon" alt class="icon-list-links" />
                <b-list-group-item
                  class="list-group-item"
                  :href="link.site"
                  target="_blank"
                >{{link.title}}</b-list-group-item>
              </b-list-group>
            </b-card>
          </b-collapse>
        </first>

        <second>
          <div class="category_apropos mt-4" v-b-toggle.collapse-2>
            <p
              class="text_card_apropos"
              style="position: absolute; top: 65px; right: 20px;"
            >Applications</p>
            <img src="~/assets/images/mobility.svg" class="image_mobility" alt style="width:220px;" />
          </div>
          <b-collapse id="collapse-2" class="mt-2">
            <b-card class="collapse_card_apropos">
              <b-list-group class="list-group list-group-flush">
                <b-list-group-item class="list-group-item" href="#">...</b-list-group-item>
              </b-list-group>
            </b-card>
          </b-collapse>
        </second>

        <third>
          <div class="category_apropos mt-4" v-b-toggle.collapse-3>
            <p
              class="text_card_apropos"
              style="position: absolute; top: 65px; right: 20px;"
            >Partenaires</p>
            <img
              src="~/assets/images/partenaire.svg"
              class="image_partenaire"
              alt
              style="width:220px;"
            />
          </div>
          <b-collapse id="collapse-3" class="mt-2">
            <b-card class="collapse_card_apropos">
              <b-list-group class="list-group list-group-flush">
                <b-list-group-item class="list-group-item" href="#">La ville de Marseille</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://www.departement13.fr"
                  target="_blank"
                >Departement Bouches du Rhone</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://code4marseille.fr"
                  target="_blank"
                >Code4MArseille</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://www.lecloitre13.fr"
                  target="_blank"
                >Le cloître</b-list-group-item>
                <b-list-group-item class="list-group-item" href="https://simplon.co">Simplon</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://www.lewagon.com/fr/marseille"
                  target="_blank"
                >Le Wagon</b-list-group-item>
                <b-list-group-item class="list-group-item" href="https://www.wf3.fr">WebForce3</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://www.pole-emploi.fr/accueil/"
                  target="_blank"
                >Pôle Emploi</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://missionlocalemarseille.fr"
                  target="_blank"
                >Mission Locale Marseille</b-list-group-item>
              </b-list-group>
            </b-card>
          </b-collapse>
        </third>
      </div>
    </content>
  </div>
</template>

<script>
export default {
  name: 'apropos',
  data() {
    return {
      links: [
        {
          title: 'ATMO SUD',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/atmo.svg')
        },
        {
          title: 'FLUCTUO',
          site: 'https://fluctuo.com/',
          icon: require('~/assets/images/fluctuo.svg')
        },
        {
          title: 'NAVITIA',
          site: 'https://www.navitia.io/',
          icon: require('~/assets/images/navitia.svg')
        },
        {
          title: 'OPEN WEATHER MAP',
          site: 'https://openweathermap.org/',
          icon: require('~/assets/images/openweather.svg')
        },
        {
          title: 'RTM',
          site: 'http://www.rtm.fr',
          icon: require('~/assets/images/rtm.svg')
        }
      ],
      applications: [
        {
          title: 'BIRD',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/bird.svg')
        },
        {
          title: 'CIRC',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/circ.svg')
        },
        {
          title: 'JUMP',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/jump.svg')
        },
        {
          title: 'HIVE',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/hive.svg')
        },
        {
          title: 'LIME',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/lime.svg')
        },
        {
          title: 'LE VELO',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/levelo.svg')
        },
        {
          title: 'TIER',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/tier.svg')
        },
        {
          title: 'TOTEM',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/totem.svg')
        },
        {
          title: 'VOI',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/voi.svg')
        }
      ],
      partenaires: [
        {
          title: 'CODE4MARSEILLE',
          site: 'https://code4marseille.fr/',
          icon: require('~/assets/images/code4marseille.svg')
        },
        {
          title: 'DEPARTEMENT BOUCHES DU RHONE',
          site: 'https://www.departement13.fr/',
          icon: require('~/assets/images/departementbdr.svg')
        },
        {
          title: 'LE CLOITRE',
          site: 'https://www.lecloitre13.fr',
          icon: require('~/assets/images/cloitre.svg')
        },
        {
          title: 'MISSION LOCALE MARSEILLE',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/voi.svg')
        },
        {
          title: 'PÔLE EMPLOI',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/voi.svg')
        },
        {
          title: 'SIMPLON',
          site: 'https://simplon.co/marseille-cloitre1/',
          icon: require('~/assets/images/simplon.svg')
        },
        {
          title: 'VILLE DE MARSEILLE',
          site: 'http://www.marseille.fr/',
          icon: require('~/assets/images/marseille.svg')
        },
        {
          title: 'WAGON',
          site: 'https://www.lewagon.com/fr/marseille',
          icon: require('~/assets/images/wagon.svg')
        },
        {
          title: 'WEBFORCE3',
          site: 'https://www.wf3.fr/',
          icon: require('~/assets/images/webforce3.svg')
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#aProposPage {
  .category_apropos {
    position: relative;
    width: 330px;
    height: 155px;
    background: #ffffff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 30px;
  }
  // ---------------------------
  // IMAGE DESS CARDS
  .image_data {
    position: absolute;
    bottom: -19px;
    left: -5px;
  }

  .image_mobility {
    position: absolute;
    bottom: -20px;
    left: 5px;
  }

  .image_partenaire {
    position: absolute;
    bottom: -37px;
    left: 2px;
  }
  // ---------------------------
  .text_card_apropos {
    text-transform: uppercase;
    color: #0e5da4;
  }

  .card {
    background-color: transparent !important;
    border: none !important;

    .list-group-item {
      color: white;
      background-color: transparent !important;
      padding-left: 20px;
      padding-right: 9px;
    }

    .list-group {
      flex-direction: row;
    }

    .list-group-item:active {
      color: #0e5da4;
    }

    .list-group-flush .list-group-item {
      // border-bottom-color: white;
      border-top-color: transparent;
      border-block-end-style: none;
      text-transform: uppercase;
    }

    .links-container {
      padding: 0 13px;
      width: 270px;
    }

    .icon-list-links {
      min-width: 60px;
      min-height: 55px;
    }
  }
}
</style>
