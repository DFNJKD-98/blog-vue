<template>
  <div>
    <div id="container">
      <textarea rows="3" v-model="momentsText" autocomplete="false" placeholder="hiahiahia~~"></textarea>
      <i class="el-icon-picture" id="img-selector" @click="selectFile()"></i>
      <el-button type="primary" id="submit" :disabled="disableBtn" @click="postMoments()">发表</el-button>
    </div>

    <el-row style="padding: 5px;">
      <el-upload action=""
                 :auto-upload="false"
                 ref="uploader"
                 :on-remove="handleRemove"
                 :on-preview="handlePictureCardPreview"
                 :on-change="handleChange"
                 :file-list="fileList"
                 list-type="picture-card"
                 multiple
                 id="uploader"
      >
      </el-upload>
    </el-row>

    <!--预览-->
    <el-dialog v-model="dialogVisible" size="full">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>


  </div>
</template>

<script>
  import ImgCompress from './ImgCompress'
  import bus from '../common/EventBus'
  import axios from 'axios'

  export default {
    name: 'InputFrame',
    data () {
      return {
        momentsText: '',
        fileList: [],
        dialogImageUrl: '',
        todayWeather: {},
        dialogVisible: false,
        errorText: ''
      }
    },
    mounted () {
      let self = this
      bus.$on('todayWeather', data => {
        self.todayWeather = data
      })
    },
    methods: {
      handleRemove (file, fileList) {
        this.fileList.splice(file, 1)
      },
      handleChange (file, fileList) {
        this.fileList = fileList
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      selectFile () {
        document.querySelector('input[type="file"]').click()
      },
      postMoments () {
        let self = this
        const moments = {
          content: self.momentsText,
          weather: self.todayWeather,
        }
        let form = new FormData()
        form.append('moments', JSON.stringify(moments))
        if (!this.fileList.length) {
          axios({
              url: '/moments',
              method: 'POST',
              headers: {
                source: 'moments'
              },
              data: form
            })
            .then(() => {
              self.$message.success('Post Moments Succeed')
              self.momentsText = ''
              self.fileList = []
              bus.$emit('reloadMoments')
              bus.$emit('reloadSummary')
            })
            .catch(e => {
              self.$message.error(e.response.data.message)
            })
        } else {
          this.fileList.forEach(function (file, i) {
            ImgCompress(file.raw, function (b) {
              form.append('photos', b, file.name)
              if (i === self.fileList.length - 1 ) {
                axios({
                  url: '/moments',
                  method: 'POST',
                  headers: {
                    source: 'moments'
                  },
                  data: form
                })
                  .then(() => {
                    self.$message.success('Post Moments Succeed')
                    self.momentsText = ''
                    self.fileList = []
                    bus.$emit('reloadMoments')
                    bus.$emit('reloadSummary')
                  })
                  .catch(e => {
                    self.$message.error(e.toString())
                  })
              }
            })
          })
        }
      },
    },
    computed: {
      disableBtn () {
        return !this.momentsText.trim()
      }
    },
  }
</script>

<style>
  #img-selector {
    position: absolute;
    top: 9px;
    right: 64px;
    cursor: pointer;
    font-size: 40px;
  }

  #submit {
    position: absolute;
    top: 10px;
    right: 0
  }

  #container {
    padding: 0 120px 0 12px;
    position: relative;
  }

  textarea {
    font-size: 20px;
    font-weight:normal;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    outline: none;
    width: 100%;
  }

  textarea::-webkit-scrollbar {
    width: 5px;
    background-color: #dbdbdb;
  }

  textarea::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #797979;
  }

  #uploader {
    clear: both;
  }

  #uploader ul.el-upload-list {
    overflow: hidden;
  }

  #uploader .el-upload-list--picture img.el-upload-list__item-thumbnail {
    margin-left: 0;
    float: none;
  }

  #uploader .el-upload-list--picture a.el-upload-list__item-name {
    margin-top: 0;
    margin-right: 0;
  }

  #uploader .el-upload-list--picture .el-upload-list__item-name i {
    display: none;
    position: static;
    font-size: inherit;
  }

  #uploader .el-upload-list__item:hover .el-icon-close {
    color: red;
  }

  #uploader .el-upload--picture-card {
    display: none;
  }
</style>
