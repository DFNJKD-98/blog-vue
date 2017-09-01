<template>
  <div>
    <article v-html="blog.html" class="markdown-body">

    </article>
  </div>

</template>

<script>
  import axios from 'axios'
  import '../../assets/css/highlight-github.css'
export default {
  name: 'Blog',
  data () {
return {
  blog: {}
}
  },
  mounted () {
    const self = this
    const blogName = this.$route.path.replace('/blog/', '')
    if (/^[\u4e00-\u9fa5\w-]+[^ /]$/.test(blogName)) {
      axios.get('/getBlog/' + blogName)
        .then(d => {
          this.blog = d.data
        })
        .catch(e => {
          console.error(e)
          // todo
        })
        }
    console.log()
  }
}
</script>

<style scoped>
  article {
    width: 960px;
    margin: 0 auto;
  }
  blockquote {
    padding: 10px 15px;
    border-left: solid 10px;
    margin: 0 0 20px;
    border-color: #D6DBDF;
    background: none repeat scroll 0 0 rgba(102,128,153,.05);
  }

  blockquote p {
    font-size: 16px;
    font-weight: 300;
    line-height: 25px;
  }
</style>
