<template>
  <div id="fullscreen">
    <Sidebar />
    <nuxt />
    <b-modal
      title="BootstrapVue"
      v-model="showModal"
      style="display:flex; flex-direction:row; justify-content:center"
      ok-only
    >
      <p
        class="my-4"
        style="text-align:center"
      >Adresse non trouvée dans Marseille Provence Métropole</p>
      <img src="~/assets/images/mpm.png" style="width:100%" alt />
    </b-modal>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
export default {
  components: {
    Sidebar
  },
  computed: {
    showModal: {
      get() {
        return this.$store.state.alertModalShown
      },
      set() {
        this.$store.dispatch('changeStateModal', false)
      }
    }
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
