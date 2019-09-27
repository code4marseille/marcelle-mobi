<template>
  <div id="marius" class="bg-secondary">
    <div v-if="query">
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
            <input
              type="text"
              name="from"
              id
              class="inputAsk"
              v-model="to"
              @blur="meansBoolean=true"
            />
          </div>
        </div>

        <div class="rounded" v-if="meansBoolean">
          <h4>Choisissez votre moyen de transport</h4>
          <b-button-group class="d-flex justify-content-center align-content-center">
            <b-button
              v-model="value"
              type="button"
              v-for="(mean, idx) in means"
              :key="idx"
              :pressed.sync="mean.state"
              @click="deactive(idx)"
            >
              <img :src="require('~/assets/images/' + mean.logo)" :alt="mean.text" />
            </b-button>
          </b-button-group>
          <b-button
            class="block"
            pill
            variant="primary"
            id="submit"
            :disabled="meanSelected===-1"
            @click="submitMarius"
          >Analyser mon parcours</b-button>
        </div>
      </div>
    </div>
    <div v-else class="d-flex flex-column justify-content-around align-content-center vh-100">
      <div>laisse moi réflechir</div>
      <img src="~/assets/images/assistant.svg" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      formTo: false,
      from: '',
      to: '',
      meansBoolean: false,

      means: [
        { logo: 'trot.svg', value: 'bikes', state: false },
        { logo: 'walk.svg', value: 'walking', state: false },
        { logo: 'rtm.svg.png', value: 'walking', state: false },
        { logo: 'bike.svg', value: 'bike', state: false },
        { logo: 'car.svg', value: 'car', state: false }
      ],
      meanSelected: -1,
      query: true
    }
  },

  computed: {},
  methods: {
    submitMarius: function() {
      const value = this.means.find(e => e.state).value

      this.$store.dispatch('marius/fetchitineraries', {
        from: this.from,
        to: this.to,
        mode: this.value
      }),
        this.$router.push({
          path: '/marius_map'
        })
    },

    deactive: function(id) {
      for (let i = 0; i < this.means.length; i++) {
        if (id != i) {
          this.means[i].state = false
          // console.log("toto");
        }
        this.isSelected()
        // console.log(this.means.map(mean => mean.state));
      }
    },

    isSelected: function() {
      const activated = this.means.findIndex(function(e) {
        return e.state === true
      })
      this.meanSelected = activated
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 5000)
  }
}
</script>

<style lang="scss">
#marius {
  color: white;
  text-transform: uppercase;
  text-align: center;
  height: 100%;
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
    margin: 5% 0 5% 0;
  }
}
</style>
