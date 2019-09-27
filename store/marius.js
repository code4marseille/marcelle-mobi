import Vue from 'vue'

export const state = () => ({

  mariusResult: { sections: [{ geojson: { coordinates: [] } }] },

})

export const getters = ({

})

export const mutations = {
  'SET'(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key])


  },
  SET_MARIUS(state, mariusResult) {
    state.mariusResult = mariusResult;
  }


}

export const actions = {

  async fetchMarius({ commit }) {
    const mariusResult = await this.$axios.$get(
      "http://marcelle-mobi-api.herokuapp.com/itineraries/calculate?departure_address=metro%20dromel&arrival_address=12%20impasse%20abeille&mode=bike"


    )

    commit("SET_MARIUS", mariusResult);
  },
}

//http://marcelle-mobi-api.herokuapp.com/itineraries/calculate?departure_address=metro%20dromel&arrival_address=12%20impasse%20abeille&mode=bike

