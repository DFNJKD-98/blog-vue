import Vue from 'vue'
import Vuex from 'vuex'

import moments from './modules/moments'
import blog from './modules/blog'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moments,
    blog
  }
})
