import Vue from 'vue'

export const state = () => ({

  itineraries: { sections: [{ geojson: { coordinates: [] } }] },



})

export const getters = ({

  latLngs: state => state.itineraries.sections[0].geojson.coordinates

})

export const mutations = {
  'SET'(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key])


  },
  SET_ITINERARIES(state, payload) {
    payload.sections[0].geojson.coordinates.map(x => x.reverse())
    state.itineraries = payload;
  },


}

export const actions = {



  async fetchitineraries({ commit }, { departure_address, arrival_address, mode }) {
    const itineraries = await this.$axios.$get(
      "/itineraries/calculate", { params: { departure_address, arrival_address, mode } }


    )

    commit("SET_ITINERARIES", itineraries);
  },
}

//http://marcelle-mobi-api.herokuapp.com/itineraries/calculate?departure_address=metro%20dromel&arrival_address=12%20impasse%20abeille&mode=bike

