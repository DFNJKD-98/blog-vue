<template>
  <div>
    <div id="container">
      <div id="editor" contenteditable placeholder="hiahiahia~~" @input="bindShuoshuo($event)"></div>
      <i class="el-icon-picture" id="img-selector" @click="selectFile()"></i>
      <el-button type="primary" id="submit" :disabled="disableBtn" @click="postShuoshuo()">发表</el-button>
    </div>

    <el-row style="padding: 5px;">
      <el-upload action=""
                 :auto-upload="false"
                 ref="uploader"
                 :on-remove="handleRemove"
                 :on-preview="handlePictureCardPreview"
                 :on-change="handleChange"
                 :on-success="handleSuccess"
                 :file-list="fileList"
                 list-type="picture-card"
                 multiple
                 id="uploader"
      >
      </el-upload>
    </el-row>

    <!--预览-->
    <el-dialog v-model="dialogVisible" size="full">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>


  </div>
</template>

<script>
  import ImgCompress from '../ImgCompress.js'

  export default {
    name: 'InputFrame',
    components: {
      ImgCompress
    },
    data () {
      return {
        shuoshuoText: '',
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        imgFormData: new FormData()
      }
    },
    methods: {
      handleRemove (file) {
        console.log(file)
      },
      handleChange (file, fileList) {
        console.log(file)
        this.fileList = fileList
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      selectFile () {
        document.querySelector('input[type="file"]').click()
      },
      postShuoshuo () {
        const shuoshuo = {
          content: this.shuoshuoText,
          weather: {
//            temperature: [weatherInfo.low, weatherInfo.high],
//            code: [weatherInfo.code_day, weatherInfo.code_night],
//            location: weatherInfo.location
          },

        }
        let form = this.imgFormData
        this.fileList.forEach(function (file) {
          ImgCompress.compresser(file.raw, function (b) {
            form.append('photo', b, file.name)
          })
        })
        this.imgFormData.append('obj', JSON.stringify(shuoshuo))
        console.log(this.shuoshuoText)
        console.log(this.fileList)
        console.log(this.imgFormData)
//        this.$refs.uploader.submit()
      },
      handleSuccess (response, file, fileList) {
        if (response) {
          console.log(response)
        }
      },
      bindShuoshuo (e) {
        this.shuoshuoText = e.target.innerHTML
      }
    },
    computed: {
      disableBtn () {
        return !this.shuoshuoText.trim()
      }
    }
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
    overflow: hidden;
    padding: 0 110px 0 0;
    position: relative;
  }

  #editor {
    vertical-align: middle;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-width: 100%;
    height: 60px;
    font-size: 20px;
    outline: none;
    padding: 5px;
    box-sizing: border-box;
    overflow-x: hidden;
    line-height: 1;
  }

  #editor:empty:before {
    content: attr(placeholder);
    display: block;
    color: #999
  }

  /*#editor:focus:before{*/
    /*content: '';*/
  /*}*/

  #editor::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    border-radius: 10px;
  }

  #editor::-webkit-scrollbar
  {
    width: 10px;
    background-color: #F5F5F5;
  }

  #editor::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-image: -webkit-gradient(linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(122,153,217)),
    color-stop(0.72, rgb(73,125,189)),
    color-stop(0.86, rgb(28,58,148)));
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
