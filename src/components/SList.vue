<template>
  <div>

    <el-card class="box-card" :key="item.date" v-for="item in Shuo">
      <p id="content" @dblclick="editContent = true">
        <span v-html="item.content"></span>
      </p>
      <input type="text"
             v-show="editContent"
             v-focus="editContent"
             :value = "parseMD2DOM(item.content)"
             @keyup.enter="doneEdit"
             @keyup.esc="cancelEdit"
             @blur="doneEdit"

      >

      <p id="info">
        <el-tag type="gray"><i class=""></i>{{item.weather.location}}</el-tag>
        <el-tag type="gray"><i class="el-icon-date"></i> {{item.dateStr.slice(5, -3)}}</el-tag>
        <img :src="getIcons(item.weather.code[0])" width="24"/>
        <el-tag type="gray" style="float: right;">Private</el-tag>
        <el-tag type="danger" style="float: right; margin-right: 10px;">Delete</el-tag>
      </p>
    </el-card>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'SList',
    data () {
      return {
        editContent: false,
        Shuo: [
          {
            'date': 1502097931767,
            'dateStr': '2017-08-07 17:25:31',
            'weather': {'temperature': ['29', '38'], 'code': ['11', '4'], 'location': '上海'},
            'content': '<p>发烧了一个周末，好烦啊，不过现在稍好了点，(&gt;﹏&lt;)</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1502097862071,
            'dateStr': '2017-08-07 17:24:22',
            'weather': {'temperature': ['29', '38'], 'code': ['11', '4'], 'location': '上海'},
            'content': '<p> 插件发布了，也懒的做推广<del>也没啥可推广的啊，那么简单的东西</del>，就这吧。在考虑要不要顺便做一个Firefox版本的，现在Firefox也蛮好看了的</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1501518942666,
            'dateStr': '2017-08-01 00:35:42',
            'weather': {'temperature': ['28', '35'], 'code': ['14', '13'], 'location': '上海'},
            'content': '<p> chrome 插件做好了，就等信用卡到手，发布到应用商店了。也弄了一个二级域名玩玩</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1501147664977,
            'dateStr': '2017-07-27 17:27:44',
            'weather': {'temperature': ['29', '37'], 'code': ['4', '4'], 'location': '上海'},
            'content': '<p> chrome插件测试的时候发现了GitHub不行，是内容安全策略禁用了外部的媒体资源，也禁用了行内事件的执行，这个厉害了，涨姿势。这样的话，还是要用外部的库才能播放语音吗？</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1499676253550,
            'dateStr': '2017-07-10 16:44:13',
            'weather': {'temperature': ['28', '36'], 'code': ['11', '13'], 'location': '上海'},
            'content': '<p> aaa</p>\n',
            'images': ['/img/shuoshuo/1499676252899-QQ截图20170710163140.png', '/img/shuoshuo/1499676253311-QQ截图20170710163152.png'],
            'isPublic': true
          }, {
            'date': 1499122737895,
            'dateStr': '2017-07-04 06:58:57',
            'weather': {'temperature': ['26', '34'], 'code': ['11', '10'], 'location': '上海'},
            'content': '<p>网站弄好了HTTP2，评分也是A了，A+暂时算了吧</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1499120767374,
            'dateStr': '2017-07-04 06:26:07',
            'weather': {'temperature': ['26', '34'], 'code': ['11', '10'], 'location': '上海'},
            'content': '<p> 五点就醒了的感觉真不好</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1499070155451,
            'dateStr': '2017-07-03 16:22:35',
            'weather': {'temperature': ['26', '33'], 'code': ['14', '13'], 'location': '上海'},
            'content': '<p> 心知天气的准确度还不如美国的weather呢，这个……</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1498724429906,
            'dateStr': '2017-06-29 16:20:29',
            'weather': {'temperature': ['24', '27'], 'code': ['13', '13'], 'location': '上海'},
            'content': '<p> 最后还是看回了vue，因为能直接看官方的文档，比道听途说的更放心<del>还不是因为自己看不了英文文档</del>。不过这次的react也没白看，很多概念都是一样的</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1496741338685,
            'dateStr': '2017-06-06 17:28:58',
            'weather': {'temperature': ['21', '28'], 'code': ['10', '4'], 'location': '上海'},
            'content': '<p> picture</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1495452835437,
            'dateStr': '2017-05-22 19:33:55',
            'weather': {'temperature': ['21', '28'], 'code': ['4', '4'], 'location': '上海'},
            'content': '<p> 效率越来越低了，一天专注的时间俩小时也没了</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1493928965669,
            'dateStr': '2017-05-05 04:16:05',
            'weather': {'temperature': ['17', '23'], 'code': ['9', '4'], 'location': '上海'},
            'content': '<p> 图片测试</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1493781632333,
            'dateStr': '2017-05-03 11:20:32',
            'weather': {'temperature': ['18', '22'], 'code': ['9', '13'], 'location': '上海'},
            'content': '<p> 好久没来了，罪过罪过</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1491812894570,
            'dateStr': '2017-04-10 16:28:14',
            'weather': {'temperature': ['11', '14'], 'code': ['13', '13'], 'location': '上海'},
            'content': '<p> 完全玩过去的周末，和看不进去教程的周一～～</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1491459458728,
            'dateStr': '2017-04-06 14:17:38',
            'weather': {'temperature': ['15', '21'], 'code': ['14', '14'], 'location': '上海'},
            'content': '<p>公司用自己的电脑办公居然没有任何补助，而且还说要求使用公司的电脑，因为以后还要统一装监控，现在网络不是已经有监控了吗，真是醉了</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1491459395488,
            'dateStr': '2017-04-06 14:16:35',
            'weather': {'temperature': ['15', '21'], 'code': ['14', '14'], 'location': '上海'},
            'content': '<p> 4K屏终于到了，淘宝买的，幸好没问题，好像是完美屏<del>之前在京东买的时候就没注意过是不是完美屏</del>，不用折腾了。真的好舒服啊，不用各种调了，上来就是最漂亮的界面。以后加班也有动力了～～～</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1491459091733,
            'dateStr': '2017-04-06 14:11:31',
            'weather': {'temperature': ['15', '21'], 'code': ['14', '14'], 'location': '上海'},
            'content': '<p>test</p>\n',
            'images': [],
            'isPublic': false
          }, {
            'date': 1491459077292,
            'dateStr': '2017-04-06 14:11:17',
            'weather': {'temperature': ['15', '21'], 'code': ['14', '14'], 'location': '上海'},
            'content': '<p> test</p>\n',
            'images': [],
            'isPublic': null
          }, {
            'date': 1491389565164,
            'dateStr': '2017-04-05 18:52:45',
            'weather': {'temperature': ['16', '22'], 'code': ['13', '13'], 'location': '上海'},
            'content': '<p> marked搞定了</p>\n',
            'images': [],
            'isPublic': true
          }, {
            'date': 1491118928304,
            'dateStr': '2017-04-02 15:42:08',
            'weather': {'temperature': ['10', '22'], 'code': ['0', '0'], 'location': '苏州'},
            'content': '<p>各种方式之后还是不行，决定把<code>marked</code>这个库用ES6修改车工class重写地方式，每次new一个实例，完全独立的环境，就没有变量污染的事情了。</p>\n',
            'images': [],
            'isPublic': true
          }],

      }
    },
    mounted () {
      axios.get(process.env.APIUrlPrefix + '/getShuoshuoList')
    },
    methods: {
      parseMD2DOM (md) {
        console.log(md)
      },
      doneEdit (e) {
        const value = e.target.value.trim()
//        if (!value) {
//          delete
//        }
      },
      deleteShuoshuo() {

      },
      cancelEdit () {

      },
      getIcons: function (name) {
        return require('../assets/weatherIcons/' + name + '.png')
      }
    },
    directives: {
      focus (el, {value}, {context}) {
        if (value) {
          context.$nextTick(() => {
            el.focus()
          })
        }
      }
    }
  }
</script>
<style scoped>
  ul {
    /*background-color: #548999;*/
    margin: 0;
  }

  #content {
    margin: 0;
    font-size: 20px;
  }

  #info {
    margin-bottom: 0;
    overflow: hidden;
  }

  #info img {
    vertical-align: middle;
    border: none;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    border-width: 0 0 1px 0;
    box-shadow: none;
    border-radius: inherit;
  }
</style>
<style>
  .el-card__body {
    padding: 5px;
  }
</style>
