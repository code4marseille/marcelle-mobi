import Vue from 'vue'

export const state = () => ({
  itineraries: { current: { sections: [{ geojson: { coordinates: [] } }] } },
  seeModal: false,



})

export const getters = ({

  co2current: state => state.itineraries.current.co2Emission["value"],
  getMode: state => state.itineraries.current.tags[0],
  durationcurrent: state => state.itineraries.current.duration / 60,


  latLngs: state => {
    let latLngs = []

    state.itineraries.current.sections.forEach(section => {
      if (section.geojson) latLngs.push(...section.geojson.coordinates)
    });
    return latLngs
  }

})

export const mutations = {
  'SET'(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key])


  },
  SET_ITINERARIES(state, payload) {
    payload.current.sections.map(section => {
      console.log(section);
      if (section.geojson) return section.geojson.coordinates.map(x => x.reverse())
    })

    state.itineraries = payload;
  },

  TOGGLE_MODAL(state) {
    state.seeModal = !state.seeModal;
  },
}



export const actions = {
  async fetchitineraries({ commit }, { from, to, mode }) {
    const itineraries = await this.$axios.$get(
      "/itineraries/calculate", { params: { departure_address: from, arrival_address: to, mode } }
    )

    commit("SET_ITINERARIES", itineraries);
  },
}

//http://marcelle-mobi-api.herokuapp.com/itineraries/calculate?departure_address=metro%20dromel&arrival_address=12%20impasse%20abeille&mode=bike

