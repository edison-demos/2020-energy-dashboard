export const state = () => ({
  config_id: 0,
  regions: [],
  gears: [],
  status: {},
  config: {},
  historyHour: {},
})

export const mutations = {
  setPrimary (state, id) {
    state.config_id = id
  },

  setRegions (state, regions) {
    state.regions.length = 0
    state.regions.push({
      id: 0,
      name: "全區域",
      gears: [],
    })
    let fullRegion = state.regions[0]
    for (let r of regions) {
      state.regions.push(r)
      let { gears } = r
      // here merge all gears in full-region
      for (let rg of r.gears) {
        if (fullRegion.gears.find(fg => fg.id === rg.id)) continue
        fullRegion.gears.push(rg)
      }
    }
  },

  setGears (state, gears) {
    state.gears.length = 0
    for (let g of gears) {
      state.gears.push(g)
    }
  },

  setStatus (state, status) {
    state.status = status
  },

  setConfig (state, config) {
    state.config = config
  },

  setHistoryHour (state, his) {
    state.historyHour = his
  },
}

export const actions = {
  async fetchPrimary ({ commit, state }) {
    // const { data: { id } } = await this.$axios.get('primary', {})
    let id  = 15
    commit('setPrimary', id)
  },

  async fetchConfig ({ commit, state }) {
    // const { data: [config] } = await this.$axios.get('config', { params : {
    //   id: state.config_id,
    // }})
    let config = [{"id":32,"name":"Test Profile 1","no":12}]
    commit('setConfig', config)
  },

  async fetchRegions ({ commit, state }) {
    // const { data: regions } = await this.$axios.get('region-gear', { params : {
      // config_id: state.config_id,
    // }})
    let regions = [{"id":175,"sequence":0,"name":"走廊","type":"Region","configId":32},{"id":176,"sequence":1,"name":"會議室間接燈","type":"Region","configId":32},{"id":177,"sequence":2,"name":"會議室窗邊嵌燈","type":"Region","configId":32},{"id":178,"sequence":3,"name":"會議室左嵌燈","type":"Region","configId":32},{"id":179,"sequence":4,"name":"會議室右嵌燈","type":"Region","configId":32},{"id":180,"sequence":5,"name":"會議室","type":"Region","configId":32}]
    regions = regions.map(ori => ({ ...ori, gears: [] }))
    commit('setRegions', regions)
  },

  async fetchGears ({ commit, state }) {
    // const { data: servers } = await this.$axios.get('server', { params: {
    //   config_id: state.config_id,
    // }})
    const servers = [{"id":96765952905474,"sequence":0,"instance":"MeetingRoom","host":"AG3AV201DF3412085","configId":32}]
    const gearsJSON = [{"id":1362,"sequence":16,"name":"左嵌燈3","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":12,"display_name":"左嵌燈3","serverId":96765952905474},{"id":1363,"sequence":17,"name":"左嵌燈4","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":4,"display_name":"左嵌燈4","serverId":96765952905474},{"id":1364,"sequence":18,"name":"左嵌燈5","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":6,"display_name":"左嵌燈5","serverId":96765952905474},{"id":1365,"sequence":19,"name":"左嵌燈6","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":26,"display_name":"左嵌燈6","serverId":96765952905474},{"id":1319,"sequence":0,"name":"單色招牌燈","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":16,"display_name":"單色招牌燈","serverId":96765952905474},{"id":1320,"sequence":1,"name":"彩色招牌燈","artilect_type":"8","dali_type":"","type_model":"","channel_id":3,"unit_id":0,"display_name":"彩色招牌燈","serverId":96765952905474},{"id":1321,"sequence":2,"name":"走廊間接燈","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":20,"display_name":"走廊間接燈","serverId":96765952905474},{"id":1322,"sequence":3,"name":"走廊左聚光燈","artilect_type":"254","dali_type":"","type_model":"","channel_id":3,"unit_id":15,"display_name":"走廊左聚光燈","serverId":96765952905474},{"id":1323,"sequence":4,"name":"走廊右聚光燈","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":23,"display_name":"走廊右聚光燈","serverId":96765952905474},{"id":1324,"sequence":5,"name":"走廊左嵌燈","artilect_type":"52","dali_type":"","type_model":"","channel_id":3,"unit_id":24,"display_name":"走廊左嵌燈","serverId":96765952905474},{"id":1325,"sequence":6,"name":"走廊右嵌燈","artilect_type":"52","dali_type":"","type_model":"","channel_id":3,"unit_id":27,"display_name":"走廊右嵌燈","serverId":96765952905474},{"id":1326,"sequence":0,"name":"間接燈1","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":17,"display_name":"間接燈1","serverId":96765952905474},{"id":1327,"sequence":1,"name":"間接燈2","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":3,"display_name":"間接燈2","serverId":96765952905474},{"id":1328,"sequence":2,"name":"間接燈3","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":11,"display_name":"間接燈3","serverId":96765952905474},{"id":1329,"sequence":3,"name":"間接燈4","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":10,"display_name":"間接燈4","serverId":96765952905474},{"id":1330,"sequence":4,"name":"間接燈5","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":22,"display_name":"間接燈5","serverId":96765952905474},{"id":1331,"sequence":5,"name":"間接燈6","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":25,"display_name":"間接燈6","serverId":96765952905474},{"id":1332,"sequence":0,"name":"窗邊嵌燈1","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":18,"display_name":"窗邊嵌燈1","serverId":96765952905474},{"id":1333,"sequence":1,"name":"窗邊嵌燈2","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":19,"display_name":"窗邊嵌燈2","serverId":96765952905474},{"id":1334,"sequence":2,"name":"窗邊嵌燈3","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":9,"display_name":"窗邊嵌燈3","serverId":96765952905474},{"id":1335,"sequence":3,"name":"窗邊嵌燈4","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":2,"display_name":"窗邊嵌燈4","serverId":96765952905474},{"id":1336,"sequence":0,"name":"左嵌燈1","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":14,"display_name":"左嵌燈1","serverId":96765952905474},{"id":1337,"sequence":1,"name":"左嵌燈2","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":5,"display_name":"左嵌燈2","serverId":96765952905474},{"id":1338,"sequence":2,"name":"左嵌燈3","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":12,"display_name":"左嵌燈3","serverId":96765952905474},{"id":1339,"sequence":3,"name":"左嵌燈4","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":4,"display_name":"左嵌燈4","serverId":96765952905474},{"id":1340,"sequence":4,"name":"左嵌燈5","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":6,"display_name":"左嵌燈5","serverId":96765952905474},{"id":1341,"sequence":5,"name":"左嵌燈6","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":26,"display_name":"左嵌燈6","serverId":96765952905474},{"id":1342,"sequence":0,"name":"右嵌燈2","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":8,"display_name":"右嵌燈2","serverId":96765952905474},{"id":1343,"sequence":1,"name":"右嵌燈3","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":1,"display_name":"右嵌燈3","serverId":96765952905474},{"id":1344,"sequence":2,"name":"右嵌燈4","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":21,"display_name":"右嵌燈4","serverId":96765952905474},{"id":1345,"sequence":3,"name":"右嵌燈5","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":13,"display_name":"右嵌燈5","serverId":96765952905474},{"id":1346,"sequence":0,"name":"右嵌燈2","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":8,"display_name":"右嵌燈2","serverId":96765952905474},{"id":1347,"sequence":1,"name":"右嵌燈3","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":1,"display_name":"右嵌燈3","serverId":96765952905474},{"id":1348,"sequence":2,"name":"右嵌燈4","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":21,"display_name":"右嵌燈4","serverId":96765952905474},{"id":1349,"sequence":3,"name":"右嵌燈5","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":13,"display_name":"右嵌燈5","serverId":96765952905474},{"id":1350,"sequence":4,"name":"窗邊嵌燈1","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":18,"display_name":"窗邊嵌燈1","serverId":96765952905474},{"id":1351,"sequence":5,"name":"窗邊嵌燈2","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":19,"display_name":"窗邊嵌燈2","serverId":96765952905474},{"id":1352,"sequence":6,"name":"窗邊嵌燈3","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":9,"display_name":"窗邊嵌燈3","serverId":96765952905474},{"id":1353,"sequence":7,"name":"窗邊嵌燈4","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":2,"display_name":"窗邊嵌燈4","serverId":96765952905474},{"id":1354,"sequence":8,"name":"間接燈1","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":17,"display_name":"間接燈1","serverId":96765952905474},{"id":1355,"sequence":9,"name":"間接燈2","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":3,"display_name":"間接燈2","serverId":96765952905474},{"id":1356,"sequence":10,"name":"間接燈3","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":11,"display_name":"間接燈3","serverId":96765952905474},{"id":1357,"sequence":11,"name":"間接燈4","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":10,"display_name":"間接燈4","serverId":96765952905474},{"id":1358,"sequence":12,"name":"間接燈5","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":22,"display_name":"間接燈5","serverId":96765952905474},{"id":1359,"sequence":13,"name":"間接燈6","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":25,"display_name":"間接燈6","serverId":96765952905474},{"id":1360,"sequence":14,"name":"左嵌燈1","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":14,"display_name":"左嵌燈1","serverId":96765952905474},{"id":1361,"sequence":15,"name":"左嵌燈2","artilect_type":"6","dali_type":"","type_model":"","channel_id":3,"unit_id":5,"display_name":"左嵌燈2","serverId":96765952905474}]
    let returnGears = []
    for (let srv of servers) {
      // const { data: gears } = await this.$axios.get('gear', { params: {
      //   server_id: srv.id,
      // }})
      let gears = gearsJSON
      returnGears.push(...gears)
    }
    commit('setGears', returnGears)
  },

  async fetchStatus ({ commit, state }) {
    // const { data: status } = await this.$axios.get('region-status', { params : {
    //   config_id: state.config_id,
    // }})
    let status = {}
    commit('setStatus', status)
  },

  async fetchHistoryHour ({ commit, state }) {
    // const { data: status } = await this.$axios.get('history', { params : {
    //   config_id: state.config_id,
    //   step: 'hour',
    // }})
    let status = {}
    commit('setHistoryHour', status)
  },
}
