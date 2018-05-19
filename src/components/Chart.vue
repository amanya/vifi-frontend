<script>
import { Line } from 'vue-chartjs'
import { mapState } from 'vuex'

export default {
  name: 'Chart',
  extends: Line,
  computed: {
    ...mapState({
      metrics: state => state.metrics.metrics[3]
    }),
    labels () {
      if (!this.metrics) {
        return []
      }
      return this.metrics.map(function (metric, idx) {
        return Date.parse(metric.timestamp)
      })
    },
    data () {
      if (!this.metrics) {
        return []
      }
      return this.metrics.map(function (metric, idx) {
        return metric.value
      })
    }
  },
  mounted () {
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
        data: this.data
      }]
    },
    {
      responsive: true,
      maintainAspectRatio: false
    }
    )
  }
}
</script>
