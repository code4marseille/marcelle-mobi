<template>
  <l-marker
    @click="select(vehiculeInfos.latLng, vehiculeInfo, provider)"
    :lat-lng="vehiculeInfos.latLng"
    :visible="$store.state.map.vehiculeInfos"
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
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            visible: '$store.state.map.seeCars'
          }
        },
        citiz: vehicule => {
          return {
            latLng: [vehicule.gpsLatitude, vehicule.gpsLongitude],
            iconUrl: require('~/assets/images/citiz_marker.svg'),
            iconSize: [40, 40],
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            visible: '$store.state.map.seeCars'
          }
        },
        Lime: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/lime.svg'),
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            latLng: vehicule.latLng,
            visible: '$store.state.map.seeTrots'
          }
        },
        Circ: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/circ.svg'),
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            latLng: vehicule.latLng,
            visible: '$store.state.map.seeTrots'
          }
        },
        Hive: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/hive.svg'),
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            latLng: vehicule.latLng,
            visible: '$store.state.map.seeTrots'
          }
        },
        Jump: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/jump.svg'),
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            latLng: vehicule.latLng,
            visible: '$store.state.map.seeTrots'
          }
        },
        Tier: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/tier.svg'),
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            latLng: vehicule.latLng,
            visible: '$store.state.map.seeTrots'
          }
        },
        Voi: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/voi.svg'),
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            latLng: vehicule.latLng,
            visible: '$store.state.map.seeTrots'
          }
        },
        Wind: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/wind.svg'),
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            latLng: vehicule.latLng,
            visible: '$store.state.map.seeTrots'
          }
        },
        Bird: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/bird.svg'),
            click: 'select(vehiculeInfos.latLng, vehiculeInfo, provider)',
            latLng: vehicule.latLng,
            visible: '$store.state.map.seeTrots'
          }
        },
        leVelo: vehicule => {
          return {
            size: [30, 40],
            iconUrl: require('~/assets/images/iBike.svg'),
            click:
              'select([vehiculeInfo.position.lat,vehiculeInfo.position.lng], vehiculeInfo, provider)',
            latLng: [vehicule.position.lat, vehicule.position.lng],
            visible: '$store.state.map.seeBikes'
          }
        }
      }
      return providers[this.provider](this.vehicule)
    } //:visible="$store.state.map.seeCars"
  }
}
</script>
