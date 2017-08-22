<template>
  <el-row :gutter="10">
    <el-col :sm="24" :md="7" :lg="6">
      <Conclusion :filter="yearFilter" defaultFilter="aa" :summary="summary" :errorText="summaryError"></Conclusion>
    </el-col>
    <el-col :sm="24" :md="17" :lg="18" style="border-left: 1px solid #999; padding-bottom: 20px;">
      {{msg}}
    </el-col>
  </el-row>
</template>

<script>

  import Conclusion from './Conclusion'

  export default {
    name: 'Blog',
    components: {
      Conclusion
    },
    data () {
      return {
        yearFilter () {},
        summary: {aa: 11, bb: 22},
        summaryError: '',
        msg: 'This is Blog'
      }
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
