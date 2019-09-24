<template>
  <l-marker :lat-lng="[charging.addressInfo.latitude,charging.addressInfo.longitude]">
    <!-- @click="select(charging.addressInfo, charging.addressInfo.latitude,charging.addressInfo.longitude)"  -->

    <l-popup style="text-align:center">
      <p style="font-weight:bold; font-size:1rem;">{{charging.addressInfo.title}}</p>
      <p>{{charging.addressInfo.addressLine1}}, {{charging.addressInfo.postcode}} {{charging.addressInfo.town}}</p>
      <p>{{charging.addressInfo.accessComments}}</p>
      <!-- <p>Status : {{moreInfo.statusTypes.id[0]}}</p> -->
    </l-popup>

    <l-icon :icon-size="[40, 40]" :icon-url="require('~/assets/images/carCharging.png')"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from "vue2-leaflet";
import { icon } from "leaflet";

export default {
  components: { LMarker, LIcon },
  props: {
    charging: { type: Object, required: true },
    select: { type: Function, required: true }
  },
  created() {
    // console.log(this.charging);
  }
};
</script>
