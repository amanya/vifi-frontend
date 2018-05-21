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
export default {
  name: 'SensorModal',
  props: ['sensor', 'sensorState'],
  data() {
    return {
      layers: ['Surface', 'Depth 1', 'Depth 2'],
      selectedLayers: {
        Surface: true,
        'Depth 1': true,
        'Depth 2': true
      }
    }
  },
  updated() {
    console.log(this.sensorState)
    this.$emit('sensorModalUpdated', this.sensor.id)
  }
}
</script>
