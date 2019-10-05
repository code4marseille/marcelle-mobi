<template id="covoit">
  <l-marker :lat-lng="[carPool.lat,carPool.lng]" :visible="visible">
    <l-popup style="text-align:center" class="popup_covoit">
      <p
        style="font-weight:bold;"
        class="title text-left border-bottom pb-2"
      >{{carPool.name.replace("Aire de covoiturage ","")}}</p>
      <p class="text-left pt-2">
        <i class="fas fa-directions"></i>
        <a :href="googleMap(carPool.lat,carPool.lng)" target="_blank" class="adress">Itinéraire</a>
      </p>
    </l-popup>

    <l-icon :icon-url="marker.image" :icon-size="[30, 30]" :icon-anchor="[15,0]"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },
  props: {
    carPool: { type: Object, required: true },
    googleMap: { type: Function, required: true },
    visible: { type: Boolean, required: true }
  },
  data() {
    return {
      iconColor: {},
      marker: {
        image: require('~/assets/images/covoit.svg')
      }
    }
  },
  created() {}
}
</script>
<style lang="scss">
.popup_covoit {
  width: 200px !important;

  p {
    font-size: 14px;
  }
  .title {
    color: rgba(0, 0, 0, 0.8) !important;
    font-size: 24px;
    margin-bottom: 0px;
  }

  .adress {
    color: #0e5da4 !important;
  }

  .fas {
    color: #0e5da4;
    width: 17px;
  }
}

.leaflet-marker-icon {
  min-width: 30px !important;
  min-height: 30px !important;
}
</style>
