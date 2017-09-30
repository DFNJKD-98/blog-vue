<template>

  <el-card :body-style="{ padding: '0px' }">
    <div style="padding: 5px">
      Tags:
      <span v-if="!errorText">
        <span class="tag gray" :class="defaultFilter === item.name ? 'isActive' : ''" @click="handleClick(item.name)" ref="tags" v-for="item in summaryData" :key="item.name">
          {{item.name}} - {{item.count}}
        </span>
    </span>
    </div>

    <el-alert
      v-if="errorText"
      title="load summary failed."
      type="error"
      :closable="false"
      :description="errorText">
    </el-alert>
    <Weather id="weather"></Weather>
  </el-card>
</template>

<script>
  import axios from 'axios'
  import Weather from './Weather'

  export default {
    name: 'Conclusion',
    components: {
      Weather
    },
    props: {
      defaultFilter: {
        type: String,
        require: true
      },
      filter: {
        type: Function,
        require: true,
      },
      summary: {
        type: Object,
        require: true,
      },
      errorText: String
    },
    computed: {
      summaryData: function () {
        return Object.keys(this.summary).reverse().map(k => ({
          name: k,
          count: this.summary[k]
        }))
      }
    },
    methods: {
      handleClick (tag) {
        const allTags = this.$refs.tags
        if (allTags.length) {
          allTags.forEach(el => {
            if (el.innerHTML.split('-')[0].trim() === tag) {
              el.classList.add('isActive')
            } else {
              el.classList.remove('isActive')
            }
          })
          this.filter(tag)
        }
      }
    },
  }
</script>
<style scoped>

  .tag {
    background-color: #8391a5;
    display: inline-block;
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    white-space: nowrap;
    margin-left: 10px;
    margin-bottom: 5px;
    cursor: pointer;
    user-select: none;
  }

  .tag.gray {
    background-color: #e4e8f1;
    border-color: #e4e8f1;
    color: #48576a;
  }

  .tag.gray.isActive {
    background-color: #8391a5;
  }
  @media (max-width: 992px) {
    #weather {
      display: none;
    }
  }
</style>
