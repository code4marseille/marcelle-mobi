<template>
  <l-marker
    @click="select(vehiculeInfos.latLng, vehicule, provider)"
    :lat-lng="vehiculeInfos.latLng"
    :visible="vehiculeInfos.visible"
  >
    <l-icon :icon-size="vehiculeInfos.iconSize" :icon-url="vehiculeInfos.iconUrl"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },

  props: {
    vehicule: { type: Object, required: true },
    provider: { type: String, required: true },
    select: { type: Function, required: true }
  },
  computed: {
    vehiculeInfos() {
      const providers = {
        totem: vehicule => {
          return {
            latLng: [vehicule.position.lat, vehicule.position.lng],
            iconUrl: require('~/assets/images/totem.svg'),
            iconSize: [40, 50],
            visible: this.$store.state.map.seeCars
          }
        },
        citiz: vehicule => {
          return {
            latLng: [vehicule.gpsLatitude, vehicule.gpsLongitude],
            iconUrl: require('~/assets/images/citiz_marker.svg'),
            iconSize: [40, 40],
            visible: this.$store.state.map.seeCars
          }
        },
        bus: vehicule => {
          return {
            iconUrl: require('~/assets/images/bus.svg'),
            iconSize: [40, 40],
            visible: this.$store.state.map.seeBus,
            latLng: [vehicule.latitude, vehicule.longitude]
          }
        },
        tram: vehicule => {
          return {
            iconUrl: require('~/assets/images/tram.svg'),
            iconSize: [40, 40],
            visible: this.$store.state.map.seeTrams,
            latLng: [vehicule.latitude, vehicule.longitude]
          }
        },
        lime: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/lime.svg'),

            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots
          }
        },
        circ: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/circ.svg'),

            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots
          }
        },
        hive: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/hive.svg'),

            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots
          }
        },
        jump: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/jump.svg'),

            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots
          }
        },
        tier: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/tier.svg'),

            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots
          }
        },
        voi: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/voi.svg'),

            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots
          }
        },
        wind: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/wind.svg'),

            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots
          }
        },
        bird: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/bird.svg'),

            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots
          }
        },
        leVelo: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/iBike.svg'),

            latLng: [vehicule.position.lat, vehicule.position.lng],
            visible: this.$store.state.map.seeBikes
          }
        }
      }
      const infos = providers[this.provider]
      return infos ? infos(this.vehicule) : console.log(this.provider)
    }
  }
}
</script>
