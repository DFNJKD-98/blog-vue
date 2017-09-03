<template>
  <div>
    <div>
      <el-button type="info" size="large" id="fileChoose" @click="handleFileChooserClick">Choose File</el-button>
      <input type="file" multiple accept="image/*" hidden id="fileInput" @change="handleFileInputChange" ref="fileInput">
      <el-button type="primary" disabled size="large" id="imageUploaderButton">Uploader</el-button>
    </div>
    <section>
      <ImgListPreviewer :fileList="fileList"></ImgListPreviewer>
    </section>
  </div>

</template>

<script>
import ImgListPreviewer from './imageUploaderChildren/ImgListPreviewer'
  export default {
    name: 'ImageUploader',
    components: {
      ImgListPreviewer
    },
    data () {
      return {
        fileList: [],
      }
    },
    methods: {
      handleFileChooserClick () {
        this.$refs.fileInput.click();
      },
      handleFileInputChange(ev) {
        const files = ev.target.files;

        if (!files) return;
        this.fileList = [...files].map(rawFile => ({rawFile, width: 0, height: 0, src: ''}))
      }
    }
  }
</script>

<style scoped>
  #fileChoose {
    padding: 15px 60px;
  }
  #imageUploaderButton{
    padding: 15px 60px;
  }
</style>
