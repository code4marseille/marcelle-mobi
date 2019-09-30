<template>
  <div id="marius" class="bg-secondary">
    <div v-if="true">
      <div
        class="d-flex flex-column justify-content-center align-content-center vh-100 px-3"
        v-if="loading"
      >
        <div>bonjour a toi !</div>
        <p></p>
        <div
          class="mb-4"
        >ENSEMBLE NOUS ALLONS TROUVER LE MEILLEUR MOYEN DE TRANSPORT POUR AÉRER NOTRE VILLE ET SAUVER LA PLANETE</div>

        <div>
          <p>Choisis ton avatar !</p>
        </div>
        <div class="d-flex justify-content-between w-100">
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
          @click="validate"
          :disabled="selectedAvatarIdx == null"
        >Valider</b-button>
      </div>

      <div v-else class="d-flex flex-column justify-content-center vh-100">
        <div class="justify-content-around">
          <img :src="avatar.icon" alt style="width:200px" />
          <div class="askBlock">
            <div class="ask">d'où pars tu ?</div>
            <input
              type="text"
              autocomplete="address"
              v-model="from"
              @blur="showInputTo=true"
              class="inputAsk border-bottom mt-3"
            />
          </div>
        </div>

        <div v-if="showInputTo" class="block">
          <img :src="avatar" alt />
          <div class="askBlock">
            <div class="ask">où vas-tu ?</div>
            <input
              type="text"
              autocomplete="address"
              name="from"
              class="inputAsk border-bottom mt-3"
              v-model="to"
              @blur="showModes=true"
            />
          </div>
        </div>

        <div class="rounded mt-5" v-if="showModes">
          <h4>Choisissez votre moyen de transport</h4>
          <b-button-group class="d-flex justify-content-center align-content-center px-3 mt-4">
            <b-button v-for="(mode, idx) in modes" :key="idx" @click="setMode(mode.value)">
              <img :src="require('~/assets/images/' + mode.logo)" :alt="mode.text" />
            </b-button>
          </b-button-group>
          <b-button
            class="block"
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
      <img :src="avatar" alt />
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
      selectedMode: null,
      selectedAvatarIdx: null,
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
    },

    validate() {
      this.loading = false
    },
    selectAvatar(i) {
      this.selectedAvatarIdx = i
    }
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
    border-radius: 5px;
    border: none;
  }

  .block {
    margin: 5% 0 5% 0;
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
    margin: 15px;
    box-shadow: 3px 3px 10px rgba($color: #000, $alpha: 0.5);
    margin-top: 5px !important;
    font-size: 16px !important;

    .nom_avatar {
      color: #0e5da4 !important;
    }
    .photo_avatar {
      width: 120px;
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
