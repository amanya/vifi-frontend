<script>
import globalAxios from 'axios'
import { Line } from 'vue-chartjs'

export default {
  name: 'Chart',
  extends: Line,
  props: ['magnitudes'],
  data() {
    return {
      collectedMetrics: {}
    }
  },
  computed: {
    labels() {
      if (this.collectedMetrics['Temperature']) {
        const labels = this.collectedMetrics['Temperature'].map(function(metric, idx) {
          return Date.parse(metric.timestamp)
        })
        return labels
      }
    },
    temperatureData() {
      if (!this.collectedMetrics['Temperature']) {
        return []
      }
      return this.collectedMetrics['Temperature'].map(function(metric, idx) {
        return metric.value
      })
    },
    humidityData() {
      if (!this.collectedMetrics['Humidity']) {
        return []
      }
      return this.collectedMetrics['Humidity'].map(function(metric, idx) {
        return metric.value
      })
    }
  },
  methods: {
    fetchMetrics() {
      const authHeader = {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
      const proms = this.magnitudes.map((m, idx) => {
        return globalAxios
          .get('/api/v1/magnitudes/' + m.id + '/metrics/', {
            headers: authHeader
          })
          .then(response => response.data)
          .then(data => {
            if (!this.collectedMetrics.hasOwnProperty(m.type)) {
              this.collectedMetrics[m.type] = []
            }
            this.collectedMetrics[m.type] = this.collectedMetrics[m.type].concat(data.metrics)
          })
          .catch(error => {
            console.log(error)
          })
      })
      return Promise.all(proms)
    }
  },
  mounted() {
    this.fetchMetrics()
      .then(() => {
        const tempGradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
        tempGradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
        tempGradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
        tempGradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

        const humGradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
        humGradient.addColorStop(0, 'rgba(0, 0, 255, 0.5)')
        humGradient.addColorStop(0.5, 'rgba(0, 0, 255, 0.25)')
        humGradient.addColorStop(1, 'rgba(0, 0, 255, 0)')

        this.renderChart(
          {
            labels: this.labels,
            datasets: [
              {
                label: 'Temperature',
                backgroundColor: tempGradient,
                data: this.temperatureData
              },
              {
                label: 'Humidity',
                backgroundColor: humGradient,
                data: this.humidityData
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
