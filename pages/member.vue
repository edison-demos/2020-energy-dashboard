<template>
  <div >
    <b-table striped hover :items="members"></b-table>
  </div>
</template>

<script>

export default {
  async asyncData({ $axios }) {
    const members = await $axios.$get('member')
    return { members }
  }
}
</script>