<template>
  <div id="aProposPage">
    <header class="px-3 py-2 d-flex">
      <h2 class="text-uppercase pt-3 text-center flex-grow-1">A PROPOS</h2>
    </header>
    <content class="d-flex justify-content-around">
      <div class="mt-5">
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
              <b-list-group-item
                class="d-flex align-items-center"
                :href="link.site"
                target="_blank"
              >
                <img svg-inline :src="link.icon" class="icon-list-links" />
                <div class="ml-3">{{link.title}}</div>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-collapse>

        <div class="category_apropos mt-4" v-b-toggle.collapse-2>
          <p
            class="text_card_apropos"
            style="position: absolute; top: 65px; right: 20px;"
          >Applications</p>
          <img src="~/assets/images/mobility.svg" class="image_mobility" alt style="width:220px;" />
        </div>
        <b-collapse id="collapse-2" class="mt-2">
          <b-card class="collapse_card_apropos">
            <b-list-group
              class="list-group list-group-flush links-container border-bottom"
              v-for="application in applications"
              :key="application.title"
            >
              <b-list-group-item
                class="d-flex align-items-center"
                :href="application.site"
                target="_blank"
              >
                <img svg-inline :src="application.icon" alt class="icon-app-list-links" />
                <div class="ml-3">{{application.title}}</div>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-collapse>

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
            <b-list-group
              class="list-group list-group-flush links-container border-bottom"
              v-for="partenaire in partenaires"
              :key="partenaire.title"
            >
              <b-list-group-item
                class="d-flex align-items-center"
                :href="partenaire.site"
                target="_blank"
              >
                <img svg-inline :src="partenaire.icon" alt class="icon-list-links" />
                <div class="ml-3">{{partenaire.title}}</div>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-collapse>
      </div>
    </content>
  </div>
</template>

<script>
export default {
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
          title: 'OPEN WEATHER',
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
          site: 'https://www.bird.co/',
          icon: require('~/assets/images/bird.svg')
        },
        {
          title: 'CIRC',
          site:
            'https://apps.apple.com/fr/app/circ-trottinettes-%C3%A9lectrique/id1446543957',
          icon: require('~/assets/images/circ.svg')
        },
        {
          title: 'JUMP',
          site: 'https://fr.jump.com/fr/fr/',
          icon: require('~/assets/images/jump.svg')
        },
        {
          title: 'HIVE',
          site: 'https://www.ridehive.com/home-fr',
          icon: require('~/assets/images/hive.svg')
        },
        {
          title: 'LIME',
          site: 'https://www.li.me/fr/page-daccueil',
          icon: require('~/assets/images/lime.svg')
        },
        {
          title: 'LE VELO',
          site: 'https://www.atmosud.org/',
          icon: require('~/assets/images/levelo.svg')
        },
        {
          title: 'TIER',
          site: 'https://www.tier.app/fr/',
          icon: require('~/assets/images/tier.svg')
        },
        {
          title: 'TOTEM',
          site: 'http://www.totem-mobi.fr/',
          icon: require('~/assets/images/totem.svg')
        },
        {
          title: 'VOI',
          site: 'https://www.voiscooters.com/fr/',
          icon: require('~/assets/images/voi.svg')
        },
        {
          title: 'CITIZ',
          site: 'https://provence.citiz.coop/',
          icon: require('~/assets/images/citiz.svg')
        }
      ],
      partenaires: [
        {
          title: 'CODE4MARSEILLE',
          site: 'https://code4marseille.fr/',
          icon: require('~/assets/images/code4marseille.svg')
        },
        {
          title: 'Conseil Départemental des Bouches-du-Rhône',
          site: 'https://www.departement13.fr/',
          icon: require('~/assets/images/departementbdr.svg')
        },

        {
          title: 'MISSION LOCALE',
          site: 'https://missionlocalemarseille.fr/',
          icon: require('~/assets/images/missionlocale.svg')
        },
        {
          title: 'PÔLE EMPLOI',
          site: 'https://www.pole-emploi.fr/accueil/',
          icon: require('~/assets/images/poleemploi.svg')
        },
        {
          title: 'VILLE DE MARSEILLE',
          site: 'http://www.marseille.fr/',
          icon: require('~/assets/images/marseille.svg')
        },

        {
          title: 'Préfecture',
          site: 'http://www.bouches-du-rhone.gouv.fr/',
          icon: require('~/assets/images/prefecture.jpg')
        },
        {
          title: 'La Grande Ecole du Numérique',
          site: 'https://www.grandeecolenumerique.fr/',
          icon: require('~/assets/images/gen.png')
        },
        {
          title: 'La CIC',
          site: 'https://www.cic.fr/fr/index.html',
          icon: require('~/assets/images/cic.png')
        },
        {
          title: 'La Métropole Marseille Provence',
          site: 'http://www.marseille-provence.fr/',
          icon: require('~/assets/images/mpm.jpeg')
        },

        {
          title: 'French Tech Aix-Marseille',
          site: 'https://lafrenchtech-aixmarseille.fr/',
          icon: require('~/assets/images/french_tech.png')
        },
        {
          title: 'Jaguar Network',
          site: 'https://www.jaguar-network.com/',
          icon: require('~/assets/images/jaguar.png')
        },
        {
          title: 'LE WAGON',
          site: 'https://www.lewagon.com/fr/marseille',
          icon: require('~/assets/images/wagon.svg')
        },
        {
          title: 'SIMPLON',
          site: 'https://simplon.co/marseille-cloitre1/',
          icon: require('~/assets/images/simplon.svg')
        },
        {
          title: '3W Academy',
          site: 'https://3wa.fr/',
          icon: require('~/assets/images/3w.png')
        },
        {
          title: 'Wild Code School',
          site: 'https://www.wildcodeschool.com/fr-FR/campus/marseille',
          icon: require('~/assets/images/wild.png')
        },
        {
          title: 'Passerelle Numérique',
          site: 'https://passerelle-numerique.fr/',
          icon: require('~/assets/images/passerelle.png')
        },
        {
          title: 'Coding Academy by Epitech ',
          site: 'https://www.coding-academy.fr/',
          icon: require('~/assets/images/coding_academy.png')
        },
        {
          title: 'La Plateforme',
          site: 'https://laplateforme.io/',
          icon: require('~/assets/images/plateforme.png')
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
      width: 70px;
      margin: 10px 0;
    }

    .icon-app-list-links {
      min-width: 35px;
      min-height: 35px;
    }
  }
}
</style>
