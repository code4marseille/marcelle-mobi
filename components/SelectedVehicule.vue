<template>
  <div id="bandeau_details" v-if="$store.state.map.selectedVehicule">
    <div class="row align-items-center px-3">
      <!--  -->
      <div class="flex1 col-2 bgLogo">
        <img class="logoVehicule" :src="vehiculeInfo.icon" />
      </div>
      <!--  -->
      <div class="flex2 descriptionVehicule col-6 text-left">
        <p class="font-weight-bold text-capitalize mb-O">{{vehiculeInfo.line1}}</p>

        <p class="mb-0">{{vehiculeInfo.line2}}</p>
        <p class="mb-0" v-if="vehiculeInfo.line3">
          <img svg-inline src="~/assets/images/iconBattery.svg" class="svgDescription" />
          {{vehiculeInfo.line3}}
        </p>
      </div>
      <!--  -->
      <div class="flex3 col-4 py-1">
        <a
          v-if="$device.isIos && vehiculeInfo.linkIos"
          :href="vehiculeInfo.linkIos"
          class="btn buttonGoApp"
        >
          {{vehiculeInfo.action || `Vers l'app`}}
          <img
            svg-inline
            src="~/assets/images/openApp.svg"
            class="ml-2"
          />
        </a>

        <a
          v-else-if="$device.isMobileOrTablet && vehiculeInfo.linkApp"
          @click="openApp(vehiculeInfo.linkApp,vehiculeInfo.linkStore )"
          class="btn buttonGoApp"
        >
          {{vehiculeInfo.action || `Vers l'app`}}
          <img
            svg-inline
            src="~/assets/images/openApp.svg"
            class="ml-2"
          />
        </a>

        <a
          v-else-if="vehiculeInfo.linkBrowser"
          :href="vehiculeInfo.linkBrowser"
          target="_blank"
          class="btn buttonGoApp"
        >{{vehiculeInfo.action || 'Site web'}}</a>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openApp(linkApp, linkStore) {
      //Deep link URL for existing users with app already installed on their device
      location.href = linkApp
      //Download URL (TUNE link) for new users to download the app -->
      setTimeout(location.href = linkStore, 1000)
    }
  },
  computed: {
    vehiculeInfo() {
      const providers = {
        //Voiture Citiz
        citiz: v => {
          return {
            line1: v.name,
            line2: `Immat.: ${v.licencePlate}`,
            line3: v.fuelLevel ? `Réservoir: ${v.fuelLevel} %` : null,
            icon: require(`~/assets/images/citiz_marker.svg`),
            linkApp: `coop.lestilleuls.citiz://`,
            linkStore: `https://play.google.com/store/apps/details?id=coop.lestilleuls.citiz&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/citiz/id726185820`,
            linkBrowser: `https://citiz.coop/`
          }
        },
        totem: v => {
          return {
            line1: v.provider,
            line2: `Immat.: ${v.imat}`,
            line3: `Batterie: ${v.batteryLevel}%`,
            icon: require(`~/assets/images/totem.svg`),
            linkApp: 'com.atrioom.totem_mobi://',
            linkStore: `https://play.google.com/store/apps/details?id=com.atrioom.totem_mobi&hl=fr`,
            linkIos: `https://apps.apple.com/us/app/totem-mobi/id1328267922`,
            linkBrowser: `http://www.totem-mobi.fr/`
          }
        },
        bus: v => {
          return {
            icon: require(`~/assets/images/bus.svg`),
            line1: 'Ligne de bus N°' + v.nomLigneCial,
            linkBrowser:
              'https://www.rtm.fr/sites/default/files/' +
              v.nomLigneCial.toLowerCase() +
              'hiver_horaires.pdf'
          }
        },
        tram: v => {
          return {
            icon: require(`~/assets/images/tram.svg`),
            line1: 'ligne de tramway N°' + v.nomLigneCial,
            linkBrowser:
              'https://www.rtm.fr/sites/default/files/' +
              v.nomLigneCial.toLowerCase() +
              'hiver_horaires.pdf'
          }
        },
        leVelo: v => {
          const gmapsLink = `https://www.google.com/maps/search/?api=1&query=${v.position.lat},${v.position.lng}`
          return {
            action: 'Itinéraire',
            line1: v.address.split('-')[0],
            line2: `Vélos : ${v.availableBikes} - Places : ${v.availableBikeStands}`,
            line3: null,
            icon: require(`~/assets/images/velo.svg`),
            linkStore: gmapsLink,
            linkIos: gmapsLink,
            linkBrowser: gmapsLink
          }
        },

        // Trotinette
        lime: v => {
          return {
            line1: v.name,
            line2: null,
            line3: `Batterie: ${v.battery}%`,
            icon: require(`~/assets/images/lime.svg`),
            linkApp: `limebike://`,
            linkStore: `https://play.google.com/store/apps/details?id=com.limebike&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1`,
            linkIos: `https://itunes.apple.com/us/app/limebike-your-ride-anytime/id1199780189?ls=1&mt=8`,
            linkBrowser: `https://www.li.me/fr/page-daccueil`
          }
        },

        circ: v => {
          return {
            line1: v.provider,
            line2: null,
            line3: `Batterie: ${v.battery}%`,
            icon: require(`~/assets/images/circ.svg`),
            linkApp: `goflash://`,
            linkStore: `https://play.google.com/store/apps/details?id=com.goflash.consumer&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/circ-trottinettes-%C3%A9lectrique/id1446543957`,
            linkBrowser: `https://goflash.com/`
          }
        },

        bird: v => {
          return {
            line1: v.provider,
            line2: null,
            line3: `Batterie: ${v.battery}%`,
            icon: require(`~/assets/images/bird.svg`),
            linkApp: 'bird.android://',
            linkStore: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/bird-pr%C3%AAt-pour-lenvol/id1260842311`,
            linkBrowser: `https://www.bird.co/`
          }
        },

        tier: v => {
          return {
            line1: v.provider,
            line2: null,
            line3: `Batterie: ${v.battery}%`,
            icon: require(`~/assets/images/tier.svg`),
            linkApp: `tier://`,
            linkStore: `https://play.google.com/store/apps/details?id=com.tier.app&hl=en_US`,
            linkIos: `https://apps.apple.com/app/id1436140272?mt=8`,
            linkBrowser: `https://www.tier.app/fr/`
          }
        }
      }
      return providers[this.$store.state.map.selectedVehicule.provider](
        this.$store.state.map.selectedVehicule
      )
    }
  }
}
</script>

<style lang="scss">
#bandeau_details {
  z-index: 428;
  text-align: center;
  background-color: rgb(207, 206, 206);
  opacity: 0.9;
  width: 100%;
  box-shadow: 5px 5px 5px gray;
  height: 66%;
  left: 0;
  border-radius: 10px 10px 0px 0px;

  .logoVehicule {
    width: 50px;
    height: 60px;
  }
  .svgDescription {
    width: 20px;
  }

  .buttonGoApp {
    background: #25a9e8;
    border-radius: 100px;
    color: #ffffff !important;
    text-align: center;
    opacity: 1 !important;
    font-size: 1.3em;
    float: right;
    width: 130px;
  }
  p {
    margin-bottom: 0;
  }

  .descriptionVehicule {
    font-size: 0.9rem;
  }
}
</style>
