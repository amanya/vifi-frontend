<template>
  <div class="columns">
    <div class="column">
      <div>
        <div class="notification is-danger" v-if="error">{{ error }}</div>
      </div>
      <div>
        <chart v-if='enabledMagnitudesByType' :magnitudes='enabledMagnitudesByType' :height='400' />
      </div>
      <div>
      </div>
    </div>
    <div class="column">

      <GmapMap
         v-if="google && selectedVineyard"
         :center="center"
         :zoom="17"
         map-type-id="satellite"
         style="width: 100%; height: 400px"
      >

      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <sensor-modal
          v-if="selectedVineyard.sensors"
          v-for="sensor in selectedVineyard.sensors"
          :key="sensor.id"
          @sensorModalUpdated='chartUpdated'
          :sensor="sensor"
          :sensorState="sensorState.filter(ss => ss.id === sensor.id)"/>
      </gmap-info-window>

        <GmapMarker
           :key="index"
           v-for="(m, index) in markers"
           :position="m.position"
           :clickable="true"
           :draggable="false"
           @click="toggleInfoWindow(m, index)"
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
import SensorModal from './SensorModal'
import { mapGetters } from 'vuex'
import { gmapApi } from 'vue2-google-maps'

export default {
  name: 'Vineyard',
  components: {
    chart: Chart,
    'sensor-modal': SensorModal
  },
  data() {
    return {
      sensorState: [],
      selectedVineyard: null,
      error: '',
      zoom: 17,
      vineyard: {},
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      vineyards: 'allVineyards'
    }),
    google: gmapApi,
    markers() {
      return this.getMarkers()
    },
    center() {
      if (this.google) {
        let bound = new this.google.maps.LatLngBounds()
        for (let i = 0; i < this.selectedVineyard.sensors.length; i++) {
          bound.extend(
            new this.google.maps.LatLng(
              this.selectedVineyard.sensors[i].latitude,
              this.selectedVineyard.sensors[i].longitude
            )
          )
        }
        return bound.getCenter()
      }
    },
    enabledMagnitudesByType() {
      if (this.selectedVineyard.sensors) {
        const sensors = this.selectedVineyard.sensors
        let magnitudes = []
        sensors.forEach(sensor => {
          sensor.magnitudes.forEach(magnitude => {
            magnitudes.push({
              type: magnitude.type,
              id: magnitude.id
            })
          })
        })
        return magnitudes
      }
    }
  },
  methods: {
    chartUpdated(event) {
      console.log(event)
    },
    getMarkers() {
      let markers = []
      if (this.google && this.selectedVineyard.sensors) {
        for (let i = 0; i < this.selectedVineyard.sensors.length; i++) {
          markers.push({
            position: new this.google.maps.LatLng(
              this.selectedVineyard.sensors[i].latitude,
              this.selectedVineyard.sensors[i].longitude
            ),
            infoText: this.selectedVineyard.sensors[i].description
          })
        }
      }
      return markers
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.infoText

      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  },
  created() {
    this.$store
      .dispatch('vineyardsLoad')
      .then(() => {
        this.selectedVineyard = this.vineyards[0]
        console.log(this.selectedVineyard)
      })
      .then(() => {
        this.sensorState = this.selectedVineyard.sensors.map((sensor, _) => {
          let layers = { id: sensor.id }
          sensor.magnitudes.forEach(magnitude => {
            layers[magnitude.layer] = true
          })
          return layers
        })
      })
  }
}
</script>
<style>
</style>
