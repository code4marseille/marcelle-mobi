<template>
  <div id="fullscreen">
    <Sidebar />
    <nuxt />
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
export default {
  components: {
    Sidebar
  }
}
</script>

<style>
body {
  background-color: rgb(37, 169, 232);
}
.v-btn__content {
  font-size: 1.4rem;
}

header {
  color: white;
}
</style>
