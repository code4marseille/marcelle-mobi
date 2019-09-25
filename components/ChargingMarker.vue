<template>
  <l-marker :lat-lng="[charging.addressInfo.latitude,charging.addressInfo.longitude]">
    <l-popup style="text-align:center">
      <p style="font-weight:bold; font-size:1rem;">{{charging.addressInfo.title}}</p>
      <p>{{charging.addressInfo.addressLine1}}, {{charging.addressInfo.postcode}} {{charging.addressInfo.town}}</p>
      <p
        v-if="charging.addressInfo.contactTelephone1"
      >tel : {{charging.addressInfo.contactTelephone1}}</p>
      <p>{{charging.addressInfo.accessComments}}</p>
      <p v-if="charging.numberOfPoints">Nombre de prise(s) : {{charging.numberOfPoints}}</p>

      <p v-if="usageTypeTitle.indexOf('nknown')<0">Type d'utilisation : {{usageTypeTitle}}</p>
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
    usageTypeTitle() {
      let usage = this.$store.getters['parkingMap/chargingStationUsageType'](
        this.charging.usageTypeId
      )
      // console.log(a.title)
      return usage ? usage.title : ''
    },
    connectionTypeTitle() {
      // console.log('ok')
      // debugger
      let connection = this.$store.getters['parkingMap/chargingConnectionType'](
        this.charging.connections.connectionTypeId
      )
      console.log(connection ? connection.title : '')
    }
  }
}
</script>
