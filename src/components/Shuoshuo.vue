<template>
  <div>
    <!--<Weather></Weather>-->
    <InputFrame></InputFrame>
    <hr>
    <SList></SList>
  </div>
</template>

<script>
//  import Weather from './Weather'
  import InputFrame from './Inputer'
  import SList from './SList'
  export default {
    name: 'Shuoshuo',
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
