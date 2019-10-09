<!-- pages/le_nom_de_ma_page.vue => localhost:3000/le_nom_de_ma_page -->
<template>
  <div>
    <h1>{{message}}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'JE SUIS BIEN ARRIVE'
    }
  }
}
</script>
<style scoped>
h1 {
  color: red;
}
</style>
