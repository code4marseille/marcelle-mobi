<template>
  <l-marker :lat-lng="[charging.addressInfo.latitude,charging.addressInfo.longitude]">
    <l-popup style="text-align:center">
      <p style="font-weight:bold; font-size:1rem;">{{charging.addressInfo.title}}</p>
      <p><i class="fas fa-map-marker-alt"></i> {{charging.addressInfo.addressLine1}}, {{charging.addressInfo.postcode}} {{charging.addressInfo.town}}</p>
      <p v-if="charging.addressInfo.contactTelephone1">
        <i class="fas fa-phone"></i> <span style="font-weight:bold">{{charging.addressInfo.contactTelephone1}}</span>
      </p>
      <p v-if="charging.addressInfo.accessComments"><i class="fas fa-comment"></i> {{charging.addressInfo.accessComments}}</p>
      <p v-if="charging.numberOfPoints"><i class="fas fa-plug"></i>({{charging.numberOfPoints}})
      <ul v-if="charging.connections.length>0" style="list-style-type: none;" >
        <li
          v-for="(connection, id) in connectionUnknownFilter"
          :key="id"

        >{{connection.connectionType.title}}</li>
      </ul>
      </p>
      <p v-if="charging.generalComments"><i class="fas fa-comment-dots"></i> {{charging.generalComments}}</p>
      <p v-if="charging.usageType.title.indexOf('nknown')<0"><i class="fas fa-info"></i> {{charging.usageType.title}}</p>
    </l-popup>

    <l-icon :icon-size="[40, 40]" :icon-url="require('~/assets/images/carCharging.png')"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },
  props: {
    charging: { type: Object, required: true }
  },
  computed: {
     connectionUnknownFilter: function() {

       return this.charging.connections.length>0 ?this.charging.connections.filter(connection =>connection.connectionType.title.indexOf('kown')>0):""
     }

}}
</script>
