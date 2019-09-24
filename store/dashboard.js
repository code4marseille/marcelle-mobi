import Vue from 'vue'

import weatherStatuses from "~/static/weatherStatuses"
import activitiesStatuses from "~/static/activitiesStatuses"

export const state = () => ({
  activeBackground: require('~/assets/images/scuba.svg'),
  activitesProposees: [],
  airQuality: '-',
  airQualityText: "",
  alertRtm: [],
  colorTemp: {
    cold: '#7AE5ED',
    hot: '#F9B34D',
    normal: '#AAEC76'
  },
  fanSpeed: '',
  orientation: '',
  speedRotation: {},
  show: false,
  temperature: '-',
  windSpeed: '-',
  weather: {},
  weatherIcon: ""
})

export const getters = ({
  activitiesFiltered: state => {
    return state.activitesProposees.filter(activity => {
      console.return(activity)
      // if (activity.condition.minTemp < state.temperature &&
      //   activity.conditions.maxTemp > state.temperature &&
      //   activity.conditions.minWind < state.windSpeed &&
      //   activity.conditions.maxWind > state.windSpeed &&
      //   activity.conditions.beau === state.weather.clean

      // ) {
      //   return activity
      // }
    })
  }
})

export const mutations = {
  'SET'(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key])
  },
  'SET_AIRQUALITY'(state, airQuality) {
    state.airQuality = airQuality
    if (airQuality <= 3) {
      state.airQualityText = "Risque très élevé pour la santé, évitez les activités physiques à l'extérieur."
      state.activeBackground = require('~/assets/images/scuba.svg')
    } else if (airQuality <= 7) {
      state.airQualityText = "Risque modéré pour la santé. "
      state.activeBackground = require('~/assets/images/lungs.svg')
    } else {
      state.airQualityText = "Faible risque pour la santé. La qualité de l'air est idéale pour les activités de plein air."
      state.activeBackground = require('~/assets/images/lavande.svg')

    }
  },
  'SET_TEMPERATURE'(state, temperature) {
    state.temperature = Math.round(temperature)
  },
  'SET_WEATHER'(state, weather) {
    state.weather = weather
  },
  'SET_WIND'(state, windSpeed) {
    state.windSpeed = windSpeed
    state.speedRotation = { animationDuration: 20 / windSpeed * 3 + "s" }
  },
  'SET_ORIENTATION'(state, orientation) {
    state.orientation = "transform:rotate(" + orientation + "deg)"
  },
  // 'SET_ACTIVITIES'(state, activities) {
  //   state.activitesProposees = activities
  // },



}

export const actions = {
  async fetchWeather({ commit, state }) {

    const weatherObject = await this.$axios.$get('/weathers/today')
    const weatherStatus = weatherObject.weather[0].main
    const wind = weatherObject.wind
    commit('SET_TEMPERATURE', weatherObject.main.temp)
    commit('SET_WEATHER', weatherStatuses[weatherStatus])
    commit('SET_WIND', Math.trunc(wind.speed * 3.6))
    commit('SET_ORIENTATION', wind.deg)
    commit('SET_ACTIVITIES', activitiesStatuses)




    // let tabActivities = [];
    // // activites = this.activitiesStatuses.activities
    // console.log(activites)
    // activites.forEach(e => {
    //   if (
    //     e.conditions.minTemp < temperature &&
    //     e.conditions.maxTemp > temperature &&
    //     e.conditions.minWind < windSpeed &&
    //     e.conditions.maxWind > windSpeed &&
    //     e.conditions.beau === this.weatherIcons[weather].clear
    //   ) {
    //     tabActivities.push({
    //       nom: e.name.toUpperCase(),
    //       icon: e.icon
    //     })
    //   }
    // })
    // commit('SET_ACTIVITES', tabActivities)


  },
  async fetchAirQuality({ commit }) {
    const airQuality = await this.$axios.$get('/airs/quality')
    commit('SET_AIRQUALITY', Math.round(10 - airQuality.data.aqi / 10))

  }

}

