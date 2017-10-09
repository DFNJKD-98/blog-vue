import Vue from 'vue'
import router from './router'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import App from './App'

import {
  Pagination,
  Dialog,
  Menu,
  MenuItem,
  Input,
  Checkbox,
  Button,
  Form,
  FormItem,
  Tag,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Card,
  Loading,
  MessageBox,
  Message,
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Card)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
