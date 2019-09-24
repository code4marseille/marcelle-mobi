<template>
  <div id="bandeau_details" v-if="$store.state.map.selectedVehicule !== null">
    <div class="flexContainer">
      <div class="flex1">
        <div class="bgLogo">
          <img class="logoVehicule" :src="vehiculeInfo('icon')" />
        </div>
      </div>
      <div class="flex2 descriptionVehicule">
        <p>{{vehiculeInfo('line1')}}</p>

        <p class="mb-0">{{vehiculeInfo('line2')}}</p>

        <p v-if="vehiculeInfo('line3')  !== ''">{{vehiculeInfo('line3')}}</p>
      </div>
      <div class="flex3">
        <a href="#">
          <div v-if="$device.isIos">
            <a :href="vehiculeInfo('linkIos')">
              <button type="button" class="btn buttonGoApp">Vers l'appli Ios</button>
            </a>
          </div>
          <div v-else-if="$device.isMobileOrTablet">
            <a :href="vehiculeInfo('linkAndroid')">
              <button type="button" class="btn buttonGoApp">Vers l'appli android</button>
            </a>
          </div>
          <div v-else>
            <a :href="vehiculeInfo('linkBrowser')">
              <button type="button" class="btn buttonGoApp">Vers le site web</button>
            </a>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    vehiculeInfo(key) {
      console.log(this.v)

      function providers(v) {
        return {
          //Voiture Citiz
          citiz: {
            line1: v.name,
            line2: v.licencePlate,
            line3: v.fuelLevel,
            icon: require(`~/assets/images/citiz_marker.svg`),
            linkAndroid: `https://play.google.com/store/apps/details?id=coop.lestilleuls.citiz&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/citiz/id726185820`,
            linkBrowser: `https://citiz.coop/`
          },

          //Borne vélo
          levelo: {
            line1: v.address,
            line2: `Velo dispo ${v.availableBikes}  - Place dispo : ${v.availableBikeStands}`,
            line3: '',
            icon: require(`~/assets/images/velo.svg`),
            linkAndroid: `http://www.levelo-mpm.fr/`,
            linkIos: `http://www.levelo-mpm.fr/`,
            linkBrowser: `http://www.levelo-mpm.fr/`
          },

          // Trotinette
          lime: {
            line1: v.name,
            line2: `Batterie: ${v.battery} %,`,
            line3: '',
            icon: require(`~/assets/images/lime.svg`),
            linkAndroid: `href="https://play.google.com/store/apps/details?id=com.limebike&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"`,
            linkIos: `https://itunes.apple.com/us/app/limebike-your-ride-anytime/id1199780189?ls=1&mt=8`,
            linkBrowser: `https://www.li.me/fr/page-daccueil`
          },

          circ: {
            line1: v.provider,
            line2: `Batterie: ${v.battery} %,`,
            line3: '',
            icon: require(`~/assets/images/circ.svg`),
            linkAndroid: `https://play.google.com/store/apps/details?id=com.goflash.consumer&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/circ-trottinettes-%C3%A9lectrique/id1446543957`,
            linkBrowser: `https://play.google.com/store/apps/details?id=com.goflash.consumer&hl=fr`
          },

          bird: {
            line1: v.provider,
            line2: `Batterie: ${v.battery} %,`,
            line3: '',
            icon: require(`~/assets/images/bird.svg`),
            linkAndroid: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/bird-pr%C3%AAt-pour-lenvol/id1260842311`,
            linkBrowser: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`
          },

          tier: {
            line1: v.provider,
            line2: `Batterie: ${v.battery} %`,
            line3: '',
            icon: require(`~/assets/images/tier.svg`),
            linkAndroid: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`,
            linkIos: `https://apps.apple.com/fr/app/bird-pr%C3%AAt-pour-lenvol/id1260842311`,
            linkBrowser: `https://play.google.com/store/apps/details?id=co.bird.android&hl=fr`
          }
        }
      }
      return providers(this.v)[this.v.provider][key]
    }
  },
  computed: {
    v() {
      return this.$store.state.map.selectedVehicule
    }
  }
}
</script>

<style>
#bandeau_details {
  z-index: 998;
  text-align: center;
  background-color: rgb(207, 206, 206);
  opacity: 0.9;
  width: 100%;
  box-shadow: 5px 5px 5px gray;
  height: 66%;
  left: 0;
  border-radius: 10px 10px 0px 0px;
}

.logoVehicule {
  width: 50px;
  height: 60px;
}

.buttonGoApp {
  background: #25a9e8;
  border-radius: 100px;
  color: #ffffff;
  text-align: center;
  opacity: 1 !important;
  font-size: 1.3em;
  margin: 10px;
}

.descriptionVehicule {
  font-size: 0.9rem;
}

.flexContainer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0.5rem;
}

.flex1 {
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  max-width: 30%;
  align-self: center;
}

.flex2 {
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  text-align: left;
  max-width: 45%;
  font-size: 0.7rem;
}

.flex3 {
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  align-content: center;
  font-size: 0.6rem;
  max-width: 45%;
  align-self: center;
}

.mb-0 {
  margin-bottom: 0;
}
</style>
