<template lang="pug">
  b-progress.m-bar(:value="value" :max="max")
    b-progress-bar.m-bar-value(:variant="variant" :value="p1v")
    b-progress-bar.m-bar-value(:variant="variant" :value="p2v")
    b-progress-bar.m-bar-value(:variant="variant" :value="p3v")
</template>

<style lang="scss" scoped>
  .m-bar {
    border-radius: 0px;
    .m-bar-value {
      border-right: solid 1px;
    }
  }
</style>

<script>

export default {
  props: ['max', 'value', 'variant'],
  computed: {
    p1v () {
      if (this.value === '---') return 0
      return Number(this.value) < this.max / 3 ? this.value : this.max / 3
    }, 
    p2v () {
      if (this.value === '---') return 0
      return Number(this.value) < this.max * 0.66 ? this.value - this.max / 3 : this.max / 3
    },
    p3v () {
      if (this.value === '---') return 0
      return Number(this.value) - 2 * this.max / 3
    },
  },
}
</script>