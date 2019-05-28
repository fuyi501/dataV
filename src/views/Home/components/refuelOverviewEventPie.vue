<template>
  <chart-pie
    :text="pieData.title"
    :legendData="pieData.legendData"
    :seriesData="pieData.seriesData"
    legendOrient="horizontal">
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
  data () {
    return {
      today_start: '',
      today_end: '',
      stationData: ['xiwan', 'ximen', 'mingdemen'],
      pieData: {
        title: '加油区全景事件分布',
        legendData: ['西万路加油站', '西门加油站', '明德门加油站'],
        seriesData: [
          { value: 335, name: '西万路加油站' },
          { value: 310, name: '西门加油站' },
          { value: 234, name: '明德门加油站' }
        ]
      },
    }
  },
  created () {
    // 今日实时数据
    this.today_start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.today_end = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getTodayData(this.today_start, this.today_end, this.stationData, 'refuel_overview')
  },
  mounted () {

  },
  methods: {
    getTodayData(start_time, end_time, station=[], category) {
      console.log('饼图：', start_time, end_time, station)
      let nowHour = Number(end_time.slice(11, 13))
      let apiList = station.map((ele) => {
        return  axios.get('http://10.202.5.9:5123/datacenter/statistic', {
                  params: {
                    group: 'hour',
                    start_time: start_time,
                    end_time: end_time,
                    station: ele,
                    category: category,
                    // status: '违规'
                  }
                })
      })
      // console.log('apiList: ', apiList)
      axios.all(apiList)
        .then(axios.spread((...res) => {
          console.log('能输出吗：', [...res])
          let resData = [...res]
          for(let i=0; i<station.length; i++){
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

