<template>
  <el-row>
    <el-col :span="8" v-for="(item, index) in this.WData.results[0].daily" :key="item.date">
      <el-card :body-style="{ padding: '0px'}">
        <!--<img src="../assets/weatherIcons/" class="image">-->
        <div style="padding: 8px;">
          <div class="bottom clearfix">
              <img width="30" :src="getIcons(item.code_day)"> ~
              <img width="30" :src="getIcons(item.code_night)">
              <span>{{item.low}} ~ {{ item.high }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'Weather',
    data () {
      return {
        WData: {
          'results': [
            {
            'location': {
              'id': 'WTW3SJ5ZBJUY',
              'name': '上海',
              'country': 'CN',
              'path': '上海,上海,中国',
              'timezone': 'Asia/Shanghai',
              'timezone_offset': '+08:00'
            },
            'daily': [{
              'date': '2017-08-11',
              'text_day': '阴',
              'code_day': '9',
              'text_night': '阴',
              'code_night': '9',
              'high': '36',
              'low': '28',
              'precip': '',
              'wind_direction': '东南',
              'wind_direction_degree': '135',
              'wind_speed': '10',
              'wind_scale': '2'
            }, {
              'date': '2017-08-12',
              'text_day': '阴',
              'code_day': '9',
              'text_night': '阴',
              'code_night': '9',
              'high': '33',
              'low': '28',
              'precip': '',
              'wind_direction': '北',
              'wind_direction_degree': '0',
              'wind_speed': '10',
              'wind_scale': '2'
            }, {
              'date': '2017-08-13',
              'text_day': '阴',
              'code_day': '9',
              'text_night': '阴',
              'code_night': '9',
              'high': '34',
              'low': '27',
              'precip': '',
              'wind_direction': '东北',
              'wind_direction_degree': '45',
              'wind_speed': '10',
              'wind_scale': '2'
            }],
            'last_update': '2017-08-11T11:00:00+08:00'
          }]
        },
        dayCN: ['今天', '明天', '后天']
      }
    },
    methods: {
      getIcons: function (name) {
        return require('../assets/weatherIcons/' + name + '.png')
      }
    }
//    computed: {
//      imagePath: function (name) { return require('../assets/' + name) }
//    }
  }
</script>

<style scoped>
  img {
    vertical-align: middle;
    border: none;
  }
  .el-row {
    border: none;
    padding: 0 5px;
  }
</style>
