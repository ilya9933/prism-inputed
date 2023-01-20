<template>
  <div class='tab' v-show='isActive'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Fiel'
    },
    id: [String, Number]
  },
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<style lang="css">

</style>