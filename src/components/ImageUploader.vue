<template>
  <div>
    <div style="text-align: center">
      <el-button type="info" size="large" id="fileChoose" @click="handleFileChooserClick">Choose File</el-button>
      <input type="file" multiple accept="image/*" hidden id="fileInput" @change="handleFileInputChange" ref="fileInput">
      <el-button type="primary" :disabled="!fileList.length" size="large" @click="uploadFiles" id="imageUploaderButton">Upload</el-button>
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
      }
    },
    mounted () {
      axios.get('./getBlogImageInfo')
        .then(d => this.databaseImagesInfo = d.data)
        .catch(e => this.$message.error(e.response.data.message))
    },
    methods: {
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
        const formData = new FormData()
        this.fileList.forEach(file => {
          formData.append('picture', file.file, file.name)
        })
        axios({
          url: '/blogImageUpload',
          method: 'POST',
          headers: {
            source: 'blog'
          },
          data: formData
        }).then(d => {
          d.data.forEach(file => {
            self.fileList.forEach(_file => {
              if (file.originName === _file.name) {
                _file.path = 'http://localhost:8080/' + file.path
              }
            })
          })
          // 这里应该拿到图片的  数据  url
        }).catch(e => {
          console.log(e)
          this.$message.error('error')
        })
      }
    }
  }
</script>

<style scoped>
  #fileChoose {
    padding: 15px 60px;
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
    padding: 15px 60px;
  }
</style>
