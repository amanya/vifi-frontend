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
      <div>
        <l-map :zoom="zoom" :center="computedCenter()" style="height: 400px">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :icon="defaultIcon" :lat-lng="markerd.pos"></l-marker>
          <l-marker :icon="defaultIcon" v-for="marker in markers" :key="marker.id" :lat-lng="marker.pos"></l-marker>
        </l-map>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import Chart from './Chart'
import { mapGetters, mapState } from 'vuex'

L.Icon.Default.imagePath = '/'
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Vineyard',
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-marker': LMarker,
    'chart': Chart
  },
  data () {
    return {
      error: '',
      zoom: 17,
      center: L.latLng(47.413220, -1.219482),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [{id: 1, pos: L.latLng(47.413220, -1.219482)}],
      markerd: {id: 1, pos: L.latLng(47.413220, -1.219482)},
      vineyard: {},
      defaultIcon: L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        shadowSize: [41, 41],
        iconAnchor: [12, 41],
        shadowAnchor: [12, 41],
        popupAnchor: [-3, -76]
      })
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
    })
  },
  watch: {
    sensors: function (newSensors) {
      this.updateMap(newSensors)
    }
  },
  methods: {
    computedCenter () {
      if (this.selectedVineyard && this.sensors) {
        const sensor = this.sensors[0]
        return L.latLng(sensor.latitude, sensor.longitude)
      }
      return L.latLng(47.413220, -1.219482)
    },
    updateMap (sensors) {
      let markers = []
      if (!sensors) {
        return
      }
      sensors.forEach(function (sensor) {
        markers.push({ id: sensor.id, pos: L.latLng(sensor.latitude, sensor.longitude) })
      })
      this.markers = markers
    }
  },
  created () {
    this.$store.dispatch('vineyardsLoad')
  }
}
</script>
<style>
</style>
