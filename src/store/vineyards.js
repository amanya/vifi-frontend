import globalAxios from 'axios'

const state = {
  vineyards: [],
  selectedVineyard: {}
}

const getters = {
  allVineyards: state => state.vineyards,
  vineyardsLoaded: state => state.vineyards.length > 0,
  getSelectedVineyard: state => {
    if (state.selectedVineyard) {
      return state.selectedVineyard
    }
  }
}

const mutations = {
  vineyardsFetch (state, vineyards) {
    state.vineyards = vineyards
    state.selectedVineyard = vineyards[0]
  },
  setSelectedVineyard (state, selectedVineyard) {
    state.selectedVineyard = selectedVineyard
  }
}

const actions = {
  vineyardsLoad ({ commit, dispatch }) {
    const authHeader = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    globalAxios.get('/api/v1/vineyards/', { headers: authHeader })
      .then(response => response.data)
      .then(data => {
        commit('vineyardsFetch', data.vineyards)
        dispatch('setSelectedVineyard', data.vineyards[0])
      })
      .catch(_ => {
        commit('clearAuthData')
      })
  },
  setSelectedVineyard ({ commit, dispatch }, selectedVineyard) {
    commit('setSelectedVineyard', selectedVineyard)
    // dispatch('sensorsLoad', selectedVineyard.sensors_url)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
