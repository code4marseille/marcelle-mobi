import Vue from 'vue'

export const state = () => ({



})

export const getters = ({

})

export const mutations = {
  'SET'(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key])
  },

}

export const actions = {


}


