<template>
  <div>
    <div style="text-align: center">
      <el-button type="info" size="large" id="fileChoose" @click="handleFileChooserClick">Choose File</el-button>
      <input type="file" multiple accept="image/*" hidden id="fileInput" @change="handleFileInputChange" ref="fileInput">
      <el-button type="primary" :disabled="!fileList.length || uploaded" size="large" @click="uploadFiles" id="imageUploaderButton" v-loading.fullscreen.lock="fullScreenLoading" element-loading-text="正在上传图片">Upload</el-button>
    </div>
    <div id="info" v-if="Object.keys(databaseImagesInfo).length">
      <div><strong>Images count: </strong> <span>{{databaseImagesInfo.count}}</span></div>
      <div><strong>Images size : </strong> <span>{{readableSize(databaseImagesInfo.total)}}</span></div>
    </div>
    <div>
      <ImgListPreviewer :fileList.sync="fileList"></ImgListPreviewer>
    </div>
  </div>

</template>

<script>
  import ImgListPreviewer from './imageUploaderChildren/ImgListPreviewer'
  import axios from 'axios'
  import {asyncCompressor} from './momentsChild/ImgCompress'
  export default {
    name: 'ImageUploader',
    components: {
      ImgListPreviewer
    },
    data () {
      return {
        fileList: [],
        databaseImagesInfo: {},
        fullScreenLoading: false,
        host: process.env.APIUrlPrefix,
        uploaded: false
      }
    },
    mounted () {
      axios.get('./blog/imageInfo')
        .then(d => this.databaseImagesInfo = d.data)
        .catch(e => this.$message.error(e.response.data.error))
      window.addEventListener('beforeunload', this.handleCloseWindow)
    },
    beforeDestroy () {
      window.removeEventListener('beforeunload', this.handleCloseWindow)
    },
    methods: {
      handleCloseWindow (e) {
        const msg = '确认离开？'
        if (this.fileList.length){
          e.returnValue = msg
          return msg
        } else {
          return ''
        }
      },
      handleFileChooserClick () {
        this.$refs.fileInput.click()
      },
      readableSize (size) {
        return size / 1024 > 1024 ? (~~(10 * size / 1024 / 1024)) / 10 + 'MB' : ~~(size / 1024) + 'KB'
      },
      handleFileInputChange (ev) {
        const files = ev.target.files
        const self = this
        if (!files) return
        Promise.all([...ev.target.files].map(file => asyncCompressor(file))).then(d => self.fileList = d)
      },
      uploadFiles() {
        // 给一个全屏的load
        const self = this
        self.fullScreenLoading = true;
        const formData = new FormData()
        self.fileList.forEach(file => {
          formData.append('photos', file.file, file.name)
        })
        axios({
          url: '/blog/imageUpload',
          method: 'POST',
          headers: {
            source: 'blog'
          },
          data: formData
        }).then(d => {
          const newFileList = []
          d.data.forEach(file => {
            self.fileList.forEach(_file => {
              if (file.originName === _file.name) {
                _file.path = self.host + file.path
                newFileList.push(_file)
              }
            })
          })
          self.fileList = newFileList
          self.fullScreenLoading = false
          self.uploaded = true
        }).catch(e => {
          this.$message.error(e.message)
        })
      }
    },

    beforeRouteLeave (to, from, next){
      if (this.fileList.length && confirm('确认离开？')) {
        next()
      } else {
        next()
      }
    }
  }
</script>

<style scoped>
  #fileChoose {
    padding: 15px 48px;
    margin-right: 10px;
  }

  #info {
    width: 300px;
    border: 1px solid #c0ccda;
    border-radius: 4px;
    margin: 10px auto;
    text-align: justify;
    padding: 5px;
    box-sizing: border-box;
  }

  #imageUploaderButton {
    padding: 15px 48px;
  }
</style>
