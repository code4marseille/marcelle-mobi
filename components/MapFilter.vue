<template>
  <div>
    <div class="filterGo">
      <div
        @click="$store.commit('map/TOGGLE_FILTER')"
        class="buttonGo"
      >{{$store.state.map.filterVisible ? 'X' : 'Go'}}</div>
      <div v-if="$store.state.map.filterVisible" id="filter" class="container">
        <div class="row justify-content-between mx-0">
          <div class="col-4 borderBottom">
            <h2 class="lettreTransport text-primary">B</h2>
            <p class="textFilter">Bus</p>
          </div>
          <div class="col-4 borderCentral borderBottom">
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
            <img src="~/assets/images/velo.svg" />
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
      <SelectedVehicule />
    </div>
  </div>
</template>

<script>
import SelectedVehicule from '~/components/SelectedVehicule.vue'

export default {
  components: {
    SelectedVehicule
  }
}
</script>

<style lang="scss">
.filterGo {
  width: 100%;
  z-index: 999;
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
    transition: transform 0.2s linear;
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
    height: 50px;
    background: #0e5da4;
    box-shadow: 2px 2px 8px #aaa;
    font: bold 1rem Arial;
    border-radius: 50%;
    border: 2px solid White;
    color: white;
    bottom: 100%;
    right: 2%;
    text-align: center;
    padding: 15px 0px;
    align-self: self-end;
    margin-right: 10px;
    margin-bottom: 10px;
    right: 0;
    z-index: 999;
    align-self: flex-end;
    position: absolute;
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
