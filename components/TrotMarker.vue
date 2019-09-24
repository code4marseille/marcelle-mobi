<template>
  <l-marker
    :lat-lng="[trot.lat,trot.lng]"
    @click="select([trot.lat,trot.lng], trot, provider)"
    :visible="$store.state.map.seeTrots"
  >
    <l-icon :icon-size="[30, 40]" :icon-url="require('~/assets/images/lime.svg')"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },
  props: {
    trot: { type: Object, required: true },
    provider: { type: String, required: true },
    select: { type: Function, required: true }
  }
}
</script>
