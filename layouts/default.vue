<template lang="pug">
  div
    .menu
      b-icon(icon="list" font-scale="2" aria-hidden="true" v-b-toggle.sidebar-variant)
    b-container
      b-sidebar(
        id="sidebar-variant"
        title=""
        bg-variant=""
        header-class="my-sidebar"
        body-class="my-sidebar"
        text-variant="light"
        shadow)
        .px-3.py-2
          b-row
            b-col.mt-d(cols=12)
              //- h4.mt-2.text-center.child
                nuxt-link(to="/") Energy Site
              .menu
                .child
                  nuxt-link(to="/overview") 區域概況
                .child.right(v-for="(m, index) in regions" :key="index")
                  nuxt-link(:to=" { path: '/region' ,hash: '' + index }") {{ m.name }}
                .child(v-if="dev")
                  nuxt-link(to="/error") 異常報告
                .child(v-if="dev")
                  .asNuxtLink 統計分析
                .child.right(v-if="dev")
                  nuxt-link(to="/analysis/day") 使用分析-日分析
                .child.right(v-if="dev")
                  nuxt-link(to="/analysis/hour") 使用分析-區間小時
                .child.right(v-if="dev")
                  nuxt-link(to="/analysis/week") 使用分析-周分析
                .child.right(v-if="dev")
                  nuxt-link(to="/power/day") 電力分析-日分析
                .child.right(v-if="dev")
                  nuxt-link(to="/power/hour") 電力分析-區間小時
                .child.right(v-if="dev")
                  nuxt-link(to="/power/week") 電力分析-周分析
                //- .child.right
                //-   nuxt-link(to="/analysis") 異常分析
                .child(v-if="dev")
                  .asNuxtLink 異常分析
                .child.right(v-if="dev")
                  nuxt-link(to="/lightAnalysis") 光源異常分析
                //- .child(v-if="dev")
                  nuxt-link(to="/export") 原始資料輸出
                //- .child.right
                  nuxt-link(to="/analysis") 驅動器異常分析
      Nuxt
      .footer

    b-modal(
      ref="modal"
      title="警告"
      hide-footer 
    )
      h4.d-block.text-center 原config id已被刪除，請重新選擇一個
      b-button.mt-3(variant="outline-danger" block @click="exitModal") Close
</template>

<style lang="scss">
  .menu {
    position: fixed;
    left: 24px;
    top: 20px;
  }
  .my-sidebar {
    background-color: rgba(55, 55, 55, 0.7)
  }
  .asNuxtLink {
    font-weight: 400;
    padding: 6px 10px;
  }
  .child {
    &.right {
      a {
        padding-left: 40px;
      }
    }
    a {
      display: flex;
      color: white;
      text-decoration: none;
      padding: 6px 10px;
    }
    a:hover {
      background-color: gray;
      color: white;
    }
    a.nuxt-link-exact-active {
      background-color: #4CAF50;
      color: white;
    }
  }
  .footer {
    height: 100px;
    line-height: 100px;
  }
</style>

<script>
import { mapState } from 'vuex'

export default {
  async mounted () {
    await this.$store.dispatch('fetchPrimary')
    this.$store.dispatch('fetchConfig')
    this.$store.dispatch('fetchRegions')
    this.$store.dispatch('fetchGears')
    this.$store.dispatch('fetchStatus')
    this.$store.dispatch('fetchHistoryHour')
    setInterval(() => {
      this.$store.dispatch('fetchStatus')
    }, 15 * 1000)
  },
  computed: {
    ...mapState(['regions', 'config']),
    isIndex () {
      return this.$route.name === 'index'
    },
    dev () {
      return true 
      // location.host.includes('127.0.0.1')
    }
  },
  watch: {
    config (newV) {
      if (!newV && !this.isIndex) {
        this.$refs['modal'].show()
      }
    },
  },
  data: () => ({
    menus: [
      "Config",
      "Server",
      // "Member",
      "Region",
      "Gear",
      // "Energy",
    ]
  }),
  methods: {
    exitModal () {
      this.$refs['modal'].hide()
      this.$router.replace({ path: '/' })
    }
  },
}
</script>

<style lang="css" scoped>
  .nav-item a {
      color: white;
  }
</style>