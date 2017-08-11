<template>
  <div>
    <h1>{{msg}}</h1>
    <Weather></Weather>
  </div>
</template>

<script>
  import Weather from './Weather'
  export default {
    name: 'Shuoshuo',
    components: {
      Weather
    },
    data () {
      return {
        msg: 'This is Shuoshuo'
      }
    }
  }
</script>
<style scoped>
  div {
    border: 1px solid #999;
    border-radius: 4px;
  }
  h1, h2 {
    font-weight: normal;
  }
</style>
