<template>
  <div id="body">
    <div id="cover">
      <h1 id="title">Welcome To <i>Maicss' </i>Blog</h1>

      <p id="router">
        <router-link to="/blog">Blog</router-link>
        <router-link to="/moments">Moments</router-link>
        <router-link to="/projects">Projects</router-link>
        <router-link to="/about">About</router-link>
      </p>

      <div id="image-info">
        <p>From: <a href="https://500px.com/photo/227073241/lonely-cloud-over-an-island-by-yann-grmln">500px.com</a></p>
        <p>Auth: Yann Grmln</p>
        <p id="bgi-btn" v-if="isLogin">
          <el-button type="warning" size="small">Dislike</el-button>
          <el-button type="info" size="small">Like</el-button>
        </p>
      </div>
      <footer id="copyright">
        &copy; maicss 2017 | Powered by: mongodb, nodejs, express, vue
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isLogin: {
        require: true,
        type: Boolean,
        'default': false
      }
    }
  }
</script>

<style scoped>
  #body {
    height: 100vh;
    width: 100vw;
    background-image: url(../assets/About.jpg);
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
    background-color: #8e8e8e;
    border-radius: 4px;
    position: fixed;
    left: 20px;
    bottom: 70px;
    padding: 10px;
  }
  #image-info > p {
    margin: 0;
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
    color: #eeeeee;
  }
  .el-button--info{
    color: #ddd;
    background-color:#60abd7;
    border-color: #6cb8e5;
  }
  .el-button--warning {
    background-color: #c49831;
    color: #ddd;
    border-color: #c49831;
  }
</style>
