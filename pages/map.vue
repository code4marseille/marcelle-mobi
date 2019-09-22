<template>
  <div id="mapPage">
    <div id="position">
      <v-map id="map" :zoom="15" :center="initialLocation" ref="map">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>

        <template v-if="$store.state.map.seeCars">
          <l-marker
            v-for="(car,i) in $store.state.map.cars"
            :key="'car'+i"
            :lat-lng="[car.gpsLatitude,car.gpsLongitude]"
            @click="flyTo([car.gpsLatitude, car.gpsLongitude])"
            :icon="citizIcon"
          ></l-marker>
        </template>
        <template v-if="$store.state.map.seeBikes">
          <l-marker
            v-for="(bike,i) in $store.state.map.bikes"
            :key="'bike'+i"
            :lat-lng="[bike.position.lat,bike.position.lng]"
            @click="flyTo([bike.position.lat,bike.position.lng])"
            :icon="bikeIcon"
          ></l-marker>
        </template>
        <template v-if="$store.state.map.seeTrots">
          <l-marker
            v-for="(trot,i) in $store.state.map.trots"
            :key="'trot'+i"
            :lat-lng="[trot.lat,trot.lng]"
            @click="flyTo([trot.lat,trot.lng])"
            :icon="limeIcon"
          ></l-marker>
        </template>

        <v-locatecontrol />
      </v-map>
      <transition name="fade">
        <MapFilter />
      </transition>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LMarker } from 'vue2-leaflet'
import { latLng, Icon, icon, popup } from 'leaflet'
import Vue2LeafletLocatecontrol from '~/components/Vue2LeafletLocatecontrol'
import MapFilter from '~/components/MapFilter.vue'

export default {
  components: {
    'v-map': LMap,
    'v-tilelayer': LTileLayer,
    'v-locatecontrol': Vue2LeafletLocatecontrol,
    MapFilter
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907]
    }
  },
  created() {
    this.$store.dispatch('map/fetchCars')
    this.$store.dispatch('map/fetchTrots')
    this.$store.dispatch('map/fetchBikes')
  },
  methods: {
    flyTo(latLng) {
      this.$refs.map.mapObject.flyTo(latLng, 18)
    }
  },

  computed: {
    citizIcon() {
      return icon({
        iconUrl: require('~/assets/images/citiz_marker.svg'),
        iconSize: [30, 40] // size of the icon
        // iconAnchor: [0, 15] // point of the icon which will correspond to marker's location
        // popupAnchor: [-3, -76] // point from which the po
      })
    },
    limeIcon() {
      return icon({
        iconUrl: require('~/assets/images/lime.svg'),
        iconSize: [30, 40] // size of the icon
        // iconAnchor: [0, 15] // point of the icon which will correspond to marker's location
        // popupAnchor: [-3, -76] // point from which the po
      })
    },
    bikeIcon() {
      return icon({
        iconUrl: require('~/assets/images/iBike.svg'),
        iconSize: [30, 40] // size of the icon
        // iconAnchor: [0, 15] // point of the icon which will correspond to marker's location
        // popupAnchor: [-3, -76] // point from which the po
      })
    }
  }
}
</script>

<style lang="scss">
#mapPage {
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

  .leaflet-popup-tip-container {
    display: none;
    position: fixed;
    bottom: 0;
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
    bottom: 18%;
    right: 2%;
    text-align: center;
    padding: 15px 0px;
    align-self: self-end;
    margin-right: 10px;
    margin-bottom: 10px;
    right: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transform: translateY(200px);
  }
  .fade-enter,
  .fade-leave-to {
    transform: translateY(200px);
  }
}
</style>

