<template>
  <el-card class="box-card">
    <p id="content" @dblclick="editContent = true">
      <span v-html="item.content"></span>
    </p>
    <input type="text"
           v-show="editContent"
           v-focus="editContent"
           :value="parseMD2DOM(item.content)"
           @keyup.enter="doneEdit"
           @keyup.esc="cancelEdit"
           @blur="doneEdit"

    >
    <el-row>
      <el-col :sm="8" :md="8" :lg="6" v-for="(image, index) in item.images" :key="index">
        <el-card>
          <div class="image-card" :style="{'background-image': 'url(' + host + image + ')', height: '200px'}"></div>
        </el-card>
      </el-col>
    </el-row>

    <p id="info">
      <el-tag type="gray"><i class=""></i>{{item.weather.location}}</el-tag>
      <el-tag type="gray"><i class="el-icon-date"></i> {{item.dateStr.slice(5, -3)}}</el-tag>
      <img :src="getIcons(item.weather.code[0])" width="24"/>
      <el-tag type="gray" v-show="!item.isPublic" style="float: right;">Private</el-tag>
      <el-tag type="danger" v-show="isLogin" style="float: right; margin-right: 10px;">Delete</el-tag>
    </p>
  </el-card>
</template>
<script>

  export default {
    name: 'ListItem',
    props: {
      item: {
        require: false,
        type: Object
      },
      isLogin: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    data () {
      return {
        editContent: false,
        host: process.env.APIUrlPrefix
      }
    },
    methods: {
      parseMD2DOM () {

      },
      doneEdit () {

      },
      cancelEdit () {

      },
      getIcons: function (name) {
        return require('../../assets/weatherIcons/' + name + '.png')
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
    },
  }
</script>

<style scoped>
  .image-card {
    background-size: cover;
    padding: 0;
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

  .box-card {
    border-width: 0 0 1px 0;
    box-shadow: none;
    padding: 5px;
    border-radius: inherit;
  }
</style>
