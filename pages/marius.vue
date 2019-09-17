<template>
  <div class="bg-secondary">
    <div
      class="d-flex flex-column justify-content-center align-content-center vh-100"
      v-if="loading"
      @click="loading=false"
    >
      <div>bonjour, je suis marius</div>
      <p></p>
      <div>ENSEMBLE ON VA TROUVER LE MEILLEUR MOYEN DE TRANSPORT POUR AÉRER NOTRE VILLE ET SAUVER LES POISSONS</div>
      <img src="~/assets/images/assistant.svg" alt />
    </div>

    <div v-else class="d-flex flex-column justify-content-center vh-100">
      <div class="justify-content-around">
        <img src="~/assets/images/miniGrandfather.svg" alt />
        <div class="askBlock">
          <div class="ask">d'où pars tu ?</div>
          <input type="text" name="from" id class="inputAsk" v-model="from" @blur="formTo=true" />
        </div>
      </div>

      <div v-if="formTo" class="block">
        <img src="~/assets/images/miniGrandfather.svg" alt />
        <div class="askBlock">
          <div class="ask">où vas-tu ?</div>
          <input type="text" name="from" id class="inputAsk" v-model="to" @blur="meansBoolean=true" />
        </div>
      </div>
      <div class="rounded">
        <b-button-group v-if="meansBoolean">
          <b-button
            type="button"
            v-for="(mean, idx) in means"
            :key="idx"
            :pressed.sync="mean.state"
          >
            <img :src="require('~/assets/images/' + mean.logo)" :alt="mean.text" />
            <!-- <p class="align-self-end">{{mean.text}}</p> -->
          </b-button>
        </b-button-group>
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
      to: "",
      meansBoolean: false,
      isDeactive: false,
      means: [
        { logo: "rtm.svg.png", text: "Transport en commun", state: true },
        { logo: "trot.svg", text: "Trotinette", state: true },
        { logo: "walk.svg", text: "Marche", state: true },
        { logo: "bike.svg", text: "Vélo", state: true },
        { logo: "car.svg", text: "Voiture", state: true }
      ]
    };
  },
  methods: {
    myFilter: function() {
      this.i = !this.i;
      // some code to filter users
    }
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
  color: white;
  text-transform: uppercase;
  text-align: center;
  height: 100%;
}
.ask {
  background-color: white;
  color: var(--secondary);
  padding: 0.5rem;
  border-radius: 15px;
}
.askBlock {
  width: 50%;
  display: inline-block;
  margin: 20px;
}

.inputAsk {
  background-color: var(--secondary);
  color: white;
  border-width: 0 0 1px 0;
  border-color: white;
  width: 100%;
}
button.active {
  background-color: white !important;
}

.block {
  margin: 10% 0 10% 0;
}
</style>
