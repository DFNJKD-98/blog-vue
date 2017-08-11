<template>
  <div id="app">
    <div id="header">

      <el-row :gutter="10">
        <el-col :push="2" :xs="20" :sm="20" :md="20" :lg="20">
          <el-menu :default-active="indexActive" class="el-menu-demo" mode="horizontal" :router=true :xs="20" :sm="20" :md="20" :lg="20">
            <el-menu-item index="/"><i class="el-icon-menu"></i>Index</el-menu-item>
            <el-menu-item index="/shuoshuo">Shuoshuo</el-menu-item>
            <el-menu-item index="/blog">Blog</el-menu-item>
            <el-menu-item index="/Hello">Hello</el-menu-item>
            <el-menu-item index="/projects">Projects</el-menu-item>
            <el-menu-item index="/login"><el-button type="success">Login</el-button></el-menu-item>
          </el-menu>
        </el-col>
        <!--<el-col :push="2" :xs="22" :sm="22" :md="6" :lg="4">-->

        <!--</el-col>-->
      </el-row>
    </div>
    <br>

    <el-row>
      <el-col :push="2" :sm="20" :md="20" :lg="20">
        <el-row :gutter="10">
          <el-col :sm="24" :md="10" :lg="6">
            <Conclusion></Conclusion>
          </el-col>
          <el-col :sm="24" :md="14" :lg="18">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  import Conclusion from './components/Conclusion'

export default {
  name: 'app',
  components: {
    Conclusion
  },
  data () {
    return {
      indexActive: '/'
    }
  }
}
</script>

<style>
  .el-menu-item {
    height: 36px;
    line-height:36px;
  }
  #app {font-family: "PingFangSC-Light", "Helvetica Neue", Helvetica, "Microsoft YaHei", "微软雅黑", Arial, SimHei, serif;}
</style>
