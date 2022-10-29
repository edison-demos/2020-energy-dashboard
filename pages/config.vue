<template>
  <div >
    <b-table striped hover :items="configs"></b-table>
    <!-- <div v-for="c of configs" :key="c.id">
      <p v-for="(v, k) in c" :key="k"> {{ k }} : {{ v }}</p>
    </div> -->
  </div>
</template>

<script>

export default {
  async asyncData({ $axios }) {
    const configs = await $axios.$get('config')
    return { configs }
  }
}
</script>