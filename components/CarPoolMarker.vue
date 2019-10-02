<template>
  <l-marker :lat-lng="[carPool.lat,carPool.lng]" :visible="visible">
    <l-popup style="text-align:center" id="popupCovoit">
      <p
        style="font-weight:bold;"
        class="title text-left border-bottom pb-2"
      >{{carPool.name.replace("Aire de covoiturage ","")}}</p>
      <p class="text-left pt-2">
        <i class="fas fa-walking"></i>
        <a :href="googleMap(carPool.lat,carPool.lng)" target="_blank">
          <strong>Itinéraire</strong>
        </a>
      </p>
    </l-popup>

    <l-icon :icon-url="marker.image" style="width:40px, height:40px"></l-icon>
    <!-- <l-icon :icon-size="[40, 40]" :icon-url="require('~/assets/images/carPool.png')"></l-icon> -->
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
  created() {
    console.log(this.carPool)
  }
}
</script>
<style lang="scss">
.leaflet-marker-icon {
  width: 30px !important;
  height: 30px !important;
}
#popupCovoit {
  width: 200px;
  .title {
    color: rgba(0, 0, 0, 0.8) !important;
    font-size: 24px !important;
    margin-bottom: 0px;
  }

  p {
    font-size: 14px;
  }

  .fas {
    color: #0e5da4;
    width: 17px;
  }
}
</style>
