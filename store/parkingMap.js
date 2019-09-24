export const state = () => ({
<<<<<<< HEAD:store/chargingmap.js
  filterVisible: true,
  chargings: [],
  moreInfo: []
=======
  chargingStations: []
>>>>>>> 7c45c2f1494578886c5174557a8379d9b5123b62:store/parkingMap.js
});

export const getters = {};
export const mutations = {
<<<<<<< HEAD:store/chargingmap.js
  SET_CHARGINGS(state, chargings) {
    state.chargings = chargings;
  },
  SET_MOREINFO(state, infos) {
    state.moreInfo = moreInfo;
=======
  SET_CHARGING_STATIONS(state, chargingStations) {
    state.chargingStations = chargingStations;
>>>>>>> 7c45c2f1494578886c5174557a8379d9b5123b62:store/parkingMap.js
  }
};

export const actions = {
  async fetchChargingStations({ commit }) {
    const chargingStations = await this.$axios.$get(
      "https://api.openchargemap.io/v3/poi/?output=json&countrycode=FR&latitude=43.295336&longitude=5.373907&distanceunit=KM&verbose=false&compact=true"
    );

<<<<<<< HEAD:store/chargingmap.js
    commit("SET_CHARGINGS", chargings);
  },
  async fetchMoreInfo({ commit }) {
    const moreInfo = await this.$axios.$get(
      "https://api.openchargemap.io/v3/referencedata/"
    );

    commit("SET_MOREINFO", moreInfo);
=======
    commit("SET_CHARGING_STATIONS", chargingStations);
>>>>>>> 7c45c2f1494578886c5174557a8379d9b5123b62:store/parkingMap.js
  }
};
