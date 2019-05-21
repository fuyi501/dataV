<template>
  <chart-line
    :text="weekData.title"
    :xAxisData="weekData.xAxisData"
    :legendData="weekData.legendData"
    :seriesData="[...weekData.seriesData]"
    :boundaryGap="false"
    style="margin:0 auto;"
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
      pass7day: '',
      pass1day: '',
      dayList: [], // 过去7天日期
      weekData: {
        title: '过去一周违规操作量',
        legendData: ['加油区全景', '加油区', '收银台', '保险柜', '卸油口'],
        xAxisData: [],
        seriesData: [
          { name: '加油区全景', data: [], type: 'line' },
          { name: '加油区', data: [], type: 'line' },
          { name: '收银台', data: [], type: 'line' },
          { name: '保险柜', data: [], type: 'line' },
          { name: '卸油口', data: [], type: 'line' }
        ]
      }
    }
  },
  watch: {
    selectedStation: {
      deep: true,
      handler (value) {
        console.log('新的值：', value)
        this.getPass7DayData(this.pass7day, this.pass1day, this.selectedStation.station, constData.categoryData)
      }
    }
  },
  created () {
    // 过去七天数据
    let today = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.pass7day = dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.pass1day = dayjs().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss')

    for(let i = 7; i>0; i--) {
      this.dayList.push(dayjs().subtract(i, 'day').startOf('day').format('MM-DD'))
    }
    console.log(this.pass1day, this.pass7day, this.dayList)

    this.weekData.xAxisData = this.dayList
    this.getPass7DayData(this.pass7day, this.pass1day, this.selectedStation.station, constData.categoryData)
  },
  mounted () {

  },
  methods: {
    getPass7DayData(start_time, end_time, station, category=[]) {

      // 初始化坐标轴数据为空
      for(let i=0; i<category.length; i++){
        this.weekData.seriesData[i].data = []
      }

      let sDay = Number(start_time.slice(8, 10))
      let eDay = Number(end_time.slice(8, 10))
      console.log('getPass7DayData', sDay, eDay)
      let apiList = category.map((ele) => {
        return  axios.get('http://10.202.5.9:5123/datacenter/statistic', {
                  params: {
                    group: 'day',
                    start_time: start_time,
                    end_time: end_time,
                    station: station,
                    // status: '违规',
                    category: ele
                  }
                })
      })
      // console.log('apiList: ', apiList)
      axios.all(apiList)
        .then(axios.spread((...res) => {
          // console.log('getPass7DayData能输出吗：', [...res])
          let resData = [...res]
          for(let i=0; i<category.length; i++){
            for(let j=sDay; j<eDay+1; j++){
              this.weekData.seriesData[i].data.push(resData[i].data.data.groups[j])
            }
          }
          // console.log('最后的数据：', this.weekData.seriesData)
        }));
    }
  }
}
</script>

<style lang="less">

</style>

