<template lang="pug">
  .mt-2
    b-row
      b-col
        h2.s-name.text-center 光源異常分析
    b-row.mt-3( align-v="end")
      b-col
        label(for="start-datepicker") Start date
        b-form-datepicker#start-datepicker.md-2(v-model="startDate")
      b-col
        label(for="end-datepicker") End date
        b-form-datepicker#end-datepicker.md-2(v-model="endDate" @)
    b-row.mt-3
      b-col
        b-form-select(v-model="activeRegionIndex"
            text-field="name"
            value-field="index"
            :options="regionOption"
            _change="startAnalysis")
      b-col
        b-form-select(v-model="seletedGearID"
            text-field="name"
            value-field="id"
            :options="gearsInRegion"
            _change="startAnalysis")
          //- b-button(variant="outline-primary" v-for="region, index in regions"
          //-   :pressed="activeGearIndex == index" 
          //-   :key="index" @click="changeRegion(index)" :disabled="lockRegionButton") {{ region.name }}
      b-col(cols=1)
        b-button(@click="search" variant="outline-primary") 搜尋
    b-row
      b-col
        b-card.my-card(v-for="(e, index) in errorPoints" :key="index")
          b-row(align-v="center")
            b-col
              pre 異常發生時間 {{ human(e.created_at) }}
              pre 輸出開路次數: {{ e.light_source_open_count }}
              pre 輸出短路次數: {{ e.light_source_short_count }}
              pre 光源過熱關閉次數: {{ e.light_source_thermal_shutdown_count }}
              pre 光源降載次數: {{ e.light_source_thermal_derating_count }}
            b-col(cols="1")
              b-button(v-if="checkPoint" @click="checkPoint = null") Close
            b-col(cols="1")
              b-button(v-if="checkPoint" @click="startAnalysis(e, -1)" variant="outline-primary") 往前一天
            b-col(cols="1")
              b-button(v-if="checkPoint" @click="startAnalysis(e, 1)" variant="outline-primary") 往後一天
            b-col(cols="1")
              b-button(@click="startAnalysis(e, 0)" variant="outline-primary") 檢查
          b-overlay(:show="loading").card(v-if="checkPoint === e")
            b-row
              b-col
                LineChart(:chart-data="dayChartData" :options="dayChartOptions")
            b-row
              b-col(cols)
                LineChart(:chart-data="hourChartData" :options="hourChartOptions")
    b-row(v-if="errorPoints && errorPoints.length === 0")
      b-col
        b-card.text-center 指定時間內無發生異常
    //- b-row(v-if="checkPoint")
      b-col.mt-2
        b-overlay(:show="loading")
          b-card.card
            b-row
              b-col
                LineChart(:chart-data="dayChartData" :options="dayChartOptions")
            b-row
              b-col(cols)
                LineChart(:chart-data="hourChartData" :options="hourChartOptions")
</template>

<style lang="scss" scoped>
  .s-name {
    margin-top: 30px;
  }
  .spliter {
    padding-top: 20px;
  }
  .card {
    margin: 10px 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>

<script>

import {
  chartLines,
  convertErrorChartData,
  convertPowerAnalysisHourWeekChartData,
} from '../dataConvert'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      startDate: moment(new Date()).subtract(1, 'month').toISOString(),
      endDate: new Date(),
      loading: false,
      activeRegionIndex: 0,
      seletedGearID: 0,
      errorPoints: null,
      checkPoint: null,
      dayShift: 0,
      dayChartData: {},
      hourChartData: {},
      weekChartData: {},
      dayChartOptions: {
        maintainAspectRatio: false,
        legend: {
          position: 'right',
          align: 'end',
        },
        title: {
          display: true,
          text: '異常次數圖',
          fontSize: 16,
        },
        scales: {
          yAxes: chartLines.map(cl => ({
            // id: cl.yAxisID,
            display: false,
          })),
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'day'
            },
          }],
        },
      },
      hourChartOptions: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: '區間小時統計圖',
          fontSize: 16,
        },
        legend: {
          position: 'right',
          align: 'end',
        },
        scales: {
          yAxes: chartLines.map(cl => ({
            id: cl.yAxisID,
            display: false,
          })),
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'day'
            },
          }],
        },
      },
    }
  },
  computed: {
    ...mapState(['regions', 'status', 'config', 'gears']),
    regionOption () {
      return this.regions.map((r, index) => ({
        ...r,
        index,
      }))
    },
    gearsInRegion () {
      let region = this.regionOption[this.activeRegionIndex]
      if (!region) return []
      return region.gears
    }
  },
  methods: {
    human (ts) {
      return moment(ts).format('YYYY-MM-DD hh:mm:ss')
    },
    async search () {
      let findingId = parseInt(this.seletedGearID)
      const tarGear = this.gears.find(g => g.id === findingId)
      let errorPoints = await this.$axios.$get('errors/light-search', {
        params: {
          id: tarGear.id,
          start_at: new Date(this.startDate).getTime(),
          end_at:  new Date(this.endDate).getTime(),
        },
      })
      this.errorPoints = errorPoints
    },
    async startAnalysis (point, ds) {
      this.dayShift = this.dayShift + ds
      if (ds === 0) this.dayShift = 0
      this.checkPoint = point
      this.loading = true
      const tarGear = this.gears.find(g => g.id === this.seletedGearID)
      this.dayChartOptions.title.text = `${tarGear.name} 異常次數圖`

      let checkPointTime = moment(point.created_at).add('day', this.dayShift).toDate().getTime()
      let errorDatas = await this.$axios.$get('errors/point-data', {
        params: {
          id: tarGear.id,
          created_at: checkPointTime,
        },
      })

      console.log(errorDatas)

      this.loading = false
      this.dayChartData = convertErrorChartData(errorDatas)
      this.hourChartData = convertErrorChartData(errorDatas, true)
    },
  },
  mounted() {
    console.log(this.$route.hash)
    this.activeRegionIndex = this.$route.hash.substring(1, 2)
    this.seletedGearID = this.$route.hash.substring(3)
  }
}

</script>