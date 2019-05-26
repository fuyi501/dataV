<template>
  <chart-pie
    :text="pieData.title"
    pieHeight="800px"
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
      unloadAcion: [
        // 卸油口
        "卸油口开启",
        "接油管操作",
        "油罐车到达",
        "油罐车离开",
        "卸油口关闭",
        "断开静电夹",
        "连接静电夹",
        "员工离开",
        "存在灭火器",
        "油井巡检", // 卸油口
        "水溶法检测操作", // 卸油口
        "卸油口巡检",
        "已放置消防器材",
        "胶管乱摆放", //
        "非法入侵", // 卸油口
      ],
      pieData: {
        title: '今日卸油口事件分布',
        legendData: this.unloadAcion,
        seriesData: [
          { value: 335, name: '卸油口开启' },
          { value: 310, name: '接油管操作' },
          { value: 234, name: '油罐车到达' },
          { value: 310, name: '油罐车离开' },
          { value: 234, name: '卸油口关闭' },
          { value: 310, name: '断开静电夹' },
          { value: 234, name: '员工离开' },
          { value: 310, name: '存在灭火器' },
          { value: 234, name: '油井巡检' },
          { value: 310, name: '水溶法检测操作' },
          { value: 234, name: '卸油口巡检' },
          { value: 234, name: '已放置消防器材' },
          { value: 234, name: '胶管乱摆放' },
          { value: 234, name: '非法入侵' }
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
    this.getTodayData(this.today_start, this.today_end, this.selectedStation.station, 'unload', this.unloadAcion)
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

