<template>
  <div id="body" :style="{'background-image': 'url(' + imageInfo.path + ')'}">
    <div id="cover">
      <h1 id="title">Welcome To <i>Maicss' </i>Blog</h1>

      <p id="router">
        <router-link to="/blog">Blog</router-link>
        <router-link to="/moments">Moments</router-link>
        <router-link to="/projects">Projects</router-link>
        <router-link to="/about">About</router-link>
      </p>

      <div id="image-info">
        <p>From: <a :href="imageInfo.url" class="img-link">500px.com</a></p>
        <p>name: {{imageInfo.name}}</p>
        <p>Auth: {{imageInfo.author}}</p>
        <p id="bgi-btn" v-if="isLogin">
          <el-button type="warning" size="small" @click="dislike(imageInfo.id + '.' + imageInfo.format)">Dislike</el-button>
          <el-button v-if="imageInfo.type === 'temp' && !liked" type="info" size="small" @click="like(imageInfo.id + '.' + imageInfo.format)">Like</el-button>
        </p>
      </div>
      <footer id="copyright">
        &copy; maicss 2017 | Powered by: mongodb, nodejs, koa, vue
      </footer>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: {
      isLogin: {
        required: true,
        type: Boolean,
        'default': false
      }
    },
    data () {
      return {
        imageInfo: {},
        liked: false,
        host: process.env.APIUrlPrefix,
      }
    },
    methods: {
      like (imageName) {
        axios.put('/indexImage', {imageName}).then(() => {
          this.$message.success('Liked success.')
          this.liked = true
        }).catch(e => this.$message.error(e.message))
      },
      dislike (imageName) {
        axios.delete('/indexImage', {params: {imageName}}).then(() => {
          this.getImage()
        }).catch(e => this.$message.error(e.message))
      },
      getImage () {
        axios.get('/indexImage').then(d => {
          this.imageInfo = d.data
          this.imageInfo.path = this.host + '/' + this.imageInfo.path
        }).catch(e => this.$message.error(e.message))
      }
    },
    mounted () {
      this.getImage()
    }
  }
</script>

<style scoped>
  #body {
    height: 100vh;
    width: 100vw;
    background-size: cover;
    overflow: hidden;
    position: relative;
  }

  #cover {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, .5);
  }
  #title {
    text-align: center;
    margin-top: 15%;
    color: #b7b7b7;
  }
  #router {
    height: 2rem;
    line-height: 2rem;
    font-size: 2rem;
    text-align: center;
    color: #b7b7b7;
  }
  #router > a {
    text-decoration: underline;
    cursor: pointer;
  }
  #router > a:visited, #router > a:link{
    color: #b7b7b7;
  }
  #image-info{
    background-color: rgba(87, 87, 87, 0.37);
    color: #929292;
    border-radius: 4px;
    position: fixed;
    left: 20px;
    bottom: 70px;
    padding: 10px;
    max-width: 450px;
    right: 20px;
  }
  #image-info > p {
    margin: 0;
  }
  .img-link:visited, .img-link {
    color: #929292;
    text-decoration: underline;
  }
  #copyright {
    padding: 10px 0;
    background-color: #666;
    text-align: center;
    position: fixed;
    bottom:0;
    width: 100vw;
  }
  #bgi-btn{
    text-align: right;
    padding-top: 10px;
    color: #929292;
  }
  .el-button--info{
    color: #929292;
    background-color: rgba(96, 171, 215, 0.53);
    border-color: rgba(96, 171, 215, 0.53);
  }
  .el-button--warning {
    background-color: rgba(165, 112, 41, 0.54);
    color: #929292;
    border-color: rgba(165, 112, 41, 0.54);
  }
</style>
