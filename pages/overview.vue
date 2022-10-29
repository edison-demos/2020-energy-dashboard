<template lang="pug">
  div
    b-row
      b-col
        h2.s-name {{ config ? config.name : 'Loading' }}
        b-img(src="../assets/icon-title.png" style="width: 100px")
    .content-out
      .content-in
        b-row
          b-col
            h3 全區域
        b-row.o-row
          b-col(cols=3)
            div 場域交流資訊:
            ul
              li 損耗
              li.green 輸出功率
          b-col(cols=2)
            PieChart(:chart-data="acChartDs" :options="chartOptions")
            div.pie-v {{ (ACData.pout / ACData.pin * 100 ).toFixed(0) }}%
          b-col(cols offset=1)
            .info AC 輸入裝置 (共{{ ACData.count }}顆裝置)
            .info 輸入電壓: {{ ACData.vin }} V
            .info 輸入電壓頻率: {{ ACData.vf }} Hz
            .info(v-on:dblclick="showPF = !showPF") 功率因素 {{ ACData.pf }}
            .info.hidden(v-if="showPF") {{ factors }}
            .info 輸入功率: {{ ACData.pin }} W
            .info 負載功率: {{ ACData.pout }} W
        b-row.o-row
          b-col(cols=3)
            div 場域直流資訊:
            ul
              li 損耗
              li.green 輸出功率
          b-col(cols=2)
            PieChart(:chart-data="dcChartDs" :options="chartOptions")
            div.pie-v {{ (DCData.pout / DCData.pin * 100 ).toFixed(0) }}%
          b-col(cols offset="1")
            .info DC 輸入裝置 (共 {{ DCData.count }} 顆裝置)
            .info 輸入電壓: {{ DCData.vin }} V
            .info 輸入功率: {{ DCData.pin }} W
            .info 負載功率: {{ DCData.pout }} W
        b-row.o-row
          b-col(cols=3)
            div 區域當前狀態:
          b-col
            b-row
              b-col.area(cols="3" v-if="r.id" v-for="r in regions" :key="r.id")
                .area-name {{ r.name }}
                b-icon(icon="brightness-high" v-if="isStatusOn(r)")
                  span   ({{ parseEachRegionData(r).arc }} %)
                b-icon(v-else icon="circle-fill")
                NuxtLink(to="/error")
                b-icon(v-if="parseEachRegionData(r).error" icon="exclamation-triangle" )
        b-row.o-row
          b-col(cols=3)
            div 區域單日使用率:
            ul
              li.orange 燈具使用次數
              li.green 燈具時間使用率
              li.blue 燈具使用功耗率
          b-col
            b-row
              b-col.area(cols=4 v-if="r.id" v-for="r in regions" :key="r.id")
                .area-name {{ r.name }}
                ProgressBar(variant="warning" max="10" :value="parseEachRegionData(r).startCount < 10 ? parseEachRegionData(r).startCount : 10")
                ProgressBar(variant="success" max="100" :value="parseEachRegionData(r).onTimeRate")
                ProgressBar(variant="primary" max="100" :value="parseEachRegionData(r).energyUsageRate")
                ul
                  li.orange {{ parseEachRegionData(r).startCount }} 次
                  li.green {{ parseEachRegionData(r).onTimeRate }} %
                  li.blue {{ parseEachRegionData(r).energyUsageRate }} %
        b-row.o-row
          b-col(cols=3)
            div 區域輸入電壓:
          b-col
            b-row
              b-col.area(cols=4 v-if="r.id" v-for="r in regions" :key="r.id")
                .area-name {{ r.name }}
                .vol(v-if="parseEachRegionData(r).isDC") 直流電壓: {{ parseEachRegionData(r).vdc }} V
                .vol(v-else) 交流電壓: {{ parseEachRegionData(r).vac }} V
        b-row.o-row
          b-col(cols=3)
            div 區域使用功率:
            ul
              li.orange 輸入功率
              li.green 負載功率
          b-col
            b-row
              b-col.area(cols=4 v-if="r.id" v-for="r in regions" :key="r.id")
                .area-name {{ r.name }}
                ProgressBar(variant="warning" :max="parseEachRegionData(r).maxPin" :value="parseEachRegionData(r).pin")
                ProgressBar(variant="success" :max="parseEachRegionData(r).maxPout" :value="parseEachRegionData(r).pout")
                ul
                  li.orange {{ parseEachRegionData(r).pin }} w
                  li.green {{ parseEachRegionData(r).pout }} w
</template>

<style lang="scss" scoped>
  .b-icon {
    margin-left: 7px;
  }
  .s-name {
    margin-top: 30px;
    text-decoration: underline;
    display: inline;
  }
  .content-out {
    .content-in {
      padding: 30px;
      background-color: rgb(230, 230, 230);
      border-radius: 10px;
    }
  }
  ul {
    list-style: none; /* Remove default bullets */
    padding-left: 17px;
    li::before {
      content: "\2022"; 
      font-weight: bold;
      display: inline-block;
      width: 12px;
      margin-left: -1em;
      transform: scale(1.3);
      color: slategray;
    }
    li.red::before {
      color: red; /* Change the color */
    }
    li.blue::before {
      color: blue; /* Change the color */
    }
    li.orange::before {
      color: orange; /* Change the color */
    }
    li.green::before {
      color: green; /* Change the color */
    }
  }
  .o-row {
    padding-top: 23px;
  }
  .info {
    line-height: 30px;
  }

  .area {
    margin-top: 10px;
  }

  .pie-v {
    position: absolute;
    top: 40%;
    left: 42%;
  }

</style>

<script>

import { mapState } from 'vuex'
import arcTable from '../arc'

export default {
  head () {
    return {
      meta: [{
        name: 'viwport',
        content: "width=device-width, initial-scale=1, shrink-to-fit=no",
      }]
    }
  },
  computed: {
    ...mapState(['regions', 'status', 'config']),
    fullRegion () {
      return this.regions[0]
    },
    factors () {
      return this.fullRegion.gears.map(g => this.status[g.id] && this.status[g.id].control_gear_power_factor)
    },
    ACData () {
      let inputVoltage = 0
      let inputFreq = 0
      let inputPF = 0
      let inputPower = 0
      let outputPower = 0

      let counter = 0
      let counterV_F = 0
      let counterPF = 0
      if (!this.fullRegion) return {}
      for (let { id } of this.fullRegion.gears) {
        const status = this.status[id]
        if (!status || status.isDC) continue
        counter++
        if (status.control_gear_voltage < 1000) {
          inputVoltage += status.control_gear_voltage
          inputFreq += status.control_gear_voltage_frequence
          counterV_F++
        }
        if (status.control_gear_power_factor > 0) {
          inputPF += status.control_gear_power_factor
          counterPF++
        }
        inputPower += status.active_power
        outputPower += status.loadside_power
      }
      return {
        count: counter,
        vin: counterV_F ? (inputVoltage / counterV_F).toFixed(1) : '---',
        vf: counterV_F ? (inputFreq) / counterV_F.toFixed(1) : '---',
        pf: inputPF / counterPF,
        pin: inputPower.toFixed(1),
        pout: outputPower.toFixed(1),
      }
    },
    DCData () {
      let inputVoltage = 0
      let inputPower = 0
      let outputPower = 0

      let counter = 0

      if (!this.fullRegion) return {}
      for (let { id } of this.fullRegion.gears) {
        const status = this.status[id]
        if (!status || !status.isDC) continue
        counter++
        inputVoltage += status.control_gear_voltage
        inputPower += status.active_power
        outputPower += status.loadside_power
      }
      return {
        count: counter,
        vin: (inputVoltage / counter).toFixed(1),
        pin: inputPower.toFixed(1),
        pout: outputPower.toFixed(1),
      }
    },
    acChartDs () {
      return {
        datasets: [
          {
            backgroundColor: ["green", "slategray"],
            data: [this.ACData.pout, (this.ACData.pin - this.ACData.pout).toFixed(1)]
          }
        ],
        labels: [
          '損耗',
          '輸出功率',
        ]
      }
    },
    dcChartDs () {
      return {
        datasets: [
          {
            backgroundColor: ["green", "slategray"],
            data: [this.DCData.pout, (this.DCData.pin - this.DCData.pout).toFixed(1)]
          }
        ],
        labels: [
          '損耗',
          '輸出功率',
        ]
      }
    },
  },
  methods: {
    isStatusOn ({ gears = [] }) {
      for (let { id } of gears) {
        if (!this.status[id]) continue
        let arc = this.status[id].device_arc
        if (arc === 0) continue
        return true
      }
      return false
    },

    parseEachRegionData ({ gears }) {
      let vac = 0
      let vdc = 0
      let pin = 0
      let pout = 0
      let maxStartCount = 0
      let onTimeRate = 0
      let avgEnergyRate = 0
      let counter = 0
      let arc = 0
      let maxPout = 0
      let maxPin = 0

      let powerRatio = 0
      let powerRatioValidCounter = 0

      let energyUsageRate = 0
      let hasError = false

      for (let { id, power_out, power_in } of gears) {
        const dayMaxPowerUsage = power_out * 24
        let status = this.status[id]
        if (!this.status[id]) continue
        if (maxStartCount < status.startCount) {
          maxStartCount = status.startCount
        }
        if (status.isDC) {
          vdc += status.control_gear_voltage
        } else {
          vac += status.control_gear_voltage
        }

        if (status.powerRatio > 0) {
          powerRatio += status.powerRatio
          powerRatioValidCounter ++
        }

        if (status.device_status !== 0) {
          hasError = true
        }

        maxPin += power_in
        maxPout += power_out
        pin += status.active_power
        pout += status.loadside_power
        onTimeRate += status.onTimeRate
        arc += arcTable[status.device_arc]
        energyUsageRate += status.energyUsage / dayMaxPowerUsage
        counter++
      }
      return {
        isDC: vdc > vac,
        vac: counter == 0 ? '---' : (vac / counter).toFixed(1),
        vdc: counter == 0 ? '---' : (vdc / counter).toFixed(1),
        pin: counter == 0 ? '---' : (pin / counter).toFixed(1),
        pout: counter == 0 ? '---' : (pout / counter).toFixed(1),
        arc: counter == 0 ? '---' : (arc / counter).toFixed(0),
        startCount: maxStartCount,
        onTimeRate: onTimeRate === 0 ? '---' : (onTimeRate / counter * 100).toFixed(1),
        energyUsageRate: counter === 0 ? 0 : (100 * energyUsageRate / counter).toFixed(1),
        powerRate: powerRatio === 0 ? '---' : (100 * powerRatio / powerRatioValidCounter).toFixed(1), // here WIP
        maxPin,
        maxPout,
        error: hasError,
      }
    },

  },

  data () {
    return {
      showPF: false,
      loading: true,
      chartTitle: "耗能報告",
      chartOptions: {
        hoverBorderWidth: 20,
        legend: {
          display: false
        },
      }
    }
  },
}

</script>