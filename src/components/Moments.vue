<template>
  <el-row :gutter="10">
    <el-col :sm="24" :md="7" :lg="6">
      <Info></Info>
      <br>
      <Conclusion :filter="yearFilter" @todayWeather="todayWeather" defaultFilter="all" :summary="summary"
                  :errorText="summaryError"
      ></Conclusion>
      <br>
    </el-col>
    <el-col :sm="24" :md="17" :lg="18" id="momentsList">
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
        <ListItem :key="item.date" v-for="item in momentsList" :isLogin="isLogin"
                  :item="item"></ListItem>
      </div>
      <div class="pagination">
        <el-pagination
          v-show="summary.all > 20"
          layout="prev, pager, next"
          :page-size="20"
          @current-change="loadMore"
          :total=summary.all>
        </el-pagination>
      </div>
    </el-col>
    <br>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import InputFrame from './momentsChild/Inputer'
  import Info from '@/components/info'
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
      }
    },
    components: {
      Conclusion,
      InputFrame,
      ListItem,
      Info,
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
      getMoments (filter = 'all', limit = 20, page = 1) {
        axios.get('/getMomentsList', {params: {limit, filter, page}})
          .then(res => this.momentsList = res.data)
          .catch(e => this.momentsError = e.toString())
      },
      loadMore (pageIndex) {
        this.getMoments(this.filter, 20, pageIndex)
      },

    },
    mounted () {
      let self = this
      this.getMoments()
      axios.get('/getSummary')
        .then(d => this.summary = d.data)
        .catch(e => self.summaryError = e.toString())
      bus.$on('reloadMoments', function () {
        self.getMoments()
      })
      bus.$on('reloadSummary', function () {
        axios.get('/getSummary')
          .then(d => self.summary = d.data)
          .catch(e => self.summaryError = e.toString())
      })
      bus.$on('DeleteMomentSuccess', function () {
        this.$message.success('Delete moment success.');
      })
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

  @media (max-width: 992px) {
    #momentsList {
      border-left: 1px solid transparent;
      padding-bottom: 20px;
    }
  }
  @media (min-width: 992px) {
    #momentsList {
      border-left: 1px solid #999;
      padding-bottom: 20px;
    }
  }
  .el-card__body {
    padding: 0;
  }
</style>
