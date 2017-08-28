<template>
  <el-row :gutter="10">
    <el-col :sm="24" :md="7" :lg="6">
      <Conclusion :filter="tagFilter" defaultFilter="aa" :summary="summary" :errorText="summaryError"></Conclusion>
    </el-col>
    <el-col :sm="24" :md="17" :lg="18" style="border-left: 1px solid #999; padding-bottom: 20px;">
      <BlogList v-for="i in 5" :key="i"></BlogList>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
import BlogList from './blogChildren/BlogList'
  import Conclusion from './Conclusion'

  export default {
    name: 'Blog',
    components: {
      Conclusion,
      BlogList,
    },
    data () {
      return {
        summary: {aa: 11, bb: 22},
        summaryError: '',
        msg: 'This is Blog'
      }
    },
    methods: {
      getBlogs () {
        axios.get('/blogList')
          .then(d => d.data)
          .catch(e => this.summaryError = e.message)
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
