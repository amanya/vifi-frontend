import globalAxios from 'axios'

const state = {
  sensors: []
}

const mutations = {
  sensorsFetch (state, sensors) {
    state.sensors = sensors
  }
}

const actions = {
  sensorsLoad ({ commit, dispatch }, url) {
    const authHeader = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    globalAxios.get(url, { headers: authHeader })
      .then(response => response.data)
      .then(data => {
        commit('sensorsFetch', data.sensors)
        dispatch('magnitudesLoad', data.sensors.map(function (sensor, idx) {
          return {'id': sensor.id, 'url': sensor.magnitudes_url}
        }))
      })
      .catch(error => {
        console.log(error)
        commit('clearAuthData')
      })
  }
}

export default {
  state,
  mutations,
  actions
}
