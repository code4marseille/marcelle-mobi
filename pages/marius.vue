<template>
  <div id="marius" class="bg-secondary">
    <div v-if="!isThinking">
      <div
        v-if="loading"
        class="d-flex flex-column justify-content-center align-content-center vh-100 px-3"
      >
        <div>Bonjour a toi !</div>
        <p></p>
        <div
          class="mb-4"
        >ENSEMBLE NOUS ALLONS TROUVER LE MOYEN DE TRANSPORT QUI CONVIENT À TON TRAJET POUR AÉRER NOTRE VILLE ET SAUVER LA PLANETE</div>
        <div>
          <p class="mt-5">Choisis qui va t'aider !</p>
        </div>
        <div class="d-flex justify-content-around w-100">
          <div
            class="marcelle_marius_avatar"
            v-for="(avatar, i) in avatars"
            :key="i"
            @click="selectAvatar(i)"
            :class="{active: i == selectedAvatarIdx}"
          >
            <img class="photo_avatar" :src="avatar.icon" />
            <div class="nom_avatar">{{avatar.name}}</div>
          </div>
        </div>
        <b-button
          class="btn-avatar mt-5"
          size="lg"
          @click="validate"
          :disabled="selectedAvatarIdx == null"
        >Valider</b-button>
      </div>

      <div v-else class="container py-5 px-2">
        <div class="row align-items-end">
          <img :src="avatar.icon" class="img-fluid col-4" />
          <div class="col-8">
            <div class="text-center mt-5">
              <div class="text-secondary bg-white rounded-pill p-3">d'où pars tu ?</div>
              <VueBootstrapTypeahead
                :data="addresses"
                v-model="from"
                :serializer="a => a.properties.label"
                placeholder="Tapez une adresse..."
                @hit="setLatLng('fromLatLng', $event)"
                autofocus
                input-class="mt-3 border-top-0 border-left-0 border-right-0 border-primary bg-secondary text-white"
              />
            </div>
            <div v-if="fromLatLng" class="text-center mt-5 pt-5">
              <div class="text-secondary bg-white rounded-pill p-3">où vas-tu ?</div>
              <VueBootstrapTypeahead
                :data="addresses"
                v-model="to"
                :serializer="a => a.properties.label"
                placeholder="Tapez une adresse..."
                @hit="setLatLng('toLatLng', $event)"
                autofocus
                input-class="mt-3 border-top-0 border-left-0 border-right-0 border-primary bg-secondary text-white"
              />
            </div>
          </div>
        </div>

        <div class="rounded mt-5" v-if="toLatLng">
          <h4>Choisissez votre moyen de transport</h4>
          <b-button-group class="d-flex justify-content-center align-content-center px-3 mt-4">
            <b-button
              v-for="(mode, idx) in modes"
              :key="idx"
              @click="setMode(mode)"
              class="btn_mode"
              :class="{active: selectedMode === mode}"
            >
              <img :src="require('~/assets/images/' + mode.logo)" :alt="mode.text" />
            </b-button>
          </b-button-group>
          <b-button
            class="block"
            size="lg"
            pill
            style="margin-top:70px"
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
      <img :src="avatar.icon" style="max-height: 70vh" />
    </div>
  </div>
</template>

<script>
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import _ from 'underscore'
const API_URL = 'https://api-adresse.data.gouv.fr/search/'
export default {
  components: { VueBootstrapTypeahead },
  data() {
    return {
      isThinking: false,
      loading: true,
      showModes: false,
      from: '',
      to: '',
      fromLatLng: null,
      toLatLng: null,
      selectedMode: null,
      selectedAvatarIdx: null,
      addresses: [],
      modes: [
        { logo: 'trot.svg', value: 'bss' },
        { logo: 'walk.svg', value: 'walking' },
        { logo: 'rtm.svg', value: 'walking' },
        { logo: 'bike.svg', value: 'bike' },
        { logo: 'car.svg', value: 'car' }
      ],
      avatars: [
        {
          icon: require('~/assets/images/grandmother.svg'),
          name: 'MARCELLE'
        },
        {
          icon: require('~/assets/images/grandfather.svg'),
          name: 'MARIUS'
        }
      ]
    }
  },

  computed: {
    avatar() {
      return this.avatars[this.selectedAvatarIdx]
    }
  },
  methods: {
    setLatLng(key, event) {
      this[key] = [event.geometry.coordinates[1], event.geometry.coordinates[0]]
      this.$nextTick(() => window.scrollTo(0, document.body.scrollHeight))
    },
    async getAddresses(query) {
      let results = await this.$axios.$get(API_URL, {
        params: { q: query, autocomplete: 1, limit: 10 }
      })
      console.log(results.features)

      this.addresses = results.features
    },

    async submit() {
      this.isThinking = true
      try {
        await this.$store.dispatch('marius/fetchitineraries', {
          fromLatLng: this.fromLatLng,
          toLatLng: this.toLatLng,
          mode: this.selectedMode.value
        })
        this.$router.push({
          path: '/marius_map'
        })
      } catch (error) {
        this.isThinking = false
      }
    },

    setMode(mode) {
      this.selectedMode = mode
    },

    validate() {
      this.loading = false
    },
    selectAvatar(i) {
      this.selectedAvatarIdx = i
    }
  },
  watch: {
    from: _.debounce(function(addr) {
      this.getAddresses(addr)
    }, 500),
    to: _.debounce(function(addr) {
      this.getAddresses(addr)
    }, 500)
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
    width: 170px;
    border-radius: 15px;
    margin: 0 auto;
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
    width: 170px;
  }

  .block {
    margin: 5% 0 5% 0;
    border-radius: 10px;
  }

  .btn_mode:hover,
  .btn_mode.active {
    background-color: white !important;
    border-radius: 10px !important ;
    border: none !important;
  }

  .btn_mode img {
    width: 10vw;
    height: 10vh;
    max-width: 80px;
  }

  .icons_search {
    min-height: 25px;
    min-width: 25px;
  }

  .btn-avatar {
    padding: 5px 10px;
    width: 150px;
    background: #0e5da4;
    color: white;
    border-radius: 30px;
    margin: 0 auto;
  }

  .marcelle_marius_avatar.active {
    background-color: white;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    box-shadow: 3px 3px 10px rgba($color: #000, $alpha: 0.5);
    margin-top: 5px !important;
    font-size: 16px !important;

    .nom_avatar {
      color: #0e5da4 !important;
    }
    .photo_avatar {
      width: 120px;
      height: 120px;
      margin-top: 5px;
    }
  }

  .marcelle_marius_avatar {
    background-color: rgba($color: #fff, $alpha: 0.2);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 15px;

    .nom_avatar {
      color: white !important;
      margin-top: 5px;
      font-size: 13px;
    }

    .photo_avatar {
      width: 80px;
      margin-top: 5px;
    }
  }
}
</style>
