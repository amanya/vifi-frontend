import globalAxios from 'axios'

export default {
  state: {
    vineyards: [],
    selectedVineyard: {},
    sensorsState: []
  },
  getters: {
    allVineyards: state => state.vineyards,
    vineyardsLoaded: state => state.vineyards.length > 0,
    getSelectedVineyard: state => {
      if (state.selectedVineyard) {
        return state.selectedVineyard
      }
    }
  },
  mutations: {
    vineyardsFetch(state, vineyards) {
      state.vineyards = vineyards
    },
    setSelectedVineyard(state, selectedVineyard) {
      state.selectedVineyard = selectedVineyard
    },
    setSensorsState(state, sensorsState) {
      state.sensorsState = sensorsState
    }
  },
  actions: {
    vineyardsLoad({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        const authHeader = {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        globalAxios.get('/api/v1/vineyards/', { headers: authHeader }).then(
          response => {
            commit('vineyardsFetch', response.data.vineyards)
            resolve(response.data.vineyards)
          },
          error => {
            commit('clearAuthData')
            reject(error)
          }
        )
      })
    },
    setSelectedVineyard({ commit, dispatch }) {
      const selectedVineyard = localStorage.getItem('selectedVineyard') || this.state.vineyards.vineyards[0]
      commit('setSelectedVineyard', selectedVineyard)
    },
    setSensorsState({ commit }) {
      const sensorsState =
        localStorage.getItem('sensorsState') ||
        this.state.vineyards.selectedVineyard.sensors.map((sensor, _) => {
          let layers = { id: sensor.id }
          sensor.magnitudes.forEach(magnitude => {
            layers[magnitude.layer] = true
          })
          return layers
        })
      commit('setSensorsState', sensorsState)
    },
    updateSensorState({ commit }, selectedLayers) {
      const newSensorsState = this.state.vineyards.sensorsState
      const index = newSensorsState.map(ss => ss.id).indexOf(selectedLayers.id)
      newSensorsState.splice(index, 1, selectedLayers)
      commit('setSensorsState', newSensorsState)
    }
  }
}
