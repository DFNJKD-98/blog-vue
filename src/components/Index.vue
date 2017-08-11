<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        msg: 'This is context of index'
      }
    }
  }
</script>
<style scoped>
  div {
    background-color: #ffcba0;
  }
  h1, h2 {
    font-weight: normal;
  }
</style>
