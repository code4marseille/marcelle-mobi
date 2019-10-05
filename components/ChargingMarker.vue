<template  >
  <l-marker
    :lat-lng="[charging.addressInfo.latitude,charging.addressInfo.longitude]"
    :visible="visible"
  >
    <l-popup style="text-align:center" id="ChargingMarkerVue">
      <p style="font-weight:bold;" class="title text-left">{{charging.addressInfo.title}}</p>
      <p class="text-left" v-if="charging.addressInfo.contactTelephone1">
        <span style="font-weight:bold">{{charging.addressInfo.contactTelephone1}}</span>
      </p>
      <p class="text-left border-bottom pb-3">
        <i class="fas fa-directions"></i>
        <a
          :href="googleMap(charging.addressInfo.latitude,charging.addressInfo.longitude)"
          target="_blank"
          class="address"
          style="color: #0e5da4 !important;"
        >{{charging.addressInfo.addressLine1}}, {{charging.addressInfo.postcode}} {{charging.addressInfo.town}}</a>
      </p>

      <p v-if="charging.addressInfo.accessComments" class="mt-2 text-left">
        <i class="fas fa-users"></i>
        <strong>Public :</strong>
        {{charging.addressInfo.accessComments}}
      </p>

      <p v-if="usageTypeUnknownFilter" class="mt-2 text-left">
        <i class="fas fa-users"></i>
        <strong>Public :</strong>
        {{usageTypeUnknownFilter}}
      </p>

      <p v-if="charging.numberOfPoints" class="text-left mt-2">
        <i class="fas fa-plug"></i>
        <strong>Prise(s) :</strong>
        {{charging.numberOfPoints}}
      </p>
      <!-- Ci dessous n'affiche rien  -->
      <!-- <ul v-if="charging.connections.length > 0" style="list-style-type: none;">
        <li
          v-for="(connection, id) in connectionUnknownFilter"
          :key="id"
        >{{connection.connectionType.title}}</li>
      </ul>-->

      <p v-if="charging.generalComments" class="text-left mt-2">
        <i class="fas fa-comment-dots"></i>
        <strong>Détails :</strong>
        {{charging.generalComments}}
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
    charging: { type: Object, required: true },
    googleMap: { type: Function, require: true },
    visible: { type: Boolean, required: true }
  },
  data() {
    return {
      iconColor: {},
      marker: {
        image: require('~/assets/images/elec_car_logo.svg')
      }
    }
  },
  computed: {
    connectionUnknownFilter() {
      return this.charging.connections.length > 0
        ? this.charging.connections.filter(
            connection => connection.connectionType.title.indexOf('kown') > 0
          )
        : ''
    },

    usageTypeUnknownFilter() {
      return this.charging.usageType.title.search('Unknown') < 0
        ? this.charging.usageType.title
        : ''
    }
  }
}
</script>
<style lang="scss">
#ChargingMarkerVue {
  .title {
    color: rgba(0, 0, 0, 0.8) !important;
    font-size: 24px;
    margin-bottom: 0px;
  }

  .address {
    color: rgba(0, 0, 0, 0.8) !important;
    font-size: 16px;
    margin-top: 0px;
    font-style: italic;
    text-align: left !important;
  }

  .fas {
    color: #0e5da4;
    width: 17px;
  }
}

.leaflet-popup-close-button {
  margin-top: 10px;
  margin-right: 10px;
}

.leaflet-popup-content p {
  margin: 0 0;
}
</style>
