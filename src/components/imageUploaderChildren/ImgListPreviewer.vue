<template>
  <div>
    <el-row style="padding: 20px;" :gutter="10" class="picture-card">
      <el-col class="item" :xs="8" :sm="8" :md="8" :lg="8" v-for="(file, index) in fileList" :key="index">
        <div id="imgWrapper">
          <img :src="file.src">
          <div id="fileInfo">
            <div>{{file.name}} / {{readableSize(file.size)}} / {{file.width}}*{{file.height}}</div>
            <div v-if="file.path"><el-button @click="copyUrl(file.path)">copy image url</el-button></div>
          </div>
        </div>
        <span class="action-card" v-show="!file.path">
          <span class="item-preview" @click="handlePreview(file)">
            <i class="el-icon-view"></i>
          </span>
          <span class="item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete2"></i>
          </span>
      </span>
      </el-col>
    </el-row>


    <el-dialog v-model="previewDialogVisible">
      <img width="100%" :src="previewFile.src">
      <div><el-input type="text" v-model="previewFile.name"></el-input></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="previewDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="previewDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input.vue'
  import {asyncCompressor} from '../momentsChild/ImgCompress'
  export default {
    components: {ElInput},
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
        dialogImageUrl: '',
        previewDialogVisible: false,
        previewFile: {},
      }
    },
    methods: {
      readableSize (size) {
        return size / 1024 > 1024 ? (~~(10 * size / 1024 / 1024)) / 10 + 'MB' : ~~(size / 1024) + 'KB'
      },
      handlePreview (file) {
        this.previewFile = file
        this.previewDialogVisible = true
      },
      handleRemove (file) {
        this.fileList.splice(this.fileList.indexOf(file), 1)
      },
      copyUrl (url) {
        // 创建一个以URL为内容的选区，然后再执行copy动作
        console.log(url)
        document.execCommand('copy', url)
      }
    }
  }
</script>

<style scoped>
  #imgWrapper {
    overflow: hidden;
    border: 1px solid #c0ccda;
    border-radius: 6px;
  }

  img {
    width: 100%;
    vertical-align: top;
  }

  #fileInfo {
    text-align: center;
  }

  .item {
    overflow: hidden;
    background-color: #fff;
    box-sizing: border-box;
    margin: 5px 0 0;
    display: inline-block;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    font-size: 14px;
    color: #48576a;
    line-height: 1.8;
    position: relative;
  }

  .item:hover .action-card {
    opacity: 1;
  }

  .item:hover .action-card span {
    display: inline-block;
  }

  .action-card {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s;
  }

  .action-card span {
    display: none;
    cursor: pointer;
  }

  .action-card:after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }

</style>
