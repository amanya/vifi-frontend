<template>
  <div class="columns">
    <div class="column">
      <div>
        <div class="notification is-danger" v-if="error">{{ error }}</div>
      </div>
      <div>
        <chart :height="400" />
      </div>
      <div>
      </div>
    </div>
    <div class="column">

      <GmapMap
         :center="center"
         :zoom="16"
         map-type-id="terrain"
         style="width: 100%; height: 400px"
      >
        <GmapMarker
           :key="index"
           v-for="(m, index) in markers"
           :position="m.position"
           :clickable="true"
           :draggable="true"
           @click="center=m.position"
        />
      </GmapMap>

      <div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from './Chart'
import { mapGetters, mapState } from 'vuex'
import { gmapApi } from 'vue2-google-maps'

export default {
  name: 'Vineyard',
  components: {
    'chart': Chart
  },
  data () {
    return {
      error: '',
      zoom: 17,
      vineyard: {}
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      allVineyards: 'allVineyards',
      getSelectedVineyard: 'getSelectedVineyard'
    }),
    ...mapState({
      selectedVineyard: state => state.vineyards.selectedVineyard,
      sensors: state => state.sensors.sensors
    }),
    google: gmapApi,
    center () {
      if (this.google) {
        let bound = new this.google.maps.LatLngBounds()
        for (let i = 0; i < this.sensors.length; i++) {
          bound.extend(new this.google.maps.LatLng(this.sensors[i].latitude, this.sensors[i].longitude))
        }
        return bound.getCenter()
      }
    }
  },
  created () {
    this.$store.dispatch('vineyardsLoad')
  }
}
</script>
<style>
</style>
