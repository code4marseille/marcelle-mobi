import Vue from 'vue'

export const state = () => ({
  itineraries: {
    current: {
      sections: [{ geojson: { coordinates: [] } }],
      co2Emission: {},
      tags: []
    },
    alternatives: [
      {
        sections: [{ geojson: { coordinates: [] } }],
        co2Emission: {},
        tags: []
      }
    ]
  },
  seeModal: false,
})

export const getters = ({
  // Current Details
  co2current: state => state.itineraries.current.co2Emission.value,
  getMode: state => state.itineraries.current.tags[0],
  durationcurrent: state => Math.round(state.itineraries.current.duration / 60),

  // Alternative Details
  alternativesDetails: state => {
    let detailsAlters = []
    state.itineraries.alternatives.forEach(section => {
      if (section) {
        detailsAlters.push({
          co2: Math.round(section.co2Emission.value),
          duration: Math.round(section.duration / 60),
          mode: section.tags[0]
        })
      }
    });
    return detailsAlters
  },

  // Current Itineraries Vehicule
  latLngs: state => {
    let latLngs = []
    state.itineraries.current.sections.forEach(section => {
      if (section.geojson) latLngs.push(...section.geojson.coordinates)
    });
    return latLngs
  },
  latLngsAlternatives: state => {
    let latLngsAlters = []
    state.itineraries.alternatives.forEach(itinerary => {
      let latLngs = []
      itinerary.sections.forEach(section => {
        if (section.geojson) latLngs.push(...section.geojson.coordinates)
      });
      latLngsAlters.push(latLngs)
    });
    return latLngsAlters

  }
})

export const mutations = {
  'SET'(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key])
  },
  SET_ITINERARIES(state, payload) {
    payload.current.sections.map(section => {
      if (section.geojson) return section.geojson.coordinates.map(x => x.reverse())
    })
    payload.alternatives.map(itinerary => {
      return itinerary.sections.map(section => {
        if (section.geojson) return section.geojson.coordinates.map(x => x.reverse())
      })
    })
    state.itineraries = payload;
  },
  TOGGLE_MODAL(state) {
    state.seeModal = !state.seeModal;
  },
}


export const actions = {
  async fetchitineraries({ commit }, { fromLatLng, toLatLng, mode }) {
    const itineraries = await this.$axios.$get("/itineraries/calculate", {
      params: {
        lat_departure: fromLatLng[0],
        lng_departure: fromLatLng[1],
        lat_arrival: toLatLng[0],
        lng_arrival: toLatLng[1],
        mode: mode
      }
    })
    commit("SET_ITINERARIES", itineraries);
  },
}

