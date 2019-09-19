<template>
  <div>
    <div id="position">
      <v-map id="map" :zoom="15" :center="initialLocation" ref="map">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>

        <template v-if="seeCars">
          <l-marker
            v-for="(car,i) in cars"
            :key="i"
            :lat-lng="[car.gpsLatitude,car.gpsLongitude]"
            @click="setCurrentCar(car)"
            :duration="5000"
            :icon="citizIcon"
          ></l-marker>
        </template>

        <v-locatecontrol />
      </v-map>

      <transition name="fade">
        <div class="filterGo">
          <div v-on:click="toggleFilter()" class="buttonGo">GO</div>
          <div v-if="hideFilter" id="filter" class="container">
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
              <div v-on:click="toggleCar()" class="col-4 borderCentral">
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
      </transition>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LMarker } from 'vue2-leaflet'
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
      initialLocation: [43.295336, 5.373907],
      cars: [],
      seeCars: true,
      hideFilter: true
    }
  },
  mounted() {
    this.$axios
      .$get('http://marcelle-mobi-api.herokuapp.com/vehicules/car')
      .then(response => (this.cars = response))
  },
  methods: {
    setCurrentCar(car) {
      this.$refs.map.mapObject.flyTo([car.gpsLatitude, car.gpsLongitude], 18)
    },
    toggleCar: function() {
      this.seeCars = !this.seeCars
    },

    toggleFilter: function() {
      this.hideFilter = !this.hideFilter
    }
  },

  computed: {
    citizIcon() {
      return icon({
        iconUrl: require('~/assets/images/citiz.png'),
        iconSize: [40, 40], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the po
      })
    }
  }
}
</script>

<style>
.leaflet-left {
  right: 0 !important;
  padding-right: 10px;
  left: unset;
}

#position {
  position: relative;
}

.filterGo {
  position: absolute;
  bottom: 0;
  z-index: 999;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#map {
  width: 100wh;
  height: 100vh;
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
  width: 40px;
  height: 40px;
  display: inline-block;
  border: 2px solid #0e5da4;
  border-radius: 75%;
  padding: 0.3rem;
  margin-top: 0.5rem;
  font-size: 1.3rem;
}

.borderCentral {
  border-right: 1px solid rgb(182, 181, 181, 0.5);

  border-left: 1px solid rgb(182, 181, 181, 0.5);
}

.borderBottom {
  border-bottom: 1px solid rgb(182, 181, 181, 0.5);
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
  bottom: 18%;
  right: 2%;
  text-align: center;
  padding: 15px 0px;
  align-self: self-end;
  margin-right: 10px;
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transform: translateY(200px);
}
.fade-enter,
.fade-leave-to {
  transform: translateY(200px);
}
</style>

