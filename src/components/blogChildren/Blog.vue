<template>
  <div id="container" :xm="24" :sm="24" :md="24" :lg="24">
    <div id="meta">
      <div>
      <span>read: {{blog.readCount}}</span>
      </div>
      <div>
        <span>comments: {{blog.commentCount}}</span>
      </div>
    </div>
    <h1>{{blog.title}}</h1>
    <div id="content" class="markdown-body">
      <div id="toc" v-show="toc" v-html="toc"></div>
      <p>tags:
        <el-tag type="gray" v-for="tag in blog.tags" :key="tag" style="margin-left: 5px;">{{tag}}</el-tag>
      </p>
      <p>
        <time>{{blog.date}}</time>
      </p>
      <span v-html="blog.html">

      </span>
    </div>

    <div id="comments"></div>

  </div>

</template>

<script>
  import axios from 'axios'
  import 'gitment/style/default.css'
  import Gitment from 'gitment'
  import '../../assets/css/highlight-github.css'

  export default {
    name: 'Blog',
    data () {
      return {
        blog: {},
        toc: '',
        gitment: null
      }
    },
    mounted () {
      const self = this
      const blogName = this.$route.params[0]
      if (/^[\u4e00-\u9fa5\w-]+[^ /]$/.test(blogName)) {
        axios.get('/blog/archive/' + blogName)
          .then(d => {
            d.data.html = d.data.html.replace(/<h1[\S\s]+<\/h1>/, '')
            self.blog = d.data
            self.toc = self.generateTOC(d.data.toc)
          })
          .catch(e => this.$router.push('/404'))
      }
      self.renderComments()
      self.gitment.render('comments')
    },
    methods: {
      generateTOC: function (list) {
        if (!list.length) return ''
        let stArr = ['<p>文章目录</p>', '<ul>']
        let l = 0
        let levelN
        list.forEach((v, i) => {
          let anchor = '#' + v.text.toLowerCase().replace(/[^\u4e00-\u9fa5\w]+/g, '-')
          if (l === 0 || l === v.level) {
            l = v.level
            stArr.push(`<li><a href="${anchor}">${v.text}</a></li>`)
          } else if (v.level > l) {
            l = v.level
            // 如果后面的level比前面的高，只可能会高一级，正常情况下
            // 先删除父级的结束标签，然后再塞入子级标签
            stArr[stArr.length - 1] = stArr[stArr.length - 1].replace('</li>', '')
            stArr.push(`<ul><li><a href="${anchor}">${v.text}</a></li>`)
          } else if (levelN = l - v.level) {
            // 如果后面一个子项比前面的低了，比如4级标题后面又跟了一个二级标题或者三级标题，先塞ol结束标记，再塞对应个数的li结束标记
            l = v.level
            stArr.push('</ul></li>')
            stArr.push('</ul>'.repeat(levelN - 1))
            stArr.push(`<li><a href="${anchor}">${v.text}</a></li>`)
          }
          if (i === list.length - 1) {
            // 最后一个，塞结束标记
            stArr.push('</ul>')
          }
        })

        return stArr.join('')

      },

      renderComments () {
        this.gitment = new Gitment({
          owner: 'maicss',
          repo: 'blog2',
          oauth: {
            client_id: 'f1754887d2730be17261',
            client_secret: '0e1b702c2368238c576f4113a4a7a39466acef4f'
          }
        })
      }
    }
  }
</script>

<style scoped>
  #container {
    max-width: 960px;
    margin: 0 auto;
  }
  #meta {
    float: right;
    text-align: right;
  }

  #content {
    overflow: hidden;
    padding-bottom: 50px;
  }

  #toc {
    float: right;
    max-width: 280px;
    border: 1px solid #999;
    border-radius: 1px;
    padding: 5px;
    background-color: #f5f5f5;
  }

  #comments {
    border-top: 1px solid #999;
  }

  h1 {
    margin: 20px auto;
  }

  h1, h2, h3, h4 {
    color: #444
  }
</style>
