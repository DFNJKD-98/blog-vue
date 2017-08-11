<template>

  <div>
    <h2>Summary</h2>
    <el-menu default-active="all" class="el-menu-vertical-demo">
      <el-menu-item :key="item.year" :index="item.year" v-for="item in summaryData">
        {{item.year}} <el-tag typeof="primary">{{item.count}}</el-tag>
      </el-menu-item>
    </el-menu>
  </div>


</template>

<script>
  export default {
    name: 'Conclusion',
    data () {
      return {
        summaryDataFromDb: [{'name': 'summary', 'summary': {'2017': 50, 'all': 153, '2016': 70, '2015': 33}}]
      }
    },
    computed: {
      summaryData: function () {
        return Object.keys(this.summaryDataFromDb[0].summary).sort().reverse().map(k => ({
          year: k,
          count: this.summaryDataFromDb[0].summary[k]
        }))
      }
    }
  }
</script>
<style scoped>
  h2 {
    text-align: center;
  }
  div {
    /*background-color: #75a89d;*/
    border: 1px solid rgba(58, 58, 58, 0.33);
    border-radius: 6px;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15)
  }
  .el-tag {
    position: absolute;
    right: 20px;
    top: 6px;
  }
  .el-menu {
    background-color: transparent;
  }
  .el-menu-item{
    position: relative;
    border-bottom: 1px solid #999;
    line-height:36px;
  }
  .el-menu-item:nth-last-of-type(1){
    border-bottom-color: transparent;
  }
  .is-active {
    color: #fff;
    background-color: #81ae9e;
  }
</style>
