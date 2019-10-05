import Vue from 'vue'
import weatherStatuses from "~/static/weatherStatuses"
import activitiesStatuses from "~/static/activitiesStatuses"

export const state = () => ({
  activeBackground: require('~/assets/images/scuba.svg'),
  airQuality: '-',
  airQualitySummary: '',
  airQualityText: "",
  alertsRtm: [],
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

// GETTERS
export const getters = {
  activitesProposees: state => {
    return (
      activitiesStatuses.activities.filter(activity => activity.conditions.minTemp <= state.temperature && activity.conditions.maxTemp >= state.temperature &&
        activity.conditions.minWind <= state.windSpeed &&
        activity.conditions.maxWind >= state.windSpeed
        && activity.conditions.clear === state.weather.clear && activity.conditions.airQualityMin < state.airQuality
      )
    )
  }
}


export const mutations = {
  'SET'(state, payload) {
    for (const key in payload) Vue.set(state, key, payload[key])
  },
  'SET_AIRQUALITY'(state, airQuality) {
    state.airQuality = airQuality

    if (airQuality > 8.3) {
      state.airQualityText = "La qualité de l'air est jugée satisfaisante, et la pollution de l'air pose peu ou pas de risque."
      state.airQualitySummary = "Bon"
      state.activeBackground = require('~/assets/images/lavande.svg')
    } else if (airQuality > 6, 6) {
      state.airQualityText = "La qualité de l'air est acceptable. Cependant, pour certains polluants, il peut y avoir un risque sur la santé pour un très petit nombre de personnes inhabituellement sensibles à la pollution atmosphérique."
      state.airQualitySummary = "Modéré"
      state.activeBackground = require('~/assets/images/lavande.svg')
    } else if (airQuality > 5) {
      state.airQualityText = "La qualité de l'air est acceptable; Cependant, pour certains polluants, il peut y avoir un problème de santé modérée pour un très petit nombre de personnes qui sont particulièrement sensibles à la pollution de l'air."
      state.airQualitySummary = "Mauvais pour les groupes sensibles"
      state.activeBackground = require('~/assets/images/lungs.svg')
    } else if (airQuality > 3.3) {
      state.airQualityText = "Tout le monde peut commencer à ressentir des effets sur la santé; les membres des groupes sensibles peuvent ressentir des effets de santé plus graves."
      state.airQualitySummary = "Mauvais"
      state.activeBackground = require('~/assets/images/lungs.svg')
    } else if (airQuality > 1.6) {
      state.airQualityText = "Avertissements de santé de conditions d'urgence. Toute la population est plus susceptible d'être affecté."
      state.airQualitySummary = "Très Mauvais"
      state.activeBackground = require('~/assets/images/scuba.svg')
    } else {
      state.airQualityText = "Alerte de santé: tout le monde peut ressentir des effets de santé plus graves."
      state.airQualitySummary = "Dangereux"
      state.activeBackground = require('~/assets/images/scuba.svg')
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

  'SET_ALERTSRTM'(state, alertsRtm) {
    state.alertsRtm = alertsRtm

  }
}

export const actions = {
  async fetchWeather({ commit }) {
    const weatherObject = await this.$axios.$get('/weathers/today', { params: { q: 'Marseille' } })
    const weatherStatus = weatherObject.weather[0].main
    const wind = weatherObject.wind
    commit('SET_TEMPERATURE', weatherObject.main.temp)
    commit('SET_WEATHER', weatherStatuses[weatherStatus])
    commit('SET_WIND', Math.trunc(wind.speed * 3.6))
    commit('SET_ORIENTATION', wind.deg)
  },

  async fetchAirQuality({ commit }) {
    const airQuality = await this.$axios.$get('/air/quality_by_city', { params: { city: 'Marseille' } })
    const scoreOn10 = Math.round((300 - airQuality.data.aqi) / 3) / 10
    commit('SET_AIRQUALITY', scoreOn10)
  },

  async fetchAlertsRtm({ commit }) {
    let tabInfos = []
    const alertsRtm = await this.$axios.$get('/alerts/rtm')
    alertsRtm.forEach(alert => {
      tabInfos.push(alert.title.replace('-', '').split(':'))
    });
    commit("SET_ALERTSRTM", tabInfos)
  }
}



