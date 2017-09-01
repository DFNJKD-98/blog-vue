import Vue from 'vue'
import store from './store/index'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import App from './App'

axios.defaults.withCredentials = true

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
