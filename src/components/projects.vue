<template>
  <div>
    <el-row :gutter="10">
      <el-col :xm="24" :sm="24" :md="8" :lg="8" v-for="project in projects" :key="project.name">
        <el-card :body-style="{ padding: '10px', 'text-align': 'center'}">
          <div slot="header">
            <h3>{{project.name}}
              <el-button type="primary" style="float:right;">
                <a :href="project.projectUrl">项目地址</a>
              </el-button>
            </h3>
          </div>
          <img width="100%" src="https://localhost:9981/assert/PyQt5-tutorial-screenShot.png" class="image">
          <div style="text-align: left; border-top: 1px solid #ddd">
            <div>
              <h4>{{project.desc.short}}</h4>
              <ul>
                <li v-for="(text, index) in project.desc.details" :key="index">{{text}}</li>
              </ul>
            </div>
            <div style="text-align: right">
              <a :href="project.address.url">{{project.address.title}}</a>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Projects',
    data () {
      return {
        projects: [
          {
            name: 'chrome-shanbay-extension',
            screenShot: './asserts/PyQt5-tutorial-screenShot.png',
            desc: {
              short: '扇贝查单词的chrome插件',
              details: [
                '页面双击查词／选中单词右键查词',
                '添加单词到扇贝生词库',
                '背单词提醒'
              ]
            },
            address: {
              title: 'chrome商店地址',
              url: 'https://chrome.google.com/webstore/detail/%E6%89%87%E8%B4%9D%E5%8A%A9%E6%89%8Bv2/pkibohmmnmpgbnaoappgndlfncanookc'
            },
            projectUrl: 'https://github.com/maicss/chrome-shanbay-v2',
          },
          {
            name: 'PyQt5-chinese-turour',
            desc: {
              short: 'PyQt5教程翻译',
              details: [
                '想做一个桌面端的APP，就看到了这个教程，最后发现还是HTML简单（逃'
              ]
            },
            screenShot: '',
            address: {
              title: 'GitBook 地址',
              url: 'https://www.gitbook.com/book/maicss/pyqt5'
            },
            projectUrl: 'https://github.com/maicss/PyQt5-Chinese-tutoral',
          },
          {
            name: 'Blog',
            desc: {
              short: '本Blog',
              details: [],
            },
            address: {
              title: 'as',
              url: '/'
            },
            screenShot: '',
            projectUrl: ''
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .image {
    box-shadow: 6px 6px 9px 1px rgba(0, 0, 0, 0.2);
    margin-bottom: 5px;
  }
</style>
<style>
  .el-card__header {
    overflow: hidden;
  }
  a {
    text-decoration: none;
  }
  a:visited {
    color: unset;
  }
</style>
