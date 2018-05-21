<template>
  <div>
    <div class="field" v-for="layer in layers" :key="layer">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="selected[layer]" />{{ layer }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SensorModal',
  props: ['sensor'],
  data() {
    return {
      layers: ['Surface', 'Depth 1', 'Depth 2']
    }
  },
  computed: {
    selected: {
      get(layer) {
        return []
        // return this.$store.metrics.selectedMagnitudes[this.sensor.id][layer]
      },
      set(layer, newState) {
        this.$store.dispatch('updateSelectedMagnitudes', {
          sensorId: this.sensor.id,
          layer: layer,
          state: newState
        })
      }
    }
  },
  methods: {
    filterMagnitudes: () => {
      if (!this.magnitudes) {
        return []
      }
      let selected = []
      this.magnitudes.forEach(function(magnitude) {
        if (magnitude.id === this.sensor.id) {
          selected.push(magnitude)
        }
        return selected
      })
    }
  },
  updated() {
    console.log(this.selected)
  }
}
</script>
