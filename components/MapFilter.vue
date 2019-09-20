<template>
  <div class="filterGo">
    <div @click="$store.commit('map/TOGGLE_FILTER')" class="buttonGo">GO</div>
    <div v-if="$store.state.map.filterHidden" id="filter" class="container">
      <div class="row justify-content-between">
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

        <div @click="$store.commit('map/TOGGLE_BIKES')" class="col-4">
          <img src="~/assets/images/velo.svg" />
          <p class="textFilter">Vélo</p>
        </div>
        <div @click="$store.commit('map/TOGGLE_CARS')" class="col-4 borderCentral">
          <img src="~/assets/images/voiture.svg" />
          <p class="textFilter">Totem</p>
        </div>
        <div class="col-4">
          <img src="~/assets/images/trotinette.svg" />
          <p class="textFilter">Trotinette</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
