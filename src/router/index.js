import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Shuoshuo from '@/components/Shuoshuo'
import Blog from '@/components/Blog'
import Conclusion from '@/components/Conclusion'
import Projects from '@/components/Projects'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Shuoshuo',
      name: 'Shuoshuo',
      component: Shuoshuo
    },
    {
      path: '/Blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/s',
      name: 'Conclusion',
      component: Conclusion
    },
    {
      path: '/Projects',
      name: 'Projects',
      component: Projects
    }
  ]
})
