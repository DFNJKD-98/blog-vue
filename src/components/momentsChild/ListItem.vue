<template>
  <el-card class="box-card">
    <p id="content" @dblclick="editContent = true" v-html="item.content">
      <span></span>
    </p>
    <input v-show="editContent"
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
      <img :src="getIcons(item.weather.code ? item.weather.code[0] : item.weather.code_day ? item.weather.code_day : '0')" width="24"/>
      <el-tag type="gray" v-show="!item.isPublic">Private</el-tag>
      <el-button :plain="true" type="warning" v-show="isLogin" size="small" @click="deleteMoments(item.date)" style="float: right;">Delete</el-button>
    </p>
  </el-card>
</template>
<script>

  import axios from 'axios'
  import bus from '../common/EventBus'
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
      deleteMoments (date) {
        axios.delete('./deleteMoments', {params: {date}})
          .then(d => {
            if (d.data.result.value.date === date) {
              bus.$emit('DeleteMomentSuccess')
            }
            bus.$emit('reloadMoments')
            bus.$emit('reloadSummary')

          })
          .catch(e=>console.log(e.toString()))

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
    overflow: hidden;
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

<style>

  #content > p{
    margin: 0;
  }
</style>
