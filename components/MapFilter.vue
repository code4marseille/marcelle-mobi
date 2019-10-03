<template>
  <div>
    <div class="filterGo">
      <div class="containerButtonsMap">
        <v-btn class="mx-2 btn-refresh spin" fab light small @click="refreshMap">
          <v-icon dark>mdi-cached {{ isLoading ? 'fa-spin' : ''}}</v-icon>
        </v-btn>
        <b-button v-b-toggle.collapse-1 class="reinitialise">
          <div
            @click="$store.commit('map/TOGGLE_FILTER')"
            class="buttonGo"
          >{{$store.state.map.filterVisible ? 'X' : 'Go'}}</div>
        </b-button>
      </div>
      <b-collapse id="collapse-1" visible class="mt-2">
        <div v-if="$store.state.map.filterVisible" id="filter" class="container">
          <div class="row justify-content-between mx-0">
            <div
              class="col-4 borderBottom"
              @click="$store.commit('map/TOGGLE_BUS')"
              :class="{active: $store.state.map.seeBus}"
            >
              <h2 class="lettreTransport text-primary">B</h2>
              <p class="textFilter">Bus</p>
            </div>
            <div
              class="col-4 borderCentral borderBottom"
              @click="$store.commit('map/TOGGLE_TRAMS')"
              :class="{active: $store.state.map.seeTrams}"
            >
              <h2 class="lettreTransport text-primary">T</h2>
              <p class="textFilter">Tram</p>
            </div>
            <div class="col-4 borderBottom">
              <h2 class="lettreTransport text-primary">M</h2>
              <p class="textFilter">Metro</p>
            </div>

            <div
              @click="$store.commit('map/TOGGLE_BIKES')"
              class="col-4"
              :class="{active: $store.state.map.seeBikes}"
            >
              <img src="~/assets/images/velo.svg" style="width:45px" />
              <p class="textFilter">Vélo</p>
            </div>
            <div
              @click="$store.commit('map/TOGGLE_CARS')"
              class="col-4 borderCentral"
              :class="{active: $store.state.map.seeCars}"
            >
              <img src="~/assets/images/voiture.svg" />
              <p class="textFilter">Voiture</p>
            </div>

            <div
              @click="$store.commit('map/TOGGLE_TROTS')"
              class="col-4"
              :class="{active: $store.state.map.seeTrots}"
            >
              <img src="~/assets/images/trotinette.svg" />
              <p class="textFilter">Trotinette</p>
            </div>
          </div>
        </div>
      </b-collapse>
      <SelectedVehicule />
    </div>
  </div>
</template>

<script>
import SelectedVehicule from '~/components/SelectedVehicule.vue'

export default {
  components: {
    SelectedVehicule
  },

  data() {
    return {
      location: { lat: 43.295336, lng: 5.373907 },
      isLoading: false
    }
  },

  methods: {
    async refreshMap() {
      this.isLoading = true
      await this.$store.dispatch('map/fetchAllVehicles', this.location)
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
.filterGo {
  width: 100%;
  z-index: 450;
  position: fixed;
  left: 0;
  bottom: 0;

  .active {
    background-color: rgba(187, 231, 255, 0.38);
  }

  #filter {
    z-index: 999;
    text-align: center;
    background-color: aliceblue;
    border-radius: 0.5rem;
    width: 96%;
    box-shadow: 5px 5px 5px gray;
    margin-bottom: 5px;
    padding: 0;
  }

  .borderCentral {
    border-right: 1px solid rgba(182, 181, 181, 0.5);

    border-left: 1px solid rgba(182, 181, 181, 0.5);
  }

  .borderBottom {
    border-bottom: 1px solid rgba(182, 181, 181, 0.5);
  }

  .buttonGo {
    width: 50px;
    background: #0e5da4;
    box-shadow: 2px 2px 8px #aaa;
    font: bold 1rem Arial;
    border-radius: 50%;
    border: 2px solid White;
    color: white;
    right: 2vw;
    text-align: center;
    padding: 15px 0px;
    margin-top: 20px;
  }

  .containerButtonsMap {
    position: absolute;
    right: 1vw;
    bottom: 100%;
    display: flex;
    flex-direction: column;
  }

  .lettreTransport {
    width: 40px;
    height: 40px;
    display: inline-block;
    border: 2px solid #0e5da4;
    border-radius: 75%;
    padding: 0.3rem;
    margin-top: 0.5rem;
    font-size: 1.3rem;
  }

  .reinitialise {
    animation: none;
    animation-delay: 0;
    animation-direction: normal;
    animation-duration: 0;
    animation-fill-mode: none;
    animation-iteration-count: 1;
    animation-name: none;
    animation-play-state: running;
    animation-timing-function: ease;
    backface-visibility: visible;
    background: 0;
    background-attachment: scroll;
    background-clip: border-box;
    background-color: transparent;
    background-image: none;
    background-origin: padding-box;
    background-position: 0 0;
    background-position-x: 0;
    background-position-y: 0;
    background-repeat: repeat;
    background-size: auto auto;
    border: 0;
    border-style: none;
    border-width: medium;
    border-color: inherit;
    border-bottom: 0;
    border-bottom-color: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-style: none;
    border-bottom-width: medium;
    border-collapse: separate;
    border-image: none;
    border-left: 0;
    border-left-color: inherit;
    border-left-style: none;
    border-left-width: medium;
    border-radius: 0;
    border-right: 0;
    border-right-color: inherit;
    border-right-style: none;
    border-right-width: medium;
    border-spacing: 0;
    border-top: 0;
    border-top-color: inherit;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top-style: none;
    border-top-width: medium;
    bottom: auto;
    box-shadow: none;
    box-sizing: content-box;
    caption-side: top;
    clear: none;
    clip: auto;
    color: inherit;
    columns: auto;
    column-count: auto;
    column-fill: balance;
    column-gap: normal;
    column-rule: medium none currentColor;
    column-rule-color: currentColor;
    column-rule-style: none;
    column-rule-width: none;
    column-span: 1;
    column-width: auto;
    content: normal;
    counter-increment: none;
    counter-reset: none;
    cursor: auto;
    direction: ltr;
    display: inline;
    empty-cells: show;
    float: none;
    font: normal;
    font-family: inherit;
    font-size: medium;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    height: auto;
    hyphens: none;
    left: auto;
    letter-spacing: normal;
    line-height: normal;
    list-style: none;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: disc;
    margin: 0;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    max-height: none;
    max-width: none;
    min-height: 0;
    min-width: 0;
    opacity: 1;
    orphans: 0;
    outline: 0;
    outline-color: invert;
    outline-style: none;
    outline-width: medium;
    overflow: visible;
    overflow-x: visible;
    overflow-y: visible;
    padding: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    page-break-after: auto;
    page-break-before: auto;
    page-break-inside: auto;
    perspective: none;
    perspective-origin: 50% 50%;
    position: static;
    /* Vous devrez modifier les quotes selon le langage de la page (ici il s'agit du Langage Français) */
    quotes: '201C' '201D' '2018' '2019';
    right: auto;
    tab-size: 8;
    table-layout: auto;
    text-align: inherit;
    text-align-last: auto;
    text-decoration: none;
    text-decoration-color: inherit;
    text-decoration-line: none;
    text-decoration-style: solid;
    text-indent: 0;
    text-shadow: none;
    text-transform: none;
    top: auto;
    transform: none;
    transform-style: flat;
    transition: none;
    transition-delay: 0s;
    transition-duration: 0s;
    transition-property: none;
    transition-timing-function: ease;
    unicode-bidi: normal;
    vertical-align: baseline;
    visibility: visible;
    white-space: normal;
    widows: 0;
    width: auto;
    word-spacing: normal;
    z-index: auto;
  }
}
</style>
