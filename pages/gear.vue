<template>
  <div >
    <b-table striped hover :items="gears"></b-table>
  </div>
</template>

<script>

export default {
  async asyncData({ $axios }) {
    const gears = await $axios.$get('gear')
    return { gears }
  }
}
</script>