<template>
  <l-marker
    @click="select(vehiculeInfos.latLng, vehicule, provider)"
    :lat-lng="vehiculeInfos.latLng"
    :visible="vehiculeInfos.visible"
  >
    <l-icon :icon-size="vehiculeInfos.iconSize" :icon-url="vehiculeInfos.iconUrl">
      <div
        v-if="isRtm"
        class="rounded-circle rtmMarker d-flex justify-content-center align-items-center"
        :style="{backgroundColor: vehicule.couleur}"
      >
        <div>{{vehicule.nomLigneCial}}</div>
      </div>
    </l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'

export default {
  components: { LMarker, LIcon },

  props: {
    vehicule: { type: Object, required: true },
    provider: { type: String, required: true },
    select: { type: Function, required: true }
  },
  computed: {
    isRtm() {
      return ['bus', 'tram', 'metro'].includes(this.provider)
    },
    vehiculeInfos() {
      const providers = {
        totem: vehicule => ({
          latLng: [vehicule.position.lat, vehicule.position.lng],
          iconUrl: require('~/assets/images/totem.svg'),
          iconSize: [30, 30],
          visible: this.$store.state.map.seeCars
        }),
        citiz: vehicule => ({
          latLng: [vehicule.gpsLatitude, vehicule.gpsLongitude],
          iconUrl: require('~/assets/images/citiz_marker.svg'),
          iconSize: [30, 30],
          visible: this.$store.state.map.seeCars
        }),
        bus: vehicule => ({
          iconUrl: require('~/assets/images/bus.svg'),
          iconSize: [30, 30],
          visible: this.$store.state.map.seeBus,
          latLng: [vehicule.latitude, vehicule.longitude]
        }),
        tram: vehicule => ({
          iconUrl: require('~/assets/images/tram.svg'),
          iconSize: [30, 30],
          visible: this.$store.state.map.seeTrams,
          latLng: [vehicule.latitude, vehicule.longitude]
        }),
        lime: vehicule => ({
          iconSize: [30, 30],
          iconUrl: require('~/assets/images/lime.svg'),
          latLng: [vehicule.lat, vehicule.lng],
          visible: this.$store.state.map.seeTrots
        }),
        circ: vehicule => ({
          iconSize: [30, 30],
          iconUrl: require('~/assets/images/circ.svg'),
          latLng: [vehicule.lat, vehicule.lng],
          visible: this.$store.state.map.seeTrots
        }),
        hive: vehicule => ({
          iconSize: [30, 30],
          iconUrl: require('~/assets/images/hive.svg'),
          latLng: [vehicule.lat, vehicule.lng],
          visible: this.$store.state.map.seeTrots
        }),
        jump: vehicule => ({
          iconSize: [30, 30],
          iconUrl: require('~/assets/images/jump.svg'),
          latLng: [vehicule.lat, vehicule.lng],
          visible: this.$store.state.map.seeTrots
        }),
        tier: vehicule => ({
          iconSize: [30, 30],
          iconUrl: require('~/assets/images/tier.svg'),
          latLng: [vehicule.lat, vehicule.lng],
          visible: this.$store.state.map.seeTrots
        }),
        voi: vehicule => ({
          iconSize: [30, 30],
          iconUrl: require('~/assets/images/voi.svg'),
          latLng: [vehicule.lat, vehicule.lng],
          visible: this.$store.state.map.seeTrots
        }),
        wind: vehicule => ({
          iconSize: [30, 30],
          iconUrl: require('~/assets/images/wind.svg'),
          latLng: [vehicule.lat, vehicule.lng],
          visible: this.$store.state.map.seeTrots
        }),
        bird: vehicule => ({
          iconSize: [30, 30],
          iconUrl: require('~/assets/images/bird.svg'),
          latLng: [vehicule.lat, vehicule.lng],
          visible: this.$store.state.map.seeTrots
        }),
        leVelo: vehicule => ({
          iconSize: [30, 30],
          iconUrl: require('~/assets/images/iBike.svg'),
          latLng: [vehicule.position.lat, vehicule.position.lng],
          visible: this.$store.state.map.seeBikes
        })
      }
      const infos = providers[this.provider]
      return infos ? infos(this.vehicule) : console.log(this.provider)
    }
  }
}
</script>
<style scoped>
.rtmMarker {
  height: 30px;
  width: 30px;
}
</style>
