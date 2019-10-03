import Vue from "vue";

export const state = () => ({
  filterVisible: true,
  cars: [],
  bikes: [],
  trots: [],
  trams: [],
  bus: [],
  metro: [],
  seeMetros: true,
  seeBus: true,
  seeTrams: true,
  seeCars: true,
  seeBikes: true,
  seeTrots: true,
  selectedVehicule: null,
});

export const getters = {
  carByIdx: state => idx => state.cars[idx],
  allVehicules: state => [
    ...state.cars, ...state.bikes, ...state.trots, ...state.bus, ...state.trams
  ]
}

export const mutations = {
  SET(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key]);
  },
  SET_CARS(state, cars) {
    state.cars = cars;
  },
  SET_TROTS(state, trots) {
    state.trots = trots;
  },
  SET_BIKES(state, bikes) {
    state.bikes = bikes;
  },
  SET_RTMS(state, rtms) {
    state.trams = rtms.filter(trams => trams.type == 1);
    state.trams.map(tram => tram.provider = 'tram');
    state.bus = rtms.filter(bus => bus.type == 2);
    state.bus.map(bus => bus.provider = 'bus');
  },
  TOGGLE_CARS(state) {
    state.seeCars = !state.seeCars;
  },
  TOGGLE_BUS(state) {
    state.seeBus = !state.seeBus;
  },
  TOGGLE_TRAMS(state) {
    state.seeTrams = !state.seeTrams;
  },
  TOGGLE_TROTS(state) {
    state.seeTrots = !state.seeTrots;
  },
  TOGGLE_BIKES(state) {
    state.seeBikes = !state.seeBikes;
  },
  TOGGLE_FILTER(state) {
    state.filterVisible = !state.filterVisible;
    if (state.selectedVehicule && state.filterVisible) state.selectedVehicule = null
  },
  SELECT_VEHICULE(state, { vehicule }) {
    state.selectedVehicule = vehicule
    if (state.selectedVehicule && state.filterVisible) state.filterVisible = false
  }
};

export const actions = {
  async fetchCitiz({ commit, state }) {
    const citizs = await this.$axios.$get('/vehicules/citiz')
    commit('SET_CARS', [...citizs, ...state.cars])
  },
  async fetchTotems({ commit, state }) {
    const totems = await this.$axios.$get('/vehicules/totem')
    commit('SET_CARS', [...totems, ...state.cars])
  },
  async fetchBikes({ commit }) {
    const bikes = await this.$axios.$get("/vehicules/bike");
    commit("SET_BIKES", bikes)
  },
  async fetchTrots({ commit }, { lat, lng }) {
    const trots = await this.$axios.$get('/vehicules/scooter', { params: { lat, lng } })
    commit('SET_TROTS', trots)
  },
  async fetchRtms({ commit }) {
    const rtms = await this.$axios.$get("/vehicules/rtm");
    commit("SET_RTMS", rtms)
  },
  fetchAllVehicles({ dispatch }, { lat, lng }) {
    return Promise.all([
      dispatch('fetchTrots', { lat, lng }),
      dispatch('fetchCitiz'),
      dispatch('fetchTotems'),
      dispatch('fetchBikes'),
      dispatch('fetchRtms')
    ])
  }
};
