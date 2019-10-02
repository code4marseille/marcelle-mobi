<template>
  <l-marker
    @click="select(vehiculeInfos.latLng, vehicule, provider)"
    :lat-lng="vehiculeInfos.latLng"
    :visible="vehiculeInfos.visible"
  >
    <l-icon :icon="vehiculeInfos.icon"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon, LDivIcon } from 'leaflet'

export default {
  components: { LMarker, LIcon, LDivIcon },

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
            visible: this.$store.state.map.seeCars,
            icon: {
              iconUrl: require('~/assets/images/totem.svg'),
              iconSize: [40, 50]
            }
          }
        },
        citiz: vehicule => {
          return {
            latLng: [vehicule.gpsLatitude, vehicule.gpsLongitude],
            visible: this.$store.state.map.seeCars,
            icon: {
              iconUrl: require('~/assets/images/citiz_marker.svg'),
              iconSize: [40, 40]
            }
          }
        },
        bus: vehicule => {
          return {
            visible: this.$store.state.map.seeBus,
            latLng: [vehicule.latitude, vehicule.longitude],
            icon: L.divIcon({
              iconSize: null,
              html: 'test'
            })
          }
        },
        tram: vehicule => {
          return {
            visible: this.$store.state.map.seeTrams,
            latLng: [vehicule.latitude, vehicule.longitude],
            icon: L.divIcon({
              iconSize: null,
              iconUrl: html =>
                '<div class="rounded-circle" color="red">{{vehicule.nomLigneCial}}</div>'
            })
          }
        },
        lime: vehicule => {
          return {
            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots,
            icon: {
              iconSize: [30, 40],
              iconUrl: require('~/assets/images/lime.svg')
            }
          }
        },
        circ: vehicule => {
          return {
            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots,
            icon: {
              iconSize: [30, 40],
              iconUrl: require('~/assets/images/circ.svg')
            }
          }
        },
        hive: vehicule => {
          return {
            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots,
            icon: {
              iconSize: [30, 40],
              iconUrl: require('~/assets/images/hive.svg')
            }
          }
        },
        jump: vehicule => {
          return {
            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots,
            icon: {
              iconSize: [30, 40],
              iconUrl: require('~/assets/images/jump.svg')
            }
          }
        },
        tier: vehicule => {
          return {
            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots,
            icon: {
              iconSize: [30, 40],
              iconUrl: require('~/assets/images/tier.svg')
            }
          }
        },
        voi: vehicule => {
          return {
            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots,
            icon: {
              iconSize: [30, 40],
              iconUrl: require('~/assets/images/voi.svg')
            }
          }
        },
        wind: vehicule => {
          return {
            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots,
            icon: {
              iconSize: [30, 40],
              iconUrl: require('~/assets/images/wind.svg')
            }
          }
        },
        bird: vehicule => {
          return {
            latLng: [vehicule.lat, vehicule.lng],
            visible: this.$store.state.map.seeTrots,
            icon: {
              iconSize: [30, 40],
              iconUrl: require('~/assets/images/bird.svg')
            }
          }
        },
        leVelo: vehicule => {
          return {
            latLng: [vehicule.position.lat, vehicule.position.lng],
            visible: this.$store.state.map.seeBikes,
            icon: {
              iconSize: [30, 40],
              iconUrl: require('~/assets/images/iBike.svg')
            }
          }
        }
      }
      const infos = providers[this.provider]
      return infos ? infos(this.vehicule) : console.log(this.provider)
    }
  }
}
</script>
<style >
.my-div-icon {
  border-radius: 50%;
}
</style>
