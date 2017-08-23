<template>
  <el-row :gutter="10">
    <el-col :sm="24" :md="7" :lg="6">
      <Conclusion :filter="yearFilter" @todayWeather="todayWeather" defaultFilter="all" :summary="summary" :errorText="summaryError"></Conclusion>
    </el-col>
    <el-col :sm="24" :md="17" :lg="18" style="border-left: 1px solid #999; padding-bottom: 20px;">
      <InputFrame v-show="isLogin"></InputFrame>
      <hr v-show="isLogin">
      <p v-show="shuoshuoError">{{shuoshuoError}}</p>
      <div v-show="!shuoshuoError">
        <ListItem :needReload="needReload" :key="item.date" v-for="item in shuoshuoList" :isLogin="isLogin" :item="item"></ListItem>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import InputFrame from './shuoshuoChild/Inputer'
  import Conclusion from './Conclusion'
  import ListItem from './shuoshuoChild/ListItem'
  import bus from './common/EventBus'
  // todo 改成vuex吧，因为还要提交之后刷新说说页面也要跨组件通讯

  export default {
    name: 'Shuoshuo',
    props: {
      isLogin: {
        type: Boolean,
        required: true,
        default: false
      },
      needReload: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    components: {
      Conclusion,
      InputFrame,
      ListItem
    },
    data () {
      return {
        summary: {},
        shuoshuoList: [],
        timeMark: 0,
        loadMoreLimit: 10,
        filter: 'all',
        summaryError: '',
        shuoshuoError: ''
      }
    },
    methods: {
      yearFilter (year) {
        this.getShuoshuo(year)
      },
      todayWeather (data) {
        console.log(data)
      },
      getShuoshuo (filter = 'all', limit = 20, timeMark = 0) {
        axios.get('/getShuoshuoList', {params: {limit, filter, timeMark}})
          .then(res => this.shuoshuoList = res.data)
          .catch(e => this.shuoshuoError = `[ ${e.statusCode} ] - ${e.statusText}`)
      }
    },
    mounted () {
      let self = this
      this.getShuoshuo()
      axios.get('/getSummary')
        .then(d => this.summary = d.data[0].summary)
        .catch(e => this.summaryError = `[ ${e.statusCode} ] - ${e.statusText}`)
      bus.$on('reloadShuoshuo', function() {
        self.getShuoshuo()
      })
    },
    watch: {
      needReload () {
        this.getShuoshuo()
      }
    }
  }
</script>
<style>
  .el-card__body {
    padding: 0;
  }
</style>
