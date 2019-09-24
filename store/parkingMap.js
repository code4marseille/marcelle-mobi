export const state = () => ({
  chargingStations: []
});

export const getters = {};
export const mutations = {
  SET_CHARGING_STATIONS(state, chargingStations) {
    state.chargingStations = chargingStations;
  }
};

export const actions = {
  async fetchChargingStations({ commit }) {
    const chargingStations = await this.$axios.$get(
      "https://api.openchargemap.io/v3/poi/?output=json&countrycode=FR&latitude=43.295336&longitude=5.373907&distanceunit=KM&verbose=false&compact=true"
    );

    commit("SET_CHARGING_STATIONS", chargingStations);
  }
};
