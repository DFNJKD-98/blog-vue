<template>

  <div>
    <h2>Summary</h2>
    <div v-show="errorText">{{errorText}}</div>
    <el-menu v-show="!errorText" :default-active=defaultFilter class="el-menu-vertical-demo">
      <el-menu-item :key="item.year" :index="item.year" v-for="item in summaryData" @click="filter(item.year)">
        {{item.year}} <el-tag typeof="primary">{{item.count}}</el-tag>
      </el-menu-item>
    </el-menu>
  </div>


</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Conclusion',
    props: {
      defaultFilter: {
        type: String,
        require: true
      },
      filter: {
        type: Function,
        require: true,
      },
      summary: {
        type: Object,
        require: true,
      },
      errorText: String
    },
    computed: {
      summaryData: function () {
        return Object.keys(this.summary).sort().reverse().map(k => ({
          year: k,
          count: this.summary[k]
        }))
      }
    }
  }
</script>
<style scoped>
  h2 {
    text-align: center;
    border-bottom: 1px solid #999;
    margin: 0;
    padding: 20px 0;
  }
  div {
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
