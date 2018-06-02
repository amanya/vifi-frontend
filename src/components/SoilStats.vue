<template>
  <div>
    <header>
      <h1 class="title">{{ vineyard.name }}'s soil stats</h1>
    </header>
    <div class="section">
      <h2 class="subtitle is-3">Historical soil stats</h2>
      <chart :magnitudes="magnitudes()" />
    </div>
    <div class="section">
      <h2 class="subtitle is-3">Current soil stats</h2>
      <vineyard-map :vineyard="vineyard" />
    </div>
  </div>
</template>

<script>
import Chart from './HistChart'
import VineyardMap from './VineyardMap'
import { mapState } from 'vuex'
export default {
  name: 'SoilStats',
  components: {
    chart: Chart,
    vineyardMap: VineyardMap
  },
  computed: {
    ...mapState({
      vineyards: state => state.vineyards.vineyards
    }),
    id() {
      return this.$route.params.id
    },
    vineyard() {
      return this.vineyards.filter(vineyard => vineyard.id === this.id)[0]
    },
    sensors() {
      return this.vineyard.sensors
    }
  },
  methods: {
    magnitudes() {
      let magnitudes = []
      this.sensors.forEach(sensor => {
        magnitudes.push(...sensor.magnitudes)
      })
      return magnitudes
    }
  }
}
</script>
