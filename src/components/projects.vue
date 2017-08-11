<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>这里放一些自己写的项目，用card展示</h2>
    <ul>
      <li>PyQt5翻译</li>
      <li>Chrome Shanbay 插件</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Projects',
    data () {
      return {
        msg: 'This is Projects'
      }
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
