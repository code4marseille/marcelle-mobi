<template>
  <l-marker
    @click="select([car.gpsLatitude, car.gpsLongitude], car, provider) "
    :lat-lng="[car.gpsLatitude,car.gpsLongitude]"
    :visible="$store.state.map.seeCars"
  >
    <l-icon :icon-size="[40, 50]" :icon-url="require('~/assets/images/citiz_marker.svg')"></l-icon>
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
  }
}
</script>
