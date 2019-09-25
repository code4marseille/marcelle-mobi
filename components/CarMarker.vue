<template>
  <l-marker
    @click="select(carInfos.latLng, car, provider)"
    :lat-lng="carInfos.latLng"
    :visible="$store.state.map.seeCars"
  >
    <l-icon :icon-size="carInfos.iconSize" :icon-url="carInfos.iconUrl"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },

  props: {
    car: { type: Object, required: true },
    provider: { type: String, required: true },
    select: { type: Function, required: true }
  },
  computed: {
    carInfos() {
      const providers = {
        totem: car => {
          return {
            latLng: [car.position.lat, car.position.lng],
            iconUrl: require('~/assets/images/totem.svg'),
            iconSize: [30, 40]
          }
        },
        citiz: car => {
          return {
            latLng: [car.gpsLatitude, car.gpsLongitude],
            iconUrl: require('~/assets/images/citiz_marker.svg'),
            iconSize: [35, 45]
          }
        }
      }
      return providers[this.provider](this.car)
    }
  }
}
</script>
