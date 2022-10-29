<template>
  <div >
    <b-table striped hover :items="servers"></b-table>
  </div>
</template>

<script>

export default {
  async asyncData({ $axios }) {
    const servers = await $axios.$get('server')
    return { servers }
  }
}
</script>