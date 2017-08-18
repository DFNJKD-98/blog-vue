<template>
  <div>
    <!--<Weather></Weather>-->
    <InputFrame v-show="isLogin"></InputFrame>
    <hr v-show="isLogin">
    <SList :isLogin="isLogin" :needReload="needReload"></SList>
  </div>
</template>

<script>
  //  import Weather from './Weather'
  import InputFrame from './shuoshuoChild/Inputer'
  import SList from './shuoshuoChild/SList'

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
      SList
    },
    data () {
      return {
        msg: 'This is Shuoshuo'
      }
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
