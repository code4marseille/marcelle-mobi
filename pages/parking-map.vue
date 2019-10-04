<template>
  <div id="parkingMapPage">
    <div style="z-index:976; display:flex; wrap:no-wrap; justify-content:center;">
      <AutocompleteInput style="z-index:999; width:60%; margin-top: 2%;" />
    </div>
    <div id="position">
      <l-map id="map" :zoom="13" :center="initialLocation" ref="map">
        <MapboxTile />

        <ChargingMarker
          v-for="(charging,i) in $store.state.parkingMap.chargingStations"
          :key="'c'+i"
          :charging="charging"
          :googleMap="googleRoute"
          :visible="buttons[0].state"
        />

        <ParkingMarker
          v-for="(parking,i) in $store.state.parkingMap.parkingStations"
          :key="'p'+i"
          :parking="parking"
          :googleMap="googleRoute"
          :visible="buttons[1].state"
        />

        <CarPoolMarker
          v-for="(carPool,i) in $store.state.parkingMap.carPoolStations"
          :key="'cP'+i"
          :carPool="carPool"
          :googleMap="googleRoute"
          :visible="buttons[2].state"
        />
        <Locatecontrol />
      </l-map>
    </div>

    <div class="fixed-bottom mx-3 mb-3" id="filter">
      <b-button-group style="display:flex; justify-content:center">
        <b-button
          v-for="(btn, idx) in buttons"
          :key="idx"
          :pressed.sync="btn.state"
          variant="light"
          size="sm"
          class="select_btn col-4 borderCentral pt-1"
        >
          <img :src="btn.icon" alt class="icon_filterbar" />
          <p class="text_filterbar">{{ btn.caption }}</p>
        </b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
import { LMap } from 'vue2-leaflet'
import Locatecontrol from '~/components/LocateControl'
import ChargingMarker from '~/components/ChargingMarker.vue'
import ParkingMarker from '~/components/ParkingMarker.vue'
import CarPoolMarker from '~/components/CarPoolMarker.vue'
import MapboxTile from '~/components/MapboxTile.vue'
import AutocompleteInput from '~/components/AutocompleteInput.vue'
import { latLng } from 'leaflet'
export default {
  components: {
    LMap,
    Locatecontrol,
    ChargingMarker,
    ParkingMarker,
    MapboxTile,
    CarPoolMarker,
    AutocompleteInput
  },

  data() {
    return {
      initialLocation: [43.295336, 5.373907],
      gps,

      buttons: [
        {
          caption: 'Recharge',
          state: false,
          icon: require('~/assets/images/electric.svg')
        },
        {
          caption: 'Parkings',
          state: false,
          icon: require('~/assets/images/Parking_icon.svg')
        },
        {
          caption: 'Covoiturage',
          state: true,
          icon: require('~/assets/images/covoiturage.svg')
        }
      ]
    }
  },
  methods: {
    updateParking(center) {
      const coord = { latitude: center.lat, longitude: center.lng }
      this.$store.dispatch('parkingMap/fetchChargingStations', coord)
    },
    googleRoute(lat, long) {
      return (
        'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + long
      )
    }
  },

  created() {
    this.$store.dispatch('parkingMap/fetchChargingStations', {
      latitude: this.initialLocation[0],
      longitude: this.initialLocation[1]
    })
    this.$store.dispatch('parkingMap/fetchParkingStations', {
      lat: this.initialLocation[0],
      long: this.initialLocation[1]
    })
    this.$store.dispatch('parkingMap/fetchCarPoolStations')
  },

  watch: {
    latLng: function() {
      console.log(flyTo(this.latLng))
    }
  }
}
</script>

<style lang="scss">
#parkingMapPage {
  height: 100vh;
  width: 100%;
  margin: 0;

  .leaflet-left {
    right: 0 !important;
    padding-right: 10px;
    left: unset;
  }

  #position {
    position: relative;
  }

  #map {
    width: 100wh;
    height: 100vh;
  }

  .textFilter {
    font-size: 0.5rem;
    margin-bottom: 0;
  }

  // .leaflet-control-attribution {
  //   display: none;
  // }

  .h_iframe iframe {
    width: 100%;
    height: 100%;
  }
  .h_iframe {
    height: 100%;
    width: 100%;
  }

  // DESIGN FILTER CARD

  .icon_filterbar {
    min-width: 35px;
    min-height: 35px;
    margin-top: 5px;
  }

  .text_filterbar {
    color: rgba(0, 0, 0, 0.7);
    margin-top: 5px;
    margin-bottom: 2px;
  }

  #filter {
    background-color: aliceblue;
    height: 80px;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 5px gray;
  }

  .borderCentral {
    border-right: 1px solid rgba(182, 181, 181, 0.8) !important;

    border-left: 1px solid rgba(182, 181, 181, 0.8) !important;
  }

  .select_btn {
    background-color: transparent;
    height: 80px;
    border: transparent;
    outline: none !important;
  }

  .active {
    background-color: rgba(187, 231, 255, 0.38) !important;
    outline: none !important;
    border: 0;
  }

  .fa-search {
    color: #0e5da4;
  }

  .loupe {
    background-color: white;
    border: none;
    border-radius: 0px 10px 10px 0;
    height: 38px;
  }

  .searchbox {
    border: none;
    border-radius: 10px 0 0 10px;
    margin-left: 0px !important;
  }

  .search_content {
    border-radius: 10px;
    border: 0.9px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    z-index: 998;
    display: flex;
    width: 100%;
    margin-left: 70px;
    margin-right: 50px;
  }
}
</style>

