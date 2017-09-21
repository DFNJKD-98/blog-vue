import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Index from '@/components/Index'
import Moments from '@/components/Moments'
import BlogIndex from '@/components/BlogIndex'
import Blog from '@/components/blogChildren/Blog'
import Projects from '@/components/Projects'
import ImageUploader from '@/components/ImageUploader'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/blog',
      name: 'Blog',
      component: BlogIndex
    },
    {
      path: '/moments',
      name: 'Moments',
      component: Moments
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/imageUploader',
      name: 'Image Bed',
      // icon: 'el-icon-picture',
      private: true,
      component: ImageUploader,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/blog/*',
      name: 'blog',
      hide: true,
      component: Blog,
      beforeEnter(to, from, next) {
        if (to.params[0]) {
          next()
        } else {
          next('/404')
        }
      }
    },
    {
      path: '*',
      name: 'NotFound',
      hide: true,
      component: NotFound,
    },
  ]
})
