import Vue from 'vue'

export const state = () => ({
  bbox: "43.13,5.09,43.45,5.7",
  alertModalShown: false
})

export const getters = ({
  isInsidePerimeter: state => (lat, lng) => {
    const coordMpm = state.bbox.split(",")
    if (lat <= coordMpm[2] &&
      lat >= coordMpm[0] &&
      lng <= coordMpm[3] &&
      lng >= coordMpm[1]) {
      return true
    } else
      return false
  }
}

)

export const mutations = {
  'SET'(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key])
  },
  SET_MODAL(state, alertModalShown) {

    state.alertModalShown = alertModalShown;
  },

}

export const actions = {
  changeStateModal({ commit }, etat) {

    commit("SET_MODAL", etat)
  }

}


