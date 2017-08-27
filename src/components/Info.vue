<template>
  <el-card :body-style="{ padding: '0' }">
    <div id="headerImg" :height="headerHeight" :sm="24" :md="24" :lg="24"></div>
    <div style="padding: 14px; text-align: center">
      <p style="text-align: center;margin: 0;">Maicss</p>
      <div>
        <el-tag type="gray"><a href="https://github.com/maicss">Github</a></el-tag>
        <el-tag type="gray"><a href="mailto:maicss@foxmail.com?subject:From Blog Site">Email</a></el-tag>
      </div>
    </div>

  </el-card>
</template>

<script>
  export default {
    name: 'Info',
    data () {
      return {
        headerHeight: '0px'
      }
    },
    mounted: function () {
      const headerImg = document.querySelector('#headerImg')
      headerImg.style.height = getComputedStyle(headerImg).getPropertyValue('width')
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize () {
        const headerImg = document.querySelector('#headerImg')
        headerImg.style.height = getComputedStyle(headerImg).getPropertyValue('width')
      }
    },
  }
</script>

<style scoped>

  a {
    text-decoration: none;
    color: #000
  }

  a:visited {
    text-underline: none;
    text-decoration: none;
    color: #000;
  }

  #headerImg {
    background-image: url(../assets/header.png);
    background-size: cover;
  }
</style>
