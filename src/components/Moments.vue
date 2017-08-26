<template>
  <el-row :gutter="10">
    <el-col :sm="24" :md="7" :lg="6">
      <Conclusion :filter="yearFilter" @todayWeather="todayWeather" defaultFilter="all" :summary="summary" :errorText="summaryError"></Conclusion>
    </el-col>
    <el-col :sm="24" :md="17" :lg="18" style="border-left: 1px solid #999; padding-bottom: 20px;">
      <InputFrame v-show="isLogin"></InputFrame>
      <hr v-show="isLogin">
      <el-alert
        v-if="momentsError"
        title="load moments failed."
        type="error"
        :closable="false"
        :description="momentsError">
      </el-alert>
      <div v-if="!momentsError">
        <ListItem :needReload="needReload" :key="item.date" v-for="item in momentsList" :isLogin="isLogin" :item="item"></ListItem>
      </div>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :page-size="20"
          @current-change="loadMore"
          :total=summary.all>
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import InputFrame from './momentsChild/Inputer'
  import Conclusion from './Conclusion'
  import ListItem from './momentsChild/ListItem'
  import bus from './common/EventBus'

  export default {
    name: 'Moments',
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
        momentsList: [],
        filter: 'all',
        summaryError: '',
        momentsError: ''
      }
    },
    methods: {
      yearFilter (year) {
        this.getMoments(year)
      },
      todayWeather (data) {
        console.log(data)
      },
      getMoments (filter='all', limit=20, page=1) {
        axios.get('/getMomentsList', {params: {limit, filter, page}})
          .then(res => this.momentsList = res.data)
          .catch(e => this.momentsError = e.toString())
      },
      loadMore(n) {
        this.getMoments(this.filter, 20, n)
      }
    },
    mounted () {
      let self = this
      this.getMoments()
      axios.get('/getSummary')
        .then(d => this.summary = d.data)
        .catch(e => self.summaryError = e.toString())
      bus.$on('reloadMoments', function() {
        self.getMoments()
      })
    },
    watch: {
      needReload () {
        this.getMoments()
      }
    }
  }
</script>
<style scoped>
  .pagination {
    margin-top: 30px;
    text-align: center;
    padding: 10px 0;
    background-color: aliceblue;
  }
</style>
<style>
  .el-card__body {
    padding: 0;
  }
</style>
