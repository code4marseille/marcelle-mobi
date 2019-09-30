<template>
  <div id="marius" class="bg-secondary">
    <div v-if="true">
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
            <input
              type="text"
              name="from"
              class="inputAsk"
              autocomplete="address"
              v-model="from"
              @blur="showInputTo=true"
            />
          </div>
        </div>

        <div v-if="showInputTo" class="block">
          <img src="~/assets/images/miniGrandfather.svg" alt />
          <div class="askBlock">
            <div class="ask">où vas-tu ?</div>
            <input
              type="text"
              autocomplete="address"
              name="from"
              class="inputAsk"
              v-model="to"
              @blur="showModes=true"
            />
          </div>
        </div>

        <div class="rounded" v-if="showModes">
          <h4>Choisissez votre moyen de transport</h4>
          <b-button-group class="d-flex justify-content-center align-content-center">
            <b-button v-for="(mode, idx) in modes" :key="idx" @click="setMode(mode.value)">
              <img :src="require('~/assets/images/' + mode.logo)" :alt="mode.text" />
            </b-button>
          </b-button-group>
          <b-button
            class="block"
            pill
            variant="primary"
            id="submit"
            :disabled="!selectedMode"
            @click="submit"
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
      showInputTo: false,
      showModes: false,
      from: '',
      to: '',
      modes: [
        { logo: 'trot.svg', value: 'bikes' },
        { logo: 'walk.svg', value: 'walking' },
        { logo: 'rtm.svg.png', value: 'walking' },
        { logo: 'bike.svg', value: 'bike' },
        { logo: 'car.svg', value: 'car' }
      ],
      selectedMode: null
    }
  },

  computed: {},
  methods: {
    submit() {
      this.$store.dispatch('marius/fetchitineraries', {
        from: this.from,
        to: this.to,
        mode: this.selectedMode
      })
      this.$router.push({
        path: '/marius_map'
      })
    },

    setMode(mode) {
      this.selectedMode = mode
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
