<template lang="pug">
  div
    b-row.mt-3
      b-col
        h2 {{ config.name }} > {{ region.name }}
      b-col(cols="3" align-h="center")
        b-button.mbtn(variant="warning" @click="changeMode") {{ minuteMode ? '即時' : '24小時' }}
        //- b-button.mbtn(xvariant="warning" @click.stop="showDropdown = true") 顯示項目
        b-dropdown(text="顯示項目" variant="warning" class="m-2")
          b-dropdown-form
          .m-dropdown
              div(v-for="(cl, index) in chartControlOptions" :key="index")
                b-form-checkbox(v-model="cl.checked" @change="toggle") {{ cl.name }}
    b-row
      b-col
        b-overlay(:show="loading")
          b-card.card
            LineChart(:chart-data="chartdataloaded" :options="chartOptions")
    b-row.legend
      b-col(cols=2 v-for="(cl, index) in chartControlOptions" :key="index" v-if="!disables.includes(index)")
        .colorRec(:style="{ 'background-color' : colors[index] }")
        .text-center {{ cl.name }}
</template>
<style>
 .dropdown-menu {
    background-color: none;
    background-clip: none;
    border: none;
    padding: 0;
  }
</style>


<style lang="scss" scoped>
  .spliter {
    padding-top: 20px;
  }
  .card {
    margin: 10px 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
 
  .m-dropdown {
    z-index: 1;
    background-color: #2d2d2d;
    color: white;
    border-radius: 8px;
    padding: 12px 15px;
    margin-top: -25px;
    z-index: 1;
    opacity: 0.9;
    font-size: 14px;
    line-height: 24px;
  }
  .mbtn {
    margin: 0px 10px;
  }
  .colorRec {
    margin-top: 15px;
    height: 26px;
    width: 100%;
  }
  .disable {
    filter: grayscale(1);
    text-decoration: line-through;
  }
</style>

<script>

import { convertRegionChartData, chartLines, colors } from '../dataConvert'
import { mapState } from 'vuex'

function sleep (sec) {
  return new Promise(res => setTimeout(res, sec * 1000))
}

const second = 1000
const pollingInt = 60 * second
const OPTION_DISABLE = 255

export default {
  data () {
    return {
      loading: true,
      minuteMode: false,
      chartdataloaded: {},
      showDropdown: false,
      colors,
      chartControlOptions: chartLines.map(cl => ({
        name: cl.name,
        checked: true,
      })),
      historyMinuteData: {},
    }
  },
  
  computed: {
    ...mapState(['regions', 'status', 'config', 'historyHour']),

    chartOptions () {
      return {
        animation: {
          duration: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: 'right',
          align: 'end',
        },
        title: {
          display: true,
          text: '分析圖',
          fontSize: 16,
        },
        scales: {
          yAxes: chartLines.map((cl, cli) => ({
            id: cl.yAxisID,
            display: this.chartControlOptions.filter((o, i) => o.checked).length !== 1
              ? false
              : this.chartControlOptions[cli].checked
          })),
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'hour'
            }
          }],
        }
      }
    },

    region () {
      return this.regions[this.region_index] || {}
    },
    region_index () {
      return this.$route.hash.substring(1)
    },
    disables () {
      return this.chartControlOptions.map((o, index) => o.checked ? OPTION_DISABLE : index).filter(v => v < OPTION_DISABLE)
    },
    showLegend () {
      return this.chartControlOptions.filter((o, i) => o.checked) === 1
    }
  },
  watch: {
    region_index () {
      if (this.minuteMode) {
        this.updateHistoryMinute()
      } else {
        this.renderHourChart()
      }
    }
  },
  methods: {
    changeMode () {
      // if (this.minuteMode === setToMinMode) return
      this.minuteMode = !this.minuteMode
      // setToMinMode
      if (this.minuteMode) {
        this.itv = setInterval(this.updateHistoryMinute, pollingInt)

        this.updateHistoryMinute()
      } else {
        this.renderHourChart()
      }
    },
    renderHourChart () {
      this.chartOptions.title.text = '24小時內變化圖'
      this.chartOptions.scales.xAxes[0].time.unit = 'hour'
      this.chartdataloaded = convertRegionChartData(this.historyHour, this.regions[this.region_index], this.disables)
    },
    renderMinuteChart () {
      this.chartOptions.title.text = '即時變化圖'
      this.chartOptions.scales.xAxes[0].time.unit = 'minute'
      this.chartdataloaded = convertRegionChartData(this.historyMinuteData, this.regions[this.region_index], this.disables)
    },
    async updateHistoryMinute () {
      this.loading = true
      let { data: historyMinuteData } = await this.$axios.get('history', { params : {
        config_id: this.config.id,
        step: 'minute',
      }})
      this.loading = false
      this.historyMinuteData = historyMinuteData
      if (this.minuteMode) this.renderMinuteChart()
    },
    toggle () {
      setTimeout(this.reChart)
    },
    reChart () {
      if (this.minuteMode) this.renderMinuteChart()
      else this.renderHourChart()
    },
  },
  async mounted () {
    while (!Object.keys(this.historyHour).length || !this.regions.length) {
      console.log('sleep')
      await sleep(1)
    }
    this.loading = false
    this.renderHourChart()
  },
  beforeDestroy () {
    console.log('should leave and destory interval')
    clearInterval(this.itv)
  }
}

</script>