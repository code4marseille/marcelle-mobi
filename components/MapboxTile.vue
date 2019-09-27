<template>
  <l-tile-layer
    :url="`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`"
  ></l-tile-layer>
</template>

<script>
export default {
  data() {
    return {
      mapBoxToken:
        'pk.eyJ1Ijoia2V2aW5iZXJ0aGllciIsImEiOiJjazB3NzVheWYwa282M2NvY3pxb2UxejBnIn0.mb5T4YX7EH2NZGxa4c9RxQ'
    }
  }
}
</script>
