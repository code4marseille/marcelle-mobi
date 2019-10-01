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
        <p class="mb-0" v-if="vehiculeInfo.line3 !== ''">
          <img svg-inline src="~/assets/images/iconBattery.svg" class="svgDescription" />
          {{vehiculeInfo.line3}}
        </p>
      </div>
      <!--  -->
      <div class="flex3 col-4">
        <a v-if="$device.isIos" :href="vehiculeInfo.linkIos">
          <button type="button" class="btn buttonGoApp">
            Vers l'appli
            <img svg-inline src="~/assets/images/openApp.svg" />
          </button>
        </a>

        <a
          v-else-if="$device.isMobileOrTablet"
          @click="openApp(vehiculeInfo.linkApp,vehiculeInfo.linkStore )"
        >
          <button type="button" class="btn buttonGoApp">
            Vers l'appli
            <img svg-inline src="~/assets/images/openApp.svg" />
          </button>
        </a>

        <a v-else :href="vehiculeInfo.linkBrowser">
          <button type="button" class="btn buttonGoApp">Vers le site web</button>
        </a>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openApp(linkApp, linkStore) {
      console.log(linkApp, linkStore)
      //Deep link URL for existing users with app already installed on their device
      window.open(linkApp)
      //Download URL (TUNE link) for new users to download the app -->
      setTimeout(window.open(linkStore), 1000)
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
            line3: v.fuelLevel ? `Réservoir: ${v.fuelLevel} %` : '',
            icon: require(`~/assets/images/citiz_marker.svg`),
            linkApp: `coop.lestilleuls.citiz://`,
            linkStore: `https://play.google.com/store/apps/details?id=coop.lestilleuls.citiz&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/citiz/id726185820`,
            linkBrowser: `https://citiz.coop/`
          }
        },
        bus: v => {
          return {
            icon: require(`~/assets/images/bus.svg`)
          }
        },
        tram: v => {
          return {
            icon: require(`~/assets/images/tram.svg`)
          }
        },

        //Borne vélo
        leVelo: v => {
          return {
            line1: v.address,
            line2: `Velo dispo.: ${v.availableBikes} - Place dispo.: ${v.availableBikeStands}`,
            line3: '',
            icon: require(`~/assets/images/velo.svg`),
            linkStore: `http://www.levelo-mpm.fr/`,
            linkIos: `http://www.levelo-mpm.fr/`,
            linkBrowser: `http://www.levelo-mpm.fr/`
          }
        },

        // Trotinette
        lime: v => {
          return {
            line1: v.name,
            line2: '',
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
            line2: '',
            line3: `Batterie: ${v.battery}%`,
            icon: require(`~/assets/images/circ.svg`),
            linkApp: `goflash://`,
            linkStore: `https://play.google.com/store/apps/details?id=com.goflash.consumer&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/circ-trottinettes-%C3%A9lectrique/id1446543957`,
            linkBrowser: `https://play.google.com/store/apps/details?id=com.goflash.consumer&hl=fr`
          }
        },

        bird: v => {
          return {
            line1: v.provider,
            line2: '',
            line3: `Batterie: ${v.battery}%`,
            icon: require(`~/assets/images/bird.svg`),
            linkApp: 'bird.android://',
            linkStore: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/bird-pr%C3%AAt-pour-lenvol/id1260842311`,
            linkBrowser: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`
          }
        },

        tier: v => {
          return {
            line1: v.provider,
            line2: '',
            line3: `Batterie: ${v.battery}%`,
            icon: require(`~/assets/images/tier.svg`),
            linkApp: `tier://`,
            linkStore: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/bird-pr%C3%AAt-pour-lenvol/id1260842311`,
            linkBrowser: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`
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
            linkIos: `https://apps.apple.com/fr/app/bird-pr%C3%AAt-pour-lenvol/id1260842311`,
            linkBrowser: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`
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
    color: #ffffff;
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
