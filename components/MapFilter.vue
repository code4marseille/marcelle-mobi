<template>
  <div>
    <div class="filterGo">
      <div class="containerButtonsMap mr-2 mb-3">
        <b-button variant="light" pill @click="refreshMap" style="width: 40px;height: 40px;">
          <i :class="['fas fa-sync-alt', {'fa-spin': isLoading}]"></i>
        </b-button>
        <div
          @click="$store.commit('map/TOGGLE_FILTER')"
          class="buttonGo"
        >{{$store.state.map.filterVisible ? 'X' : 'Go'}}</div>
      </div>
      <b-collapse :visible="$store.state.map.filterVisible">
        <div v-if="$store.state.map.filterVisible" id="filter" class="container">
          <div class="row justify-content-between mx-0 clickable">
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
  props: {
    location: { type: Object, required: true }
  },

  data() {
    return {
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
    width: 40px;
    height: 40px;
    background: #0e5da4;
    box-shadow: 2px 2px 8px #aaa;
    font: bold 1rem Arial;
    border-radius: 50%;
    border: 2px solid White;
    color: white;
    right: 2vw;
    text-align: center;
    padding: 10px 0px;
    margin-top: 20px;
  }

  .containerButtonsMap {
    position: absolute;
    right: 0;
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
}
</style>
