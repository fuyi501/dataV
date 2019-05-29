<template>
  <div style="width:100%;">
    <jam
      :axisDataList="axisDataList"
      :jamIndex="jamIndex">
    </jam>

    <service-cars
      :axisDataList="axisDataList"
      :serviceCarsData="serviceCarsData"
      :serviceTimeData="serviceTimeData">
    </service-cars>

    <refuel-time
      :axisDataList="axisDataList"
      :jamIndex="jamIndex"></refuel-time>
  </div>
</template>

<script>
/*
加油区图表统计总设计页面
*/
import constData from '@/util/constData' // 保存的常量
import axios from 'axios'
import dayjs from 'dayjs'

import Jam from './jam'
import ServiceCars from './serviceCars'
import RefuelTime from './refuelTime'

export default {
  components: {
    Jam,
    ServiceCars,
    RefuelTime
  },
  props: {
    // 选择的站点名称
    selectedData: {
      type: Object,
      default: () => new Object({station: 'xiwan', dateTime: 'today'})
    }
  },
  data () {
    return {
      groupType: 'hour', // 查询类型
      startTime: '', // 开始时间
      endTime: '', // 结束时间

      // x 轴的数据
      axisDataList: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], // x 轴的类目

      jamIndex: [], // 拥堵指数

      serviceCarsData: [],
      serviceTimeData: []
    }
  },
  watch: {
    selectedData: {
      deep: true,
      handler (value) {
        if(this.selectedData.dateTime === 'today') {
          console.log('查询当天的数据')
          // 初始化数据
          this.axisDataList = []
          this.jamIndex = []
          this.serviceCarsData = []
          this.serviceTimeData = []

          this.groupType = 'hour' // 按小时查询
          this.axisDataList = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
          this.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

          this.getJamData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station)
          this.getServiceCarsData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'refuel')

        }else if(this.selectedData.dateTime === 'week') {
          console.log('查询近一周的数据')
          this.axisDataList = []
          this.jamIndex = []
          this.serviceCarsData = []
          this.serviceTimeData = []

          this.groupType = 'day' // 按天查询
          this.startTime = dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          for(let i=7; i>0; i--) {
            this.axisDataList.push(dayjs().subtract(i, 'day').startOf('day').format('MM-DD'))
          }
          // console.log('查询近一周的数据:', this.startTime, this.endTime, this.axisDataList)
          this.getJamData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station)
          this.getServiceCarsData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'refuel')

        }
      }
    }
  },
  created () {
    // 加载页面时默认查询当天实时数据

    this.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    this.getJamData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station)
    this.getServiceCarsData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'refuel')

  },
  mounted () {

  },
  methods: {
    // 获取当天加油区服务车辆，服务时间
    getJamData(groupType, interval, start_time, end_time, station) {
      axios.get('http://10.202.5.9:5123/datacenter/ci/history', {
        params: {
          group: groupType,
          interval,
          start_time,
          end_time,
          station
        }
      }).then((res) => {
        console.log('加油区拥堵指数：', res.data.data)
        let resData = res.data.data
        let resDataGroup = resData[4]

        for(let i in resDataGroup) {
          // console.log(resDataGroup[i])
          this.jamIndex.push((resDataGroup[i]*5).toFixed(2))
        }

      })
    },
    // 获取当天加油区服务车辆，服务时间
    getServiceCarsData(groupType, interval, start_time, end_time, station, category) {
      console.log('getServiceCarsData', start_time, end_time, station, category)

      axios.get('http://10.202.5.9:5123/datacenter/service/statistic', {
        params: {
          group: groupType,
          interval,
          start_time,
          end_time,
          station,
          category,
          channel: '4'
        }
      }).then((res) => {
        console.log('加油区服务车辆查询：', res.data.data)
        let resData = res.data.data
        let resDataGroup = resData.count_group

        for(let i in resDataGroup) {
          // console.log(resDataGroup[i])
          this.serviceCarsData.push(resDataGroup[i].total_num)
          this.serviceTimeData.push((resDataGroup[i].average_time/60).toFixed(2))
        }

      })
    }
  }
}
</script>

<style lang="less">

</style>

