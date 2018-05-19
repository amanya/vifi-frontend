import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import vineyards from './vineyards'
import sensors from './sensors'
import magnitudes from './magnitudes'
import metrics from './metrics'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    vineyards,
    sensors,
    magnitudes,
    metrics
  }
})
