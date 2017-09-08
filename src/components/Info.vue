<template>
  <el-card :body-style="{ padding: '15px 0 0 0', 'text-align': 'center' }">
    <img src="../assets/header.png">
    <div style="padding: 14px;">
      <p style="margin: 0;">Maicss</p>
      <div>
        <el-tag type="gray"><a href="https://github.com/maicss">Github</a></el-tag>
        <el-tag type="gray"><a href="mailto:maicss@foxmail.com?subject:From Blog Site">Email</a></el-tag>
      </div>
    </div>

  </el-card>
</template>

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
  img{
    max-width: 200px;
    vertical-align: top;
    border: none;
    border-radius: 4px;
  }
</style>
