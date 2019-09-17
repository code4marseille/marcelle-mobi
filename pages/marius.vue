<template>
  <div class="d-flex flex-column justify-content-center">
    <div v-if="loading" @click="loading=false">
      <div>bonjour, je suis marius</div>
      <div>ENSEMBLE ON VA TROUVER LE MEILLEUR MOYEN DE TRANSPORT POUR AÉRER NOTRE VILLE ET SAUVER LES POISSONS</div>
      <img src="~/assets/images/assistant.svg" alt />
    </div>

    <div v-else>
      <div>
        <div>
          <img src="~/assets/images/miniGrandfather.svg" alt />
          <div class="askBlock">
            <div class="ask">d'où pars tu ?</div>
            <input type="text" name="from" id class="inputAsk" v-model="from" @click="formTo=true" />
          </div>
        </div>
        <div v-if="formTo">
          <img src="~/assets/images/miniGrandfather.svg" alt />
          <div class="askBlock">
            <div class="ask">où vas-tu ?</div>
            <input type="text" name="from" id class="inputAsk" v-model="to" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      formTo: false,
      from: "",
      to: ""
    };
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }
};
</script>

<style >
body {
  background-color: var(--primary);
  color: white;
  text-transform: uppercase;
  text-align: center;
}
.ask {
  background-color: white;
  color: var(--primary);
  padding: 0.5rem;
  border-radius: 15px;
}
.askBlock {
  width: 50%;
  display: inline-block;
  margin: 20px;
}

/* .inputAsk {
background-color: var(--primary);
color: white;
border-width: 0 0 1px 0;
border-color: white;
width: 100%;
}*/
</style>
