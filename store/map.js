import Vue from 'vue'

export const state = () => ({
  filterVisible: true,
  cars: [],
  bikes: [],
  trots: [],
  seeCars: true,
  seeBikes: true,
  seeTrots: true,
  selectedVehicule: null,

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
  'SET_TROTS'(state, trots) {
    state.trots = trots
  },
  'SET_BIKES'(state, bikes) {
    state.bikes = bikes
  },
  'TOGGLE_CARS'(state) {
    state.seeCars = !state.seeCars
  },
  'TOGGLE_TROTS'(state) {
    state.seeTrots = !state.seeTrots
  },
  'TOGGLE_BIKES'(state) {
    state.seeBikes = !state.seeBikes
  },
  'TOGGLE_FILTER'(state) {
    state.filterVisible = !state.filterVisible
    if (state.selectedVehicule && state.filterVisible) state.selectedVehicule = null;


  },
  'SELECT_VEHICULE'(state, { vehicule, provider }) {
    vehicule.provider = provider
    state.selectedVehicule = vehicule
    if (state.selectedVehicule && state.filterVisible) { state.filterVisible = false }
  }
}



export const actions = {
  async fetchCars({ commit }) {
    const cars = await this.$axios.$get('/vehicules/car')
    commit('SET_CARS', cars)
  },
  async fetchBikes({ commit }) {
    const bikes = await this.$axios.$get('/vehicules/bike')
    commit('SET_BIKES', bikes)
  },
  async fetchTrots({ commit }) {
    const trots = await this.$axios.$get('/vehicules/scooter?lat=43.2941748&lng=5.3743276')
    commit('SET_TROTS', trots)
  }
}

