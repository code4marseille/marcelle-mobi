export const state = () => ({
  chargingStations: [],
  parkingStations: {},
  carPoolStations: {}

})

export const mutations = {
  SET_CHARGING_STATIONS(state, chargingStations) {
    state.chargingStations = chargingStations;
  },
  SET_PARKING_STATIONS(state, parkingStations) {
    state.parkingStations = parkingStations.data.pois
  },
  SET_CAR_POOL_STATIONS(state, carPoolStations) {
    state.carPoolStations = carPoolStations.data.pois
  }

};

export const actions = {
  async fetchChargingStations({ commit }, { latitude, longitude }) {
    const chargingStations = await this.$axios.$get(
      "https://api.openchargemap.io/v3/poi/", {
      params: {
        output: 'json', countrycode: 'FR', latitude, longitude, distanceunit: 'KM', verbose: false, camelcase: true, maxresults: 1000, distance: 25
      }
    }
    );
    commit("SET_CHARGING_STATIONS", chargingStations);
  },


  async fetchParkingStations({ commit }) {
    const ParkingStations = await this.$axios.get("https://uws2.mappy.net/data/poi/5.3/applications/parking", { params: { bbox: "43.19641642847414,5.326309204101563,43.59357267488317,5.8227828979492", max: 500, } })

    commit("SET_PARKING_STATIONS", ParkingStations)
  },

  async fetchCarPoolStations({ commit }) {
    const carPoolStations = await this.$axios.get("https://search.mappy.net/search/1.1/find?extend_bbox=1&bbox=43.29032652373382,5.360984802246094,43.316248194766914,5.3992652893066415&q=Aire%20de%20covoiturage&favorite_country=250&language=FRE&loc_format=geojson&mid=9720806026&tagid=SPD_RESPONSE_SEARCH&abtest=NA&max_results=50")
    commit("SET_CAR_POOL_STATIONS", carPoolStations)
  }
}
