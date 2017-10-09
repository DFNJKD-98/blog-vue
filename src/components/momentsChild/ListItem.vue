<template>
  <el-card class="box-card">
    <p id="content" @dblclick="editContent = isLogin" v-show="!editContent" v-html="item.content">
      <span></span>
    </p>
    <textarea
      id="contentInput"
      v-show="editContent"
      v-focus="editContent"
      :value="item.content"
      @keyup.enter="doneEdit($event)"
      @keyup.esc="cancelEdit"
      @blur="doneEdit($event)"
    ></textarea>
    <el-row>
      <el-col :sm="8" :md="8" :lg="6" v-for="(image, index) in item.images" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <div class="image-card" :style="{'background-image': 'url(\'' + host + image + '\')', height: '200px'}"></div>
        </el-card>
      </el-col>
    </el-row>

    <p id="info">
      <el-tag type="gray"><i class=""></i>{{item.weather.location}}</el-tag>
      <el-tag type="gray"><i class="el-icon-date"></i> {{item.dateStr.slice(5, -3)}}</el-tag>
      <img :src="host + '/img/assets/weatherIcons/' + item.weather.code_day + '.png'" width="24"/>
      <el-tag type="gray" v-show="!item.isPublic">Private</el-tag>
      <el-button :plain="true" type="warning" v-show="isLogin&&!editContent" size="small" @click="deleteMoments(item.date)" style="float: right;">
        Delete
      </el-button>
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
        'default': false
      }
    },
    data () {
      return {
        editContent: false,
        host: process.env.APIUrlPrefix
      }
    },
    methods: {
      doneEdit (e) {
        const self = this
        if (e.target.value) {
          if (e.target.value !== self.item.content) {
            axios.put('/moments', {date: self.item.date, content: e.target.value}).then(d => {
              if (d.data.date === self.item.date) {
                self.editContent = false
                bus.$emit('reloadMoments')
                self.$message.success('Update Moments successfully')
              }
            }).catch(e => this.$message.error(e.message))
          } else {
            self.editContent = false
          }
        } else {
          if (self.item.images.length) {
            self.$msgbox({
              tittle: 'Delete Moments',
              message: 'This moments includes some images, confirm delete?',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              type: 'warning',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true
                  instance.confirmButtonText = 'deleting'
                  self.deleteMoments(self.item.date).then(d => {
                    self.editContent = false
                    instance.confirmButtonLoading = false
                    done()
                  })
                } else {
                  done()
                }
              }
            }).then(() => {
              self.$message.success('Delete Moments success.')
            }).catch(e => {
              console.log('cancel delete comments with images.')
            })
          } else {
            self.deleteMoments(self.item.date)
          }
        }
      },
      deleteMoments (date) {
        const self = this
        return axios.delete('./moments', {params: {date}})
          .then(d => {
            if (d.data) {
              self.$message.success('Delete Moments success.')
            } else {
              return Promise.reject({message: 'delete moments error:, no matched Moments.'})
            }
            bus.$emit('reloadMoments')
            bus.$emit('reloadSummary')
            return 'done'
          })
          .catch(e => this.$message.error(e.message))
      },
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

  #contentInput {
    padding: 5px;
    outline: none;
    border-radius: 3px;
    border: 1px solid #ddd;
    font-size: 20px;
    max-width: 100%;
  }
</style>

<style>

  #content > p {
    margin: 0;
  }
</style>
