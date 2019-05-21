<template>
  <chart-line
    :text="todayData.title"
    :xAxisData="todayData.xAxisData"
    :legendData="todayData.legendData"
    :seriesData="[...todayData.seriesData]"
    style="margin:0 auto;" lineWidth="96%" lineHeight="420px"
    :boundaryGap="false"
  />
</template>
<script>

import { ChartLine, ChartBar, ChartPie } from "@/components/charts" // 图表组件
import constData from '@/util/constData' // 保存的常量
// 工具
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  components: {
    ChartLine
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
      stationData: ['xiwan', 'ximen', 'mingdemen'],
      todayData: {
        title: '今日违规操作统计量',
        legendData: ['西万路加油站', '西门加油站', '明德门加油站'],
        xAxisData: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"],
        seriesData: [
          { name: '西万路加油站', data: [], type: 'line', areaStyle: {} },
          { name: '西门加油站', data: [], type: 'line', areaStyle: {} },
          { name: '明德门加油站', data: [], type: 'line', areaStyle: {} }
        ]
      },
    }
  },
  created () {
    // 今日实时数据
    this.today_start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.today_end = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getTodayData(this.today_start, this.today_end, this.stationData)
  },
  mounted () {

  },
  methods: {
    getTodayData(start_time, end_time, station=[]) {
      // 初始化坐标轴数据为空
      for(let i=0; i<station.length; i++){
        this.todayData.seriesData[i].data = []
      }
      // console.log('getTodayData', start_time, end_time, station)
      let nowHour = Number(end_time.slice(11, 13))
      let apiList = station.map((ele) => {
        return  axios.get('http://10.202.5.9:5123/datacenter/statistic', {
                  params: {
                    group: 'hour',
                    start_time: start_time,
                    end_time: end_time,
                    station: ele,
                    // status: '违规'
                  }
                })
      })
      // console.log('apiList: ', apiList)
      axios.all(apiList)
        .then(axios.spread((...res) => {
          // console.log('能输出吗：', [...res])
          let resData = [...res]
          for(let i=0; i<station.length; i++){
            for(let j=0; j<nowHour; j++){
              this.todayData.seriesData[i].data.push(resData[i].data.data.groups[j])
            }
          }
          // console.log('最后的数据：', this.todayData.seriesData)
        }));
    },
  }
}
</script>

<style lang="less">

</style>

