<template>
  <chart-pie
    :text="pieData.title"
    :legendData="pieData.legendData"
    :seriesData="pieData.seriesData">
  </chart-pie>
</template>

<script>

import { ChartLine, ChartBar, ChartPie, ChartStackBar } from "@/components/charts" // 图表组件
import constData from '@/util/constData' // 保存的常量
// 工具
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  components: {
    ChartPie
  },
  props: {
    selectedStation: {
      type: Object
    }
  },
  data () {
    return {
      today_start: '',
      today_end: '',
      safeBoxAction: ['开启保险柜', '关闭保险柜', '保险柜打开', '开启钱箱'],
      pieData: {
        title: '今日收银台事件分布',
        legendData: ['开启保险柜', '关闭保险柜', '保险柜打开', '开启钱箱'],
        seriesData: [
          { value: 335, name: '开启保险柜' },
          { value: 110, name: '关闭保险柜' },
          { value: 234, name: '保险柜打开' },
          { value: 34, name: '开启钱箱' }
        ]
      },
    }
  },
  watch: {
    selectedStation: {
      deep: true,
      handler (value) {
        console.log('新的值：', value)
        // this.getPass7DayData(this.pass7day, this.pass1day, this.selectedStation.station, constData.categoryData)
      }
    }
  },
  created () {
    // 今日实时数据
    this.today_start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.today_end = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getTodayData(this.today_start, this.today_end, this.selectedStation.station, 'checkout', this.safeBoxAction)
  },
  mounted () {

  },
  methods: {
    getTodayData(start_time, end_time, station, category, action=[]) {
      console.log('饼图：', start_time, end_time, station)
      let nowHour = Number(end_time.slice(11, 13))
      let apiList = action.map((ele) => {
        return  axios.get('http://10.202.5.9:5123/datacenter/statistic', {
                  params: {
                    group: 'hour',
                    start_time: start_time,
                    end_time: end_time,
                    station: station,
                    category: category,
                    // status: '违规',
                    action: ele
                  }
                })
      })
      // console.log('apiList: ', apiList)
      axios.all(apiList)
        .then(axios.spread((...res) => {
          console.log('能输出吗：', [...res])
          let resData = [...res]
          for(let i=0; i<action.length; i++){
            this.pieData.seriesData[i].value = resData[i].data.data.total
          }
          console.log('最后的数据：', this.pieData.seriesData)
        }));
    }
  }
}
</script>

<style lang="less">

</style>

