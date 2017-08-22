<template>
  <div>
    <p>您现在的位置：{{WData.results[0].location.name}}</p>
    <el-row style="text-align: center">
      <el-col :span="8" v-for="(item, index) in WData.results[0].daily" :key="item.date" :style="index < WData.results[0].daily.length - 1 ? 'border-right: 1px solid #999' : ''">
        <el-card :body-style="{ padding: '0px', border: 'none'}">
          <!--<img src="../assets/weatherIcons/" class="image">-->
          <div>
            <div class="bottom clearfix">
              <img width="30" :src="getIcons(item.code_day)"> ~
              <img width="30" :src="getIcons(item.code_night)">
              <span>{{item.low}} ~ {{ item.high }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Weather',
    data () {
      return {
        WData: {'results': [{'location': {}, 'daily': [],}]},
        dayCN: ['今天', '明天', '后天']
      }
    },
    mounted () {
      axios.get('/getWeather').then(d => {
        this.WData = d.data
      }).catch(e => this.errorText = `[ ${e.statusCode} ] - ${e.statusText}`)
    },
    methods: {
      getIcons: function (name) {
        return require('../assets/weatherIcons/' + name + '.png')
      }
    }
  }
</script>

<style scoped>
  p {
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
</style>
