<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="24" :md="7" :lg="6" id="summaryList">
      <Info></Info>
      <br>
      <Conclusion :filter="tagFilter" defaultFilter="all" :summary="summary" :errorText="summaryError"></Conclusion>
    </el-col>
    <el-col :xs="24" :sm="24" :md="17" :lg="18" id="blogList" style="padding-left: 20px;">
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
  import Info from './Info'

  export default {
    name: 'BlogIndex',
    components: {
      Conclusion,
      Blog,
      Info,
    },
    data () {
      return {
        summary: {all: 0},
        summaryError: '',
        blogList: [],
      }
    },
    mounted () {
      const self = this
      this.getBlogList().then(d => self.blogList = d)
      axios.get('/blog/summary')
        .then(d => self.summary = d.data.content)
        .catch(e => this.summaryError = e.message)

    },
    methods: {
      getBlogList (page, tag) {
        return axios.get('/blog/list', {params: {page: page || 1, limit: 10, filter: tag}})
          .then(d => d.data)
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
  .pagination {
    text-align: center;
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
