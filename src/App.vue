<template>
  <div id="app">
    <PrismInput/>
  </div>
</template>

<script>
import PrismInput from './components/PrismInput.vue'

export default {
  name: 'App',
  components: {
    PrismInput
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
