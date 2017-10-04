<template>
  <div id="app">
    <div id="header" v-show="$route.path !=='/'">

      <el-row>
        <el-col>
          <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" :router=true :xs="20" :sm="20" :md="20" :lg="20">
            <el-menu-item
              :key="item.path"
              v-for="item in $router.options.routes"
              v-if="(!item.private || isLogin) && !item.hide"
              :index="item.path"
              :route="{name: item.name}"
              :disabled="false"
            >
              <i :class="item.icon"></i>{{item.name}}
            </el-menu-item>
            <li id="login" class="el-menu-item">
              <el-button type="success" v-if="!isLogin" @click="showLoginFrame = true">Login</el-button>
              <el-button v-if="isLogin" @click="logOut()">LogOut</el-button>
            </li>
          </el-menu>
        </el-col>
      </el-row>

      <br>
    </div>

    <el-row id="main-body">
      <el-col>
        <router-view :isLogin="isLogin"></router-view>
      </el-col>
    </el-row>

    <el-dialog title="Login" :visible.sync="showLoginFrame">
      <el-form :model="form">
        <el-form-item label="Username" :label-width="formLabelWidth" required>
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth" required>
          <el-input v-model="form.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="RememberMe" :label-width="formLabelWidth" prop="rememberMe">
          <el-checkbox label="" v-model="form.rememberMe" name="rememberMe"></el-checkbox>
        </el-form-item>
      </el-form>
      <el-alert v-show="logFailed" title="Invalid username or Password." :closable="false" type="error"></el-alert>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showLoginFrame = false">取 消</el-button>
        <el-button type="primary" :disabled="hasUAndP" @click="login()">确 定</el-button>
      </div>
    </el-dialog>

    <div id="footer" v-show="$route.path !=='/'">
      &copy; maicss 2017 | Powered by: mongodb, nodejs, express, vue
    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  // todo blog的svg图标 location/calender/tags

  axios.defaults.withCredentials = true

  export default {
    name: 'app',
    data () {
      return {
        isLogin: false,
        logFailed: false,
        alertContent: '',
        showLoginFrame: false,
        mark: 'all',
        form: {
          username: 'test',
          password: 'test',
          rememberMe: true
        },
        formLabelWidth: '120px'
      }
    },
    mounted () {
      this.isLogin =  document.cookie.indexOf('login=bingo') > -1
      const metaInfo = `
        <meta name="author" content="maicss">
        <meta name="description" content="maicss' blog">
        <meta name="keywords" content="maicss javascript 前端 博客">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
      `
      const ga = `
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-70116787-3"><\/script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());

          gtag('config', 'UA-70116787-3');
        <\/script>
      `
      document.querySelector('head').insertAdjacentHTML('afterBegin', metaInfo)
      document.querySelector('head').insertAdjacentHTML('afterBegin', ga)
    },
    methods: {
      login () {
        let self = this
        this.showLoginFrame = true
        if (this.form.username.trim() && this.form.password) {
          axios.post('/login', {...this.form})
            .then(function (response) {
              if (response.status === 200) {
                self.showLoginFrame = false
                self.isLogin = true
              }
            })
            .catch(function (error) {
              if (error.status === 401) {
                self.alertContent = 'Invalid username or Password.'
              } else {
                self.alertContent = 'Net Error'
              }
              self.logFailed = true
            })
        }
      },
      logOut () {
        let self = this
        axios.post('/logout')
          .then(res => {
            if (res.status === 200) {
              self.isLogin = false
            } else {
              console.error('logout failed: ', res)
            }
          })
          .catch(e => console.error('logout failed: ', e))
      }
    },
    computed: {
      hasUAndP () {
        return !(this.form.username && this.form.password)
      }
    }
  }
</script>

<style>
  #app {

  }
  #login {
    float: right;
  }

  #login:hover {
    border-bottom-color: transparent;
  }

  #app {
    font-family: "PingFangSC-Light", "Helvetica Neue", Helvetica, "Microsoft YaHei", "微软雅黑", Arial, SimHei, serif;
  }
  #footer {
    text-align: center;
    background-color: #fff;
    padding: 10px 0;
    bottom: 0;
    border-top: 1px solid rgb(154, 154, 154);
  }
  #main-body {
    /*padding-bottom: 50px;*/
    overflow: hidden;
  }
  body {
    margin: 0;
  }
</style>
