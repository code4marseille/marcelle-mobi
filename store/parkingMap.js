export const state = () => ({
  chargingStations: [],
  parkingStations: {}

})

export const mutations = {
  SET_CHARGING_STATIONS(state, chargingStations) {
    state.chargingStations = chargingStations;
  },
  SET_PARKING_STATIONS(state, parkingStations) {
    state.parkingStations = parkingStations.data.pois
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
    const ParkingStations = await this.$axios.get("https://uws2.mappy.net/data/poi/5.3/applications/parking?bbox=43.09747329341403,5.164260864257813,43.49178653083377,5.608520507812501&max=100&extend_bbox=1&mid=1525863837&tagid=SPD_RESPONSE_CATEGORY&abtest=NA")


    commit("SET_PARKING_STATIONS", ParkingStations)
  }
};
