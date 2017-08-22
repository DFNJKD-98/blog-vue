<template>
  <div>

  </div>
</template>
<script>
  import axios from 'axios'
  import ListItem from './ListItem'

  export default {
    name: 'SList',
    data () {
      return {
        editContent: false,
        filter: 'all',
        timeMark: 0,
        shuoshuoList: [],
        host: process.env.APIUrlPrefix
      }
    },
    components: {
      ListItem
    },
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
    methods: {
      parseMD2DOM (md) {
//        console.log(md)
      },
      doneEdit (e) {
        const value = e.target.value.trim()
//        if (!value) {
//          delete
//        }
      },
      deleteShuoshuo () {

      },
      cancelEdit () {

      },
      getIcons: function (name) {
        return require('../../assets/weatherIcons/' + name + '.png')
      }
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
//        console.log(res)
        }).catch(e => console.error(e))
      }
    }
  }
</script>
<style scoped>
  ul {
    margin: 0;
  }
</style>
<style>
  .el-card__body {
    padding: 0;
  }
</style>
