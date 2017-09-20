<template>
  <div>
    <div v-if="!errorText">
      <p id="location">您现在的位置：{{WData.results[0].location.name}}</p>
      <el-row style="text-align: center">
        <el-col :span="8" v-for="(item, index) in WData.results[0].daily" :key="item.date" :style="index < WData.results[0].daily.length - 1 ? 'border-right: 1px solid #999' : ''">
          <el-card :body-style="{ padding: '0px', border: 'none'}">
            <div>
              <div class="bottom clearfix">
                <div>
                  <img width="30" :src="getIcons(item.code_day)"> ~
                  <img width="30" :src="getIcons(item.code_night)">
                </div>
                <div>
                  <span>{{item.low}} ~ {{ item.high }}</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-alert
      v-if="errorText"
      title="Load weather failed"
      type="error"
      :closable="false"
      :description="errorText">
    </el-alert>
  </div>
</template>
<script>
  import axios from 'axios'
  import bus from './common/EventBus'

  export default {
    name: 'Weather',
    data () {
      return {
        WData: {'results': [{'location': {}, 'daily': [],}]},
        errorText: ''
      }
    },
    mounted () {
      axios.get('/getWeather').then(d => {
        this.WData = d.data
        bus.$emit('todayWeather', {...d.data.results[0].daily[0], location: d.data.results[0].location.name})
      }).catch(e => this.errorText = e.message)
    },
    methods: {
      getIcons: function (name) {
        return require('../assets/weatherIcons/' + name + '.png')
      }
    }
  }
</script>

<style scoped>
  #location {
    border-bottom: 1px dotted #999;
    margin-bottom: 0;
  }
  img {
    vertical-align: middle;
    border: none;
  }

  .el-row {
    border: none;
  }
  .el-card {
    border: none
  }
</style>
