import Vue from 'vue'

export const state = () => ({
  cars: [],
  seeCars: true,
  filterHidden: true
})

export const getters = ({

})

export const mutations = {
  'SET'(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key])
  },
  'SET_CARS'(state, cars) {
    state.cars = cars
  },
  'TOGGLE_CARS'(state) {
    state.seeCars = !state.seeCars
  },
  'TOGGLE_FILTER'(state) {
    state.filterHidden = !state.filterHidden
  }

}

export const actions = {
  async fetchCars({ commit }) {
    const cars = await this.$axios.$get('/vehicules/car')
    commit('SET_CARS', cars)
  }
}

