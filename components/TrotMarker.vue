<template>
  <l-marker
    :lat-lng="[trot.lat,trot.lng]"
    @click="select([trot.lat,trot.lng], trot, provider)"
    :visible="$store.state.map.seeTrots"
  >
    <l-icon :icon-size="providers[provider].size" :icon-url="providers[provider].iconUrl"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },
  data() {
    return {
      providers: {
        Lime: {
          size: [30, 40],
          iconUrl: require('~/assets/images/lime.svg')
        },
        Circ: {
          size: [30, 40],
          iconUrl: require('~/assets/images/circ.svg')
        },
        Hive: {
          size: [30, 40],
          iconUrl: require('~/assets/images/hive.svg')
        },
        Jump: {
          size: [30, 40],
          iconUrl: require('~/assets/images/jump.svg')
        },
        Tier: {
          size: [30, 40],
          iconUrl: require('~/assets/images/tier.svg')
        },
        Voi: {
          size: [30, 40],
          iconUrl: require('~/assets/images/voi.svg')
        },
        Wind: {
          size: [30, 40],
          iconUrl: require('~/assets/images/wind.svg')
        },
        Bird: {
          size: [30, 40],
          iconUrl: require('~/assets/images/bird.svg')
        }
      }
    }
  },
  props: {
    trot: { type: Object, required: true },
    provider: { type: String, required: true },
    select: { type: Function, required: true }
  }
}
</script>
