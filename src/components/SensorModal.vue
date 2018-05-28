<template>
  <div>
    <div class="field" v-for="layer in layers" :key="layer">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="selectedLayers[layer]" />{{ layer }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SensorModal',
  props: ['sensor'],
  data() {
    return {
      selectedLayers: []
    }
  },
  computed: {
    ...mapState({
      sensorsState: state => state.vineyards.sensorsState
    }),
    layers() {
      return Object.keys(this.selectedLayers).filter(key => key !== 'id')
    }
  },
  created() {
    this.selectedLayers = this.sensorsState.filter(ss => ss.id === this.sensor.id)[0]
  },
  updated() {
    this.$store.dispatch('updateSensorState', this.selectedLayers)
  }
}
</script>
