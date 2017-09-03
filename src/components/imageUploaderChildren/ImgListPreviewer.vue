<template>
  <el-row :gutter="20">
    <el-col :span="8" v-for="(file, index) in fileList" :key="index">
      <div style="border: 1px solid #666;">
        <!--<div>{{file}}</div>-->
        <span style="display: none;">{{handleFile(file)}}</span>
        <img :id="'img' + index" :src="file.src">
        <div id="fileInfo">
          {{file.rawFile.name}} / {{readableSize(file.rawFile.size)}} / {{file.width}} * {{file.height}}
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'ImgListPreviewer',
    props: {
      fileList: {
        type: Array,
        require: true,
        'default': []
      }
    },
    data () {
      return {

      }
    },
    computed: {

    },
    mounted () {

    },
    methods: {
      handleFile(file){
        const img = new Image()
        img.src = URL.createObjectURL(file.rawFile)
        img.onload = function () {
          file.src = this.src
          file.width = this.width
          file.height = this.height
        }
      },
      readableSize (size) {
        return size / 1024 > 1024 ? (~~(10 * size / 1024 / 1024)) / 10 + 'MB' : ~~(size / 1024) + 'KB'
      },
      getImageSize() {
        console.log(this)
      }
    }
  }
</script>

<style>
img {
  width: 100%;
  vertical-align: top;
}
  #fileInfo {
    text-align: center;
  }
</style>
