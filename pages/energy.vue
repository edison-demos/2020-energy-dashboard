<template>
  <div >
    <b-table striped hover :items="energys"></b-table>
  </div>
</template>

<script>

export default {
  async asyncData({ $axios }) {
    const energys = await $axios.$get('energy')
    return { energys }
  }
}
</script>