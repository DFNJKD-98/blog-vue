<template>
  <div id="app">
    <div id="header">

      <el-row :gutter="10">
        <el-col :push="2" :xs="20" :sm="20" :md="20" :lg="20">
          <el-menu :default-active="indexActive" class="el-menu-demo" mode="horizontal" :router=true :xs="20" :sm="20" :md="20" :lg="20">
            <el-menu-item index="/"><i class="el-icon-menu"></i>Index</el-menu-item>
            <el-menu-item index="/shuoshuo">Shuoshuo</el-menu-item>
            <el-menu-item index="/blog">Blog</el-menu-item>
            <el-menu-item index="/Hello">Hello</el-menu-item>
            <el-menu-item index="/projects">Projects</el-menu-item>
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
        <el-row :gutter="10">
          <el-col :sm="24" :md="7" :lg="6">
            <Conclusion></Conclusion>
          </el-col>
          <el-col :sm="24" :md="17" :lg="18" style="border-left: 1px solid #999; padding-bottom: 20px;">
            <router-view :isLogin="isLogin" :needReload = needReload></router-view>
          </el-col>
        </el-row>
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
        <el-form-item label="RememberMe" :label-width="formLabelWidth" prop="remember">
          <el-checkbox label="" v-model="form.remember" name="remember"></el-checkbox>
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

  import Conclusion from './components/Conclusion'
  import axios from 'axios'

  axios.defaults.withCredentials = true

  export default {
    name: 'app',
    components: {
      Conclusion
    },
    data () {
      return {
        isLogin: false,
        logFailed: false,
        alertContent: '',
        indexActive: '/',
        showLoginFrame: false,
        needReload: false,
        mark: 'all',
        form: {
          username: '',
          password: '',
          remember: false
        },
        formLabelWidth: '120px'
      }
    },
    mounted () {
      this.isLogin =  document.cookie.indexOf('login=bingo') > -1
    },
    methods: {
      login () {
        let self = this
        this.showLoginFrame = true
        if (this.form.username.trim() && this.form.password) {
          axios.post('/login', {...this.form})
            .then(function (response) {
              if (response.data === 'succeed') {
                // todo reload shuoshuo list
                self.showLoginFrame = false
                self.isLogin = true
                self.needReload = true
                console.log(response.headers["set-cookie"])
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
              // todo reload shuoshuo list
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
