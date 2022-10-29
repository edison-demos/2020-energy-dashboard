<template lang="pug">
  .mt-2
    b-row
      b-col
        h2.s-name.text-center 電力分析 -{{ title }}統計分析
    b-row.mt-3( align-v="end")
      b-col
        label(for="start-datepicker") Start date
        b-form-datepicker#start-datepicker.md-2(v-model="startDate")
      b-col
        label(for="end-datepicker") End date
        b-form-datepicker#end-datepicker.md-2(v-model="endDate")
      b-col(cols=1)
        b-button(@click="startAnalysis" variant="outline-primary") 統計
    b-row.mt-3
      b-col
        b-form-select(v-model="activeIndex"
            text-field="name"
            value-field="index"
            :options="regionsAsOption"
            @change="changeRegion")
          //- b-button(variant="outline-primary" v-for="region, index in regions"
          //-   :pressed="activeIndex == index" 
          //-   :key="index" @click="changeRegion(index)" :disabled="lockRegionButton") {{ region.name }}
    b-row(v-if="!lockRegionButton")
      b-col.mt-2
        b-overlay(:show="loading")
          b-card.card
            b-row(align-h="end")
              b-dropdown(text="顯示項目" variant="warning" class="m-2")
                b-dropdown-form
                .m-dropdown
                    div(v-for="(cl, index) in powerOptions" :key="index")
                      b-form-checkbox(v-model="cl.checked") {{ cl.name }}
            b-row
              b-col
                NuxtChild(:analysis-data="analysisData" :region="regions[activeIndex]" :disables="disables")
    b-row.legend(v-if="!lockRegionButton")
      b-col(cols=2 v-for="(cl, index) in powerOptions" :key="index" v-if="!disables.includes(index)")
        .colorRec(:style="{ 'background-color' : colors[index] }")
        .text-center {{ cl.name }}
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
  .colorRec {
    margin-top: 15px;
    height: 26px;
    width: 100%;
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
</style>

<script>

const OPTION_DISABLE = 255

import {
  chartLines,
  convertAnalysisDayChartData,
  convertAnalysisHourChartData,
  powerOptions,
  colors,
} from '../dataConvert'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      startDate: moment(new Date()).subtract(1, 'month').toISOString(),
      powerOptions: powerOptions.map(text => ({
        name: text,
        checked: true,
      })),
      colors,
      endDate: new Date(),
      loading: false,
      activeIndex: 0,
      analysisData: {},
      dayChartData: {},
      hourChartData: {},
      weekChartData: {},
    }
  },
  computed: {
    ...mapState(['regions', 'status', 'config']),
    lockRegionButton () {
      return !Object.keys(this.analysisData).length 
    },
    regionsAsOption () {
      return this.regions.map((r, index) => ({
        ...r,
        index,
      }))
    },
    disables () {
      return this.powerOptions.map((o, index) => o.checked ? OPTION_DISABLE : index).filter(v => v < OPTION_DISABLE)
    },
    title () {
      if (/day/.test(this.$route.path)) {
        return '日'
      }
      if (/hour/.test(this.$route.path)) {
        return '區間小時'
      }
      return '周'
    }
  },
  methods: {
    async startAnalysis () {
      this.loading = true
      const configs = await this.$axios.$get('config')
      for (let { id } of configs)
      if (configs.length === 0) return
  
      const config_id = configs[0].id

      let startQueryDate = moment(new Date(this.startDate)).subtract(1, 'day').valueOf()
      this.analysisData = await this.$axios.$get('analysis', {
        params: {
          config_id,
          start_at: startQueryDate,
          end_at:  new Date(this.endDate).getTime(),
        },
      })
      this.loading = false
      this.changeRegion()
    },
    changeRegion () {
      let region_index = this.activeIndex
    },
  },
  mounted() {
    this.startAnalysis()
  }
}

</script>