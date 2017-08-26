<template>
  <div id="app">
    <div id="header">

      <el-row :gutter="10">
        <el-col :push="2" :xs="20" :sm="20" :md="20" :lg="20">
          <el-menu :default-active="indexActive" class="el-menu-demo" mode="horizontal" :router=true :xs="20" :sm="20" :md="20" :lg="20">
            <el-menu-item :key="item.path" v-for="item in menuTable" :index="item.path"><i :class="item.icon"></i>{{item.title}}</el-menu-item>
            <!--<el-menu-item :route="{name: '/moments'}" index="/moments">Moments</el-menu-item>-->
            <!--<el-menu-item :route="{name: '/blog'}" index="/blog">Blog</el-menu-item>-->
            <!--<el-menu-item :route="{name: '/projects'}" index="/projects">Projects</el-menu-item>-->
            <!--<el-menu-item :route="{name: '/hello'}" index="/Hello">Hello</el-menu-item>-->
            <li id="login" class="el-menu-item">
              <el-button type="success" v-if="!isLogin" @click="showLoginFrame = true">Login</el-button>
              <el-button v-if="isLogin" @click="logOut()">LogOut</el-button>
            </li>
          </el-menu>
        </el-col>
      </el-row>

    </div>
    <br>

    <el-row>
      <el-col :push="2" :sm="20" :md="20" :lg="20">
    <router-view :isLogin="isLogin" :needReload = needReload></router-view>
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

  </div>
</template>

<script>
  import axios from 'axios'

  axios.defaults.withCredentials = true

  export default {
    name: 'app',
    data () {
      return {
        menuTable: [
          {name: 'index', title: 'Index', path: '/', icon: 'el-icon-menu', isPublic: true},
          {name: 'moments', title: 'Moments', path: '/moments', icon: 'el-icon-menu', isPublic: true},
          {name: 'blog', title: 'Blog', path: '/blog', icon: 'el-icon-menu', isPublic: true},
          {name: 'projects', title: 'Projects', path: '/projects', icon: 'el-icon-menu', isPublic: false},
          {name: 'blog poster', title: 'Blog Poster', path: '/editor', icon: 'el-icon-menu', isPublic: false},
          {name: 'hello', title: 'Hello', path: '/hello', icon: 'el-icon-menu', isPublic: true},
        ],
        isLogin: false,
        logFailed: false,
        alertContent: '',
        indexActive: '/',
        showLoginFrame: false,
        needReload: false,
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
//      this.$router.beforeEach((to, from, next) => {
//        this.indexActive = to.path
//        next()
//      })
      this.isLogin =  document.cookie.indexOf('login=bingo') > -1
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
                self.needReload = true
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
            if (res.data === 'succeed') {
              self.isLogin = false
              self.needReload = true
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
  .el-menu-item {
    height: 36px;
    line-height: 36px;
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
</style>
