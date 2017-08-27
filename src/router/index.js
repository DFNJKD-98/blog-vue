import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Moments from '@/components/Moments'
import Blog from '@/components/Blog'
import Projects from '@/components/Projects'
import Editor from '@/components/Editor'
import ImageUploader from '@/components/ImageUploader'

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
      path: '/moments',
      name: 'Moments',
      component: Moments
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/editor',
      name: 'Blog Poster',
      // icon: 'el-icon-edit',
      private: true,
      component: Editor
    },
    {
      path: '/imageUploader',
      name: 'Image Bed',
      // icon: 'el-icon-picture',
      private: true,
      component: ImageUploader
    },
    {
      path: '/about',
      name: 'About',
      component: Hello
    },
  ]
})
