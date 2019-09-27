<template>
  <div id="marius" class="bg-secondary">
    <div v-if="query">
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
          <div class="marcelle_marius_avatar" v-for="(avatar, i) in avatars" :key="i">
            <img class="photo_avatar" :src="avatar.icon" />
            <div class="nom_avatar">{{avatar.name}}</div>
          </div>
        </div>
        <button class="btn-avatar mt-5" @click="loading=false">Valider</button>
      </div>

      <div v-else class="d-flex flex-column justify-content-center vh-100">
        <div class="justify-content-around">
          <img src="~/assets/images/miniGrandfather.svg" alt />
          <div class="askBlock">
            <div class="ask">d'où pars tu ?</div>
            <input
              type="text"
              name="from"
              id
              class="inputAsk border-bottom mt-3"
              v-model="from"
              @blur="formTo=true"
            />
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
              class="inputAsk border-bottom mt-3"
              v-model="to"
              @blur="meansBoolean=true"
            />
          </div>
        </div>

        <div class="rounded mt-5" v-if="meansBoolean">
          <h4>Choisissez votre moyen de transport</h4>
          <b-button-group class="d-flex justify-content-center align-content-center px-3 mt-4">
            <b-button
              type="button"
              v-for="(mean, idx) in means"
              :key="idx"
              :pressed.sync="mean.state"
              @click="deactive(idx)"
            >
              <img
                :src="require('~/assets/images/' + mean.logo)"
                class="icons_search"
                :alt="mean.text"
              />
            </b-button>
          </b-button-group>
          <b-button
            class="block"
            pill
            style="margin-top:70px"
            variant="primary"
            id="submit"
            :disabled="meanSelected===-1"
            @click="query=false"
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
        { logo: 'trot.svg', text: 'Trotinette', state: false },
        { logo: 'walk.svg', text: 'Marche', state: false },
        { logo: 'rtm.svg', text: 'Transport en commun', state: false },
        { logo: 'bike.svg', text: 'Vélo', state: false },
        { logo: 'car.svg', text: 'Voiture', state: false }
      ],

      avatars: [
        {
          icon: require('~/assets/images/grandmother.svg'),
          name: 'MARCELLE',
          class: 'active'
        },
        {
          icon: require('~/assets/images/grandfather.svg'),
          name: 'MARIUS',
          class: ''
        }
      ],

      meanSelected: -1,
      query: true
    }
  },
  computed: {},
  methods: {
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
  }
  // mounted() {
  //   setTimeout(() => {
  //     this.loading = false
  //   }, 5000)
  // }
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

  .marcelle_marius_avatar:hover {
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
