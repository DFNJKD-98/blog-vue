<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Blog',
    data () {
      return {
        msg: 'This is Blog'
      }
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
