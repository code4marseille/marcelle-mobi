<!-- pages/le_nom_de_ma_page.vue => localhost:3000/le_nom_de_ma_page -->
<template>
  <div class="text-center pt-5">
    <h1 id="titre">Click HERE</h1>
    <h2>Je suis un example de page en VanillaJS</h2>
  </div>
</template>
<script>
export default {
  mounted() {
    // VOTRE JS ICI
    const titre = document.getElementById('titre')
    titre.onclick = () => {
      alert('Vous avez cliqué')
    }
  }
}
</script>
<style scoped>
h1 {
  color: red;
}
</style>
