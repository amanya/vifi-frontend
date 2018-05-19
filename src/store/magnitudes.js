import globalAxios from 'axios'

const state = {
  magnitudes: {}
}

const mutations = {
  magnitudesFetch (state, magnitudes) {
    state.magnitudes[magnitudes.id] = magnitudes.magnitudes
  }
}

const actions = {
  magnitudesLoad ({ commit, dispatch }, urls) {
    const authHeader = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    urls.forEach(function (magnitudesUrl) {
      globalAxios.get(magnitudesUrl.url, { headers: authHeader })
        .then(response => response.data)
        .then(data => {
          commit('magnitudesFetch', { 'id': magnitudesUrl.id, 'magnitudes': data.magnitudes })
          dispatch('metricsLoad', data.magnitudes.map(function (magnitude, idx) {
            return {'id': magnitude.id, 'url': magnitude.metrics_url}
          }))
        })
        .catch(error => {
          console.log(error)
          commit('clearAuthData')
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
