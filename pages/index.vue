<template lang="pug">
  .wrap
    b-row.login(align-h="center")
      b-col.wellcome.text-center(cols=12 align-self="center")
        h1 Energy Management System
      b-col.choose(cols=12 align-self="center")
        b-row(v-for="(c, key) in configs" :key="key" align-h="center")
          b-col(cols md=4 lg=4 sm=12 align-self="center")
            .option.text-center
              b-button(@click="selectConfig(c.id)" variant="primary") {{ c.name }}
</template>

<style lang="scss" scoped>
  .wrap {
    height: 100vh;
    width: 100%;
    background-image: url('../assets/bg.jpg');
    @media only screen and (min-width: 1365px) {
      // only when screen is greater than pic size that I need to scale the bg-image
      background-size: 100%;
    }
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
      width: 100%;
      display: flex;
    }
  }

  .wellcome {
    // position: fixed;
    color: white;
    width: 100%;
    top: 60%;
  }
  .choose {
    background-color: rgba(228, 228, 228, 0.18);
    // position: fixed;
    width: 100%;
    bottom: 20%;
    .option {
      margin: 20px;
    }
  }
</style>

<script>

export default {
  layout: 'login',
  methods: {
    async selectConfig (configID) {
      this.$router.replace({
        path: 'overview',
        force: true,
      })
      // await this.$axios.post('primary', { id: configID })
      setTimeout(vm => location.reload(), 500)
    }
  },
  async asyncData ({ $axios }) {
    // let configs = await $axios.$get('config')
    let configs = [{"id":32,"name":"Test Profile 1(please click me)","no":12}]
    // configs = [...Array(10)].map(c => configs[0])
    return {
      configs,
    }
  },
}

</script>