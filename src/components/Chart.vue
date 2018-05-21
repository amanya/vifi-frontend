<script>
import globalAxios from 'axios'
import { Line } from 'vue-chartjs'

export default {
  name: 'Chart',
  extends: Line,
  props: ['magnitudes'],
  data () {
    return {
      collectedMetrics: {}
    }
  },
  computed: {
    labels () {
      console.log(this.collectedMetrics)
      if (this.collectedMetrics['Temperature']) {
        const labels = this.collectedMetrics['Temperature'].map(function (metric, idx) {
          return Date.parse(metric.timestamp)
        })
        console.log(labels)
        return labels
      }
    },
    temperatureData () {
      if (!this.collectedMetrics['Temperature']) {
        return []
      }
      return this.collectedMetrics['Tempeerature'].map(function (metric, idx) {
        return metric.value
      })
    }
  },
  methods: {
    fetchMetrics () {
      const authHeader = {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
      const proms = this.magnitudes.map((m, idx) => {
        globalAxios.get(
          '/api/v1/magnitudes/' + m.id + '/metrics/',
          { headers: authHeader })
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
  mounted () {
    this.fetchMetrics().then(() => {
      console.log('pepe')
      const gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450)
      gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

      this.renderChart({
        labels: this.labels,
        datasets: [{
          label: 'Temperature',
          backgroundColor: gradient,
          data: this.temperatureData
        }]
      }, { responsive: true, maintainAspectRatio: false }
      )
    })
  }
}
</script>
