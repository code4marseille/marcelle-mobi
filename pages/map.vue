<template>
  <div>
    <div id="position">
      <v-map id="map" :zoom="150" :center="initialLocation">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-locatecontrol />
      </v-map>
    </div>

    <div id="filter" class="container">
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

        <div class="col-4">
          <img src="~/assets/images/velo.svg" />
          <p class="textFilter">Vélo</p>
        </div>
        <div class="col-4 borderCentral">
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
import { LMap, LTileLayer } from 'vue2-leaflet'
import { latLng, Icon, icon } from 'leaflet'
import Vue2LeafletLocatecontrol from '~/components/Vue2LeafletLocatecontrol'

export default {
  components: {
    'v-map': LMap,
    'v-tilelayer': LTileLayer,
    'v-locatecontrol': Vue2LeafletLocatecontrol
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907]
    }
  }
}
</script>

<style>
#map {
  width: 100wh;
  height: 100vh;
}

#position {
  position: relative;
}
#filter {
  position: absolute;
  bottom: 2%;
  left: 2%;
  z-index: 999;
  text-align: center;
  background-color: aliceblue;
  border-radius: 0.5rem;
  width: 96%;
  box-shadow: 5px 5px 5px gray;
  margin-bottom: 5px;
}

.fas {
  font-size: 2rem;
  padding: 0.5rem;
  color: rgb(97, 198, 245);
}

.textFilter {
  font-size: 0.5rem;
  margin-bottom: 0;
}

.leaflet-control-attribution {
  display: none;
}

.lettreTransport {
  display: inline-block;
  width: 40%;
  border: 2px solid #0e5da4;
  border-radius: 75%;
  padding: 0.3rem;
  margin-top: 0.5rem;
  font-size: 1rem;
}

.borderCentral {
  border-right: 1px solid rgb(182, 181, 181, 0.5);

  border-left: 1px solid rgb(182, 181, 181, 0.5);
}

.borderBottom {
  border-bottom: 1px solid rgb(182, 181, 181, 0.5);
}
</style>

