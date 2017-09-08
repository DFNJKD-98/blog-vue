<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="24" :md="7" :lg="6" id="summaryList">
      <Conclusion :filter="tagFilter" defaultFilter="all" :summary="summary" :errorText="summaryError"></Conclusion>
    </el-col>
    <el-col :xs="24" :sm="24" :md="17" :lg="18" id="blogList">
      <Blog v-for="item in blogList" :key="item.createDate" :blog="item"></Blog>
      <div class="pagination">
        <el-pagination
          v-show="summary.all > 10"
          layout="prev, pager, next"
          :page-size="10"
          @current-change="loadMore"
          :total=summary.all>
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import Blog from './blogChildren/Article'
  import Conclusion from './Conclusion'

  export default {
    name: 'BlogIndex',
    components: {
      Conclusion,
      Blog,
    },
    data () {
      return {
        summary: {},
        summaryError: '',
        blogList: [],
      }
    },
    mounted () {
      const self = this
      this.getBlogList().then(d => self.blogList = d)
      axios.get('/blogSummary')
        .then(d => {
          self.summary = d.data.result[0].content
        })
        .catch(e => this.summaryError = e.message)

    },
    methods: {
      getBlogList (page, tag) {
        return axios.get('/blogList', {params: {page, filter: tag}})
          .then(d => d.data.result)
          .catch(e => this.$message.error(e.message))
      },
      loadMore (page) {
        this.getBlogList(page).then(d => this.blogList = d)
      },
      tagFilter (tag) {
        this.getBlogList(1, tag).then(d => this.blogList = d)
      }
    },
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  @media (max-width: 992px) {
    #summaryList {
      margin-bottom: 20px;
    }
    #blogList {
      border-left: 1px solid transparent;
      padding-bottom: 20px;
    }
  }
  @media (min-width: 992px) {
    #summaryList {
      margin-bottom: 0;
    }
    #blogList {
      border-left: 1px solid #999;
      padding-bottom: 20px;
    }
  }
</style>
