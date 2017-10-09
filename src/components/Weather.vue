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
                  <img width="30" :src="host + '/img/assets/weatherIcons/' + item.code_day + '.png'"> ~
                  <img width="30" :src="host + '/img/assets/weatherIcons/' + item.code_night + '.png'">
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
        errorText: '',
        host: process.env.APIUrlPrefix
      }
    },
    mounted () {
      axios.get('/weather').then(d => {
        this.WData = d.data
        const todayWeather = {
          location: d.data.results[0].location.name,
          'code_day': d.data.results[0].daily[0]['code_day'],
          'code_night': d.data.results[0].daily[0]['code_night'],
          'high': d.data.results[0].daily[0]['high'],
          'low': d.data.results[0].daily[0]['low'],
          'text_day': d.data.results[0].daily[0]['text_day'],
          'text_night': d.data.results[0].daily[0]['text_night']
        }
        bus.$emit('todayWeather', todayWeather)
      }).catch(e => this.errorText = e.message)
    },
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
