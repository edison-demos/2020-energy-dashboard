<script>
import { Doughnut, mixins } from 'vue-chartjs'

export default {
  mixins: [mixins.reactiveProp],
  extends: Doughnut,
  props: ['options'], 
  mounted() {
    this.renderLineChart()
  },
  methods: {
    renderLineChart() {
      this.renderChart(this.chartData, this.options)
    }
  },
  watch: {
    options: {
      deep: true,
      handler () {
        this.renderChart(this.chartData, this.options)
      },
    }
  }
}
</script>
