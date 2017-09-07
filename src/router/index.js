import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Index from '@/components/Index'
import Moments from '@/components/Moments'
import BlogIndex from '@/components/BlogIndex'
import Blog from '@/components/blogChildren/Blog'
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
      path: '/BlogIndex',
      name: 'Blog',
      component: BlogIndex
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
      hide: true,
      component: Editor
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
      component: Blog
    },
  ]
})
