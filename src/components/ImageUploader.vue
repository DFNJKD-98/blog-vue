<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'ImageUploader',
    data () {
      return {
        msg: 'This is context of Image Uploader'
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
