<template lang="pug">
  b-row
    b-col
      h1 異常報告
      div
        b-table(striped hover :items="errorRows" :fields="tFields" @row-clicked="gotoAna")
        //- div(v-for="(r, rIndex) in regions" :key="r.id")
          b-card.my-card(v-if="rIndex > 0" v-for="(e, index) in errorParse(r)" :key="index")
            nuxt-link(:to=" { path: '/lightAnalysis' ,hash: '' + rIndex + ',' + e.gid }")
              | [{{ r.name }} > {{ e.name }}] 異常原因: {{ e.message }}
        
          //- .debug(v-for="g in r.gears" :key="g.id")
            p(v-if="status[g.id]") gear {{ g.id }} status = {{ status[g.id].device_status }}
          div(v-if="errorParse(r).length === 0") 區域 {{ r.name }} 目前無任何異常
</template>

<style lang="scss" scoped>
  .my-card {
    margin: 10px 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>

<script>

import { mapState } from 'vuex'

export default {
  async mounted () {
    const { data } = await this.$axios.get('errors/light-max-2-month', { params : {
      id: 15,
    }})
    this.monthErrors = data
  },
  computed: {
    ...mapState(['regions', 'status', 'gears']),
    errorRows () {
      let eRows = this.regions.map((r,regionIndex) => {
        return this.errorParse(r, regionIndex)
      })
      return eRows.flat()
    },
  },
  data: () => ({
    monthErrors: [],
    tFields: [{
      key: 'region',
      label:'區域',
    }, {
      key: 'message',
      label: '即時狀態',
    }
    , {
      key: 'monthError',
      label: '過去60天異常',
    }],
  }),
  methods: {
    gotoAna (row) {
      console.log(row)
      this.$router.push({
        path: '/lightAnalysis',
        hash: `#${row.ridx},${row.gid}`,
      })
    },
    errorParse ({ name: rName ,gears }, regionIndex) {
      let errors = []
      for (let { id, display_name } of gears) {
        let status = this.status[id]
        if (!status) continue

        let monthE = this.monthErrors.find(me => me.gear_id === id)
        console.log(monthE, id)
        if (monthE) errors.push({
          name: display_name,
          gid: id,
          message: 'blaaa~',
        })

        for (let key of [
          'control_gear_under_voltage_count',
          'control_gear_over_voltage_count',
          'control_gear_output_power_limit_count',
          'control_gear_thermal_deration_count',
          'control_gear_thermal_shutdown_count',
          
          'light_source_open_count',
          'light_source_short_count',
          'light_source_thermal_deration_count',
          'light_source_thermal_shutdown_count',
        ]) {
          if (status[key] > 0) {
            errors.push({
              name: display_name,
              gid: id,
              message: `${key}: ${status[key]}`,
            })
          }
        }
        // if (status.light_source_open_count > 0) errors.push({
        //   name: display_name,
        //   gid: id,
        //   message: `source open: ${status.light_source_open_count}`,
        // })

        // if (status.light_source_short_count > 0) errors.push({
        //   name: display_name,
        //   gid: id,
        //   message: `source short: ${status.light_source_short_count}`,
        // })


        let err = this.status[id].device_status
        // this is for dev usage 
        // if (err === 4) errors.push({
        //   name: display_name,
        //   gid: id,
        //   message: '~~測試中~~',
        // })

        if (err % 2) errors.push({
          name: display_name,
          gid: id,
          message: '無法偵測',
        })
        err >>= 1
        if (err % 2) errors.push({
          name: display_name,
          gid: id,
          message: '燈炮錯誤',
        })
        err >>= 2
        if (err % 2) errors.push({
          name: display_name,
          gid: id,
          message: '輸出亮度錯誤',
        })
        err >>= 3
        if (err % 2) errors.push({
          name: display_name,
          gid: id,
          message: '未定址',
        })
        err >>= 1
        if (err % 2) errors.push({
          name: display_name,
          gid: id,
          message: '曾電力失效',
        })

      }
      
      errors.forEach(e => {
        e.ridx = regionIndex
        e.region = rName
        e.message = `${e.name} (${e.message})`
      })

      return errors
    },
  }
}
</script>