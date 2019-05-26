<template>

</template>
<script>

import axios from 'axios'
import dayjs from 'dayjs'
import constData from '@/util/constData' // 保存的常量

export default {
  data () {
    return {

    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData() {
      axios.get('http://10.202.5.9:5123/datacenter/structure', {
        params: {
          type: 'category'
        }
      }).then((res) => {
        console.log('测试事件查询：', res.data.data)
      })
    }
  }
}
</script>

<style lang="less">

</style>

