<template>
  <l-marker
    :lat-lng="[bike.position.lat,bike.position.lng]"
    @click="select([bike.position.lat,bike.position.lng], bike, provider)"
    :visible="$store.state.map.seeBikes"
  >
    <l-icon :icon-size="[30, 40]" :icon-url="require('~/assets/images/iBike.svg')"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },
  props: {
    bike: { type: Object, required: true },
    provider: { type: String, required: true },
    select: { type: Function, required: true }
  }
}
</script>
