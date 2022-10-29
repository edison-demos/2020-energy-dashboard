<template lang="pug">
  div
    b-table(striped hover :items="parse(regions)")
</template>

<script>

import { mapState } from 'vuex'

export default {
  // async asyncData({ $axios }) {
  //   const regions = await $axios.$get('region-gear')
  //   return { regions }
  // },
  computed: mapState(['regions']),
  methods: {
    parse (data) {
      return data.map(d => ({
        ...d,
        gears: d.gears.map(g => g.id).sort((g1, g2) => g1 - g2).join(', '),
      }))
    }
  }
}
</script>