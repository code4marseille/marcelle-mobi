<template>
  <l-marker :lat-lng="[parking.lat,parking.lng]" :visible="visible">
    <l-popup style="text-align:center" id="ParkingMarkerVue">
      <p style="font-weight:bold;" class="title text-left">{{parking.name}}</p>
      <p class="text-left pb-2">
        <i class="fas fa-directions"></i>
        <a
          :href="this.googleMap(parking.lat,parking.lng)"
          target="_blank"
          style="text-decoration:none"
          class="address"
        >{{parking.way}}, {{parking.pCodeSeo}} {{parking.townSeo}}</a>
      </p>
      <p v-if="parking.openingHours" class="text-left pt-2 pb-2 border-top">
        <i class="far fa-clock"></i>
        <strong>Horaires :</strong>
        {{parking.openingHours}}
      </p>
      <p v-if="parking.additionalInfo.teasing" class="text-left border-top pt-2">
        <i class="far fa-calendar-check"></i>
        {{parking.additionalInfo.teasing.replace(/<[^>]*>?/gm, '')}}
      </p>
      <p v-if="parking.additionalInfo.reservationTemplatizedUrl" class="text-left">
        <i class="fas fa-globe-americas"></i>
        <a :href="parking.additionalInfo.reservationTemplatizedUrl" target="_blank">
          <strong>Site web</strong>
        </a>
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
    parking: { type: Object, required: true },
    googleMap: { type: Function, required: true },
    visible: { type: Boolean, required: true }
  },
  data() {
    return {
      marker: {
        image: require('~/assets/images/parking_marker.svg')
      }
    }
  }
}
</script>
<style lang="scss">
#ParkingMarkerVue {
  .title {
    color: rgba(0, 0, 0, 0.8) !important;
    font-size: 24px !important;
    margin-bottom: 0px;
  }

  .address {
    color: #0e5da4 !important;
    font-size: 16px;
    margin-top: 0px;
    font-style: italic;
    text-align: left !important;
  }

  .leaflet-container a {
    color: rgba(0, 0, 0, 0.8) !important;
    font-size: 16px;
    margin-top: 0px;
    font-style: italic;
    text-align: left !important;
    text-decoration: none;
  }

  .far,
  .fas {
    color: #0e5da4;
    width: 17px;
  }

  p {
    font-size: 14px;
  }

  .leaflet-container a {
    color: rgba(0, 0, 0, 0.8) !important;
  }
}

.leaflet-container a {
  color: rgba(0, 0, 0, 0.8) !important;
}
</style>
