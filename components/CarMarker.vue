<template>
  <l-marker
    @click="select(carInfo['latLng'], car, provider)"
    :lat-lng="carInfo['latLng']"
    :visible="$store.state.map.seeCars"
  >
    <l-icon :icon-size="carInfo['iconSize']" :icon-url="carInfo['iconUrl']"></l-icon>
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
    carInfo() {
      const providers = {
        totem: function(car) {
          return {
            latLng: [car.position.lat, car.position.lng],
            iconUrl: require('~/assets/images/citiz_marker.svg'),
            iconSize: [40, 50]
          }
        },
        citiz: function(car) {
          return {
            latLng: [car.gpsLatitude, car.gpsLongitude],
            iconUrl: require('~/assets/images/totem.png'),
            iconSize: [40, 50]
          }
        }
      }
      console.log(providers[this.provider](this.car))

      return providers[this.provider](this.car)
    }
  }
}
</script>
