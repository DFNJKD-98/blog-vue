<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="24" :md="7" :lg="6">
      <Conclusion :filter="tagFilter" defaultFilter="all" :summary="summary" :errorText="summaryError"></Conclusion>
    </el-col>
    <el-col :xs="24" :sm="24" :md="17" :lg="18" style="border-left: 1px solid #999; padding-bottom: 20px;">
      <Blog v-for="item in blogList" :key="item.createDate" :blog="item"></Blog>
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
        blogList: []
      }
    },
    mounted () {
      const self = this
      axios.get('/blogList')
        .then(d => {
          self.blogList = d.data.result
        })
        .catch(e => this.summaryError = e.message)
      axios.get('/blogSummary')
        .then(d => {
          self.summary = d.data.result[0].content
        })
        .catch(e => this.summaryError = e.message)

    },
    methods: {
      getBlogList (page, tag) {

      },
      tagFilter () {

      }
    },
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
