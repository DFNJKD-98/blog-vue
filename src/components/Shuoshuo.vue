<template>
  <div>
    <InputFrame v-show="isLogin"></InputFrame>
    <hr v-show="isLogin">
    <div>
      <ListItem :needReload="needReload" :key="item.date" v-for="item in shuoshuoList" :isLogin="isLogin" :item="item"></ListItem>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import InputFrame from './shuoshuoChild/Inputer'
  import ListItem from './shuoshuoChild/ListItem'

  export default {
    name: 'Shuoshuo',
    props: {
      isLogin: {
        type: Boolean,
        required: true,
        default: false
      },
      needReload: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    components: {
//      Weather,
      InputFrame,
      ListItem
    },
    data () {
      return {
        shuoshuoList: [],
      }
    },
    mounted () {
      axios.get('/getShuoshuoList', {
        params: {
          limit: 20,
          filter: this.filter,
          timeMark: this.timeMark
        }
      }).then(res => {
        this.shuoshuoList = res.data
//        console.log(res)
      }).catch(e => console.error(e))
    },
    watch: {
      needReload () {
        axios.get('/getShuoshuoList', {
          params: {
            limit: 20,
            filter: this.filter,
            timeMark: this.timeMark
          }
        }).then(res => {
          this.shuoshuoList = res.data
        }).catch(e => console.error(e))
      }
    }
  }
</script>
<style>
  .el-card__body {
    padding: 0;
  }
</style>
