<!-- pages/le_nom_de_ma_page.vue => localhost:3000/le_nom_de_ma_page -->
<template>
  <div class>
    <div class="text-white text-center bg-danger rounded-pill p-3 center">URGENCE</div>
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
.center {
  margin-top: 50vh;
  transform: translate(-50%);
}
</style>
