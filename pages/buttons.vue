<template>
  <div>
    <img :src="require('~/assets/images/supergrandfather.svg')" class="img-fluid col-4 offset-4" />

    <div
      class="text-white text-center bg-danger rounded-pill p-3 mx-5 click"
      @click="sendEmergencyMsg()"
    >URGENCE</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "LA PAGE DES BOUTONS D'ARRIVEE ET D'URGENCE"
    }
  }
}
</script>
<style scoped>
.click {
  cursor: pointer;
}
</style>
