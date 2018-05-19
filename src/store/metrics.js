import globalAxios from 'axios'

const state = {
  metrics: {}
}

const mutations = {
  metricsFetch (state, metrics) {
    const parsedMetrics = []
    metrics.metrics.forEach(function (metric) {
      parsedMetrics.push({'timestamp': metric.timestamp, 'value': metric.value})
    })
    state.metrics[metrics.id] = parsedMetrics
  }
}

const actions = {
  metricsLoad ({ commit, dispatch }, urls) {
    const authHeader = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    urls.forEach(function (metricsUrl) {
      globalAxios.get(metricsUrl.url, { headers: authHeader })
        .then(response => response.data)
        .then(data => {
          commit('metricsFetch', { 'id': metricsUrl.id, 'metrics': data.metrics })
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
