<template>
  <div style="width:100%;">
    <!-- <p>保险柜</p> -->
    <!-- <violations></violations> -->
    <yong-du :selectedData="selectedData"></yong-du>
    <service-cars :selectedData="selectedData"></service-cars>
    <refuel-overview-event-pie :selectedData="selectedData"></refuel-overview-event-pie>
  </div>
</template>

<script>
/*
保险柜图表统计总设计页面
1.  违规次数 violations.vue
    总的违规次数，各事件违规次数，事件包括：['开启保险柜', '关闭保险柜', '保险柜打开', '开启钱箱']

*/
import axios from 'axios'
import dayjs from 'dayjs'
import constData from '@/util/constData' // 保存的常量

// import Violations from './violations'
import YongDu from './yongdu'
import ServiceCars from './serviceCars'
import RefuelOverviewEventPie from './refuelOverviewEventPie'

export default {
  components: {
    // Violations
    YongDu,
    ServiceCars,
    RefuelOverviewEventPie
  },
  props: {
    // 选择的站点名称
    selectedData: {
      type: Object,
      default: () => new Object({station: 'xiwan'})
    }
  },
  data () {
    return {

    }
  },
  created () {
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less">

</style>

