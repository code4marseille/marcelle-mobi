export const state = () => ({
  chargingStations: [],
  chargingStationReferences: { usageTypes: [], connectionTypes: [] },

});

export const getters = {
  chargingStationUsageType: state => id => {

    return state.chargingStationReferences.usageTypes.find(usageType => {
      // console.log(usageType.id, id)
      return usageType.id === id
    })



  },
  chargingConnectionType: state => id => {
    return state.chargingStationReferences.connectionTypes.find(connectionType => {
      return connectionType === id
    })
  }


}
export const mutations = {
  SET_CHARGING_STATIONS(state, chargingStations) {
    state.chargingStations = chargingStations;
  },
  SET_CHARGING_STATION_REFERENCES(state, chargingStationReferences) {
    state.chargingStationReferences = chargingStationReferences;
  },
};

export const actions = {
  async fetchChargingStations({ commit }, { latitude, longitude }) {
    const chargingStations = await this.$axios.$get(
      "https://api.openchargemap.io/v3/poi/", {
      params: {
        output: 'json', countrycode: 'FR', latitude, longitude, distanceunit: 'KM', verbose: false, compact: true, camelcase: true, maxresults: 1000, distance: 25
      }
    }
    );


    commit("SET_CHARGING_STATIONS", chargingStations);
  },
  async fetchChargingStationReferences({ commit }) {
    const chargingStations = await this.$axios.$get(
      "https://api.openchargemap.io/v3/referencedata/", {
      params: {
        camelcase: true, countrycode: 'FR'
      }
    }
    );
    commit("SET_CHARGING_STATION_REFERENCES", chargingStations);

  }
};
