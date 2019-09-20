import Vue from 'vue'

export const state = () => ({
  cars: [],
  seeCars: true,
  filterVisible: true,
  selectedCar: null
})

export const getters = ({
  carByIdx: state => (idx) => {
    return state.cars[idx]
  }
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

    state.filterVisible = !state.filterVisible
    if (state.selectedCar && state.filterVisible) state.selectedCar = null

  },
  'SELECT_CAR'(state, car) {
    state.selectedCar = car
    if (state.selectedCar && state.filterVisible) { state.filterVisible = false }
  }

}



export const actions = {
  async fetchCars({ commit }) {
    const cars = await this.$axios.$get('/vehicules/car')
    commit('SET_CARS', cars)
  }


}

