<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <h2 style="line-height: 36px;">title</h2>
      <div class="meta">aa</div>
    </div>
    <div>
      details
    </div>
    <a href="/">继续阅读</a>
  </el-card>
</template>

<script>

</script>

<style scoped>
  .box-card {
    padding: 30px 0 30px 10px;
    border: none;
    border-radius: inherit;
    border-bottom: 1px solid #ccc;
  }
  h2 {
    margin: 0;
  }
  .header {
    position: relative;
  }

  .header .meta {
    position: absolute;
    top: 0;
    right: 0
  }
</style>
