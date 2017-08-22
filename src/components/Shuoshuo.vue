<template>
    <el-row>
      <el-col :push="2" :sm="20" :md="20" :lg="20">
        <el-row :gutter="10">
          <el-col :sm="24" :md="7" :lg="6">
            <Conclusion :filter="yearFilter" defaultFilter="all" :summary="summary" :errorText="summaryError"></Conclusion>
          </el-col>
          <el-col :sm="24" :md="17" :lg="18" style="border-left: 1px solid #999; padding-bottom: 20px;">
            <InputFrame v-show="isLogin"></InputFrame>
            <hr v-show="isLogin">
            <div>
              <ListItem :needReload="needReload" :key="item.date" v-for="item in shuoshuoList" :isLogin="isLogin" :item="item"></ListItem>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
</template>

<script>
  import axios from 'axios'
  import InputFrame from './shuoshuoChild/Inputer'
  import Conclusion from './Conclusion'
  import ListItem from './shuoshuoChild/ListItem'

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
      getShuoshuo (filter='all', limit=20, timeMark=0) {
        axios.get('/getShuoshuoList', {params: {limit, filter, timeMark}})
          .then(res => this.shuoshuoList = res.data)
          .catch(e => this.shuoshuoError = `[ ${e.statusCode} ] - ${e.statusText}`)
      }
    },
    mounted () {
      this.getShuoshuo()
      axios.get('/getSummary')
        .then(d => this.summary = d.data[0].summary)
        .catch(e => this.summaryError = `[ ${e.statusCode} ] - ${e.statusText}`)
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
