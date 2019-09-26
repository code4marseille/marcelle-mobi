<template>
  <l-marker
    :lat-lng="[mariusResult[sections.geojson.coordinates[0][1]],mariusResult[sections.geojson.coordinates[0][0]]]"
  ></l-marker>
</template>

<script>
import { LMarker } from 'vue2-leaflet'

export default {
  components: { LMarker },

  props: {
    mariusResult: { type: Object, required: true },
    sections: { type: Array, required: true }
  }
}

// <l-marker  v-for="(mariusResult, i) in $store.state.marius.mariusResult" :lat-lng="[43.295336, 5.373907]"></l-marker>
</script>
