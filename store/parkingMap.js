

export const state = () => ({
  chargingStations: [],

  // 43.43 ~ Marignane - 43.15 ~ La Ciotat
  // Longitudes 5.09 ~ Sausset les pins -  5.7 ~ Ceyreste

  bbox: "43.15,5.09,43.43,5.7",
  // bbox: "43.138572924273255,5.123748779296876,43.45142348523913,5.648345947265626",
  max: 500
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


}
