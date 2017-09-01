<template>

    <div id="wrapper">
      <h2>Summary</h2>

      <el-alert
        v-if="errorText"
        title="load summary failed."
        type="error"
        :closable="false"
        :description="errorText">
      </el-alert>
      <el-menu v-if="!errorText" :default-active=defaultFilter class="el-menu-vertical-demo" style="border: solid #999; border-width: 1px 0; margin-bottom: 20px;">
        <el-menu-item :key="item.year" :index="item.year" v-for="item in summaryData" @click="filter(item.year)">
          {{item.year}}
          <el-tag typeof="primary">{{item.count}}</el-tag>
        </el-menu-item>
      </el-menu>

      <Weather></Weather>
  </div>
</template>

<script>
  // todo 变成标签
  // todo year
  import axios from 'axios'
  import Weather from './Weather'

  export default {
    name: 'Conclusion',
    components: {
      Weather
    },
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
  }

  #wrapper {
    border: 1px solid rgba(58, 58, 58, 0.33);
    border-radius: 6px;
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15)
  }

  .el-tag {
    position: absolute;
    right: 20px;
    top: 6px;
  }

  .el-menu {
    background-color: transparent;
  }

  .el-menu-item {
    position: relative;
    border-bottom: 1px solid #999;
    line-height: 36px;
  }

  .el-menu-item:nth-last-of-type(1) {
    border-bottom-color: transparent;
  }

  .is-active {
    color: #fff;
    background-color: #81ae9e;
  }
</style>
