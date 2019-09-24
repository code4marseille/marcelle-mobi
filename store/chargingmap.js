export const state = () => ({
  filterVisible: true,
  chargings: [],
  moreInfo: []
});

export const getters = {};
export const mutations = {
  SET_CHARGINGS(state, chargings) {
    state.chargings = chargings;
  },
  SET_MOREINFO(state, infos) {
    state.moreInfo = moreInfo;
  }
};

export const actions = {
  async fetchCharging({ commit }) {
    const chargings = await this.$axios.$get(
      "https://api.openchargemap.io/v3/poi/?output=json&countrycode=FR&latitude=43.295336&longitude=5.373907&distanceunit=KM&verbose=false&compact=true"
    );

    commit("SET_CHARGINGS", chargings);
  },
  async fetchMoreInfo({ commit }) {
    const moreInfo = await this.$axios.$get(
      "https://api.openchargemap.io/v3/referencedata/"
    );

    commit("SET_MOREINFO", moreInfo);
  }
};
