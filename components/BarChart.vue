<script>
import { Bar, mixins } from 'vue-chartjs'
import { chartLines } from '../dataConvert.js'

export default {
  mixins: [mixins.reactiveProp],
  extends: Bar,
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