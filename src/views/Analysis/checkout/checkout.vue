<template>
  <div class="charts-border">
    <!-- <violations></violations> -->
    <checkout-count
      :countData="countData"
      countWidth="9rem">
    </checkout-count>

    <service
      :servicePersonsData="servicePersonsData"
      :avgServiceTimeData="avgServiceTimeData"
      :axisDataList="axisDataList">
    </service>

    <persons-count
      :servicePersonsData="servicePersonsData"
      :enterPersonsData="enterPersonsData"
      :axisDataList="axisDataList">
    </persons-count>

    <OnlineRate
      :onlineRateData="onlineRateData"
      :axisDataList="onlineAxisData">
    </OnlineRate>
  </div>
</template>

<script>
/*
收银台图表统计总设计页面
*/
import constData from '@/util/constData' // 保存的常量
import axios from 'axios'
import dayjs from 'dayjs'

import CheckoutCount from './checkoutCount'
import Service from './service'
import PersonsCount from './persons'
import OnlineRate from './onlineRate'
// import CheckoutEventPie from './checkoutEventPie'

export default {
  components: {
    CheckoutCount,
    Service,
    PersonsCount,
    OnlineRate
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
      groupType: 'hour', // 查询类型，按月，日，小时
      startTime: '', // 开始时间
      endTime: '', // 结束时间

      countData: [ // 违规事件分布
        { title: '服务总人数', value: '0 人'},
        { title: '累计服务总时间', value: '0 分钟'},
        { title: '平均服务时间', value: '0 分钟'},
        { title: '违规率', value: '10 %'}
      ],

      servicePersonsData: [], // 服务人数
      avgServiceTimeData: [], // 平均服务时间

      enterPersonsData: [], // 进店人数

      onlineAxisData: [], //站长在线率
      onlineRateData: [], //站长在线率数据

      checkoutAction: ['单手', '双手接递', '服务超时'],
      eventSeriesData: [ // 违规事件分布
        { value: 0, name: '单手' },
        { value: 0, name: '双手接递' },
        { value: 0, name: '服务超时' }
      ],

      axisDataList: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"] // x 轴的类目

    }
  },
  watch: {
    selectedData: {
      deep: true,
      handler (value) {
        // console.log('收银台新的值：', value)
        if(this.selectedData.dateTime === 'today') {
          // console.log('查询今天的数据')
          // 初始化数据
          this.servicePersonsData = []
          this.avgServiceTimeData = []
          this.enterPersonsData = []
          this.onlineRateData = []
          this.groupType = 'hour' // 按小时查询
          this.axisDataList = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
          this.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

          this.getCheckOutData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
          this.getPersonsData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
          // this.getEventData(this.groupType, this.startTime, this.endTime, this.selectedData.station, 'checkout', this.checkoutAction)

          let onlineStartTime = dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
          let onlineEndTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.getOnlineRate(onlineStartTime, onlineEndTime, this.selectedData.station)

        }else if(this.selectedData.dateTime === 'week') {
          // console.log('查询近一周的数据')
          this.servicePersonsData = []
          this.avgServiceTimeData = []
          this.enterPersonsData = []
          this.axisDataList = []
          this.onlineRateData = []

          this.groupType = 'day' // 按天查询
          this.startTime = dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          for(let i=7; i>0; i--) {
            this.axisDataList.push(dayjs().subtract(i, 'day').startOf('day').format('MM-DD'))
          }
          // console.log('查询近一周的数据:', this.startTime, this.endTime, this.axisDataList)

          this.getCheckOutData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
          this.getPersonsData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
          // this.getEventData(this.groupType, this.startTime, this.endTime, this.selectedData.station, 'checkout', this.checkoutAction)

          this.getOnlineRate(this.startTime, this.endTime, this.selectedData.station)
        }else if(this.selectedData.dateTime === 'month') {
          // console.log('查询一个月的数据')
          this.servicePersonsData = []
          this.avgServiceTimeData = []
          this.enterPersonsData = []
          this.axisDataList = []
          this.onlineRateData = []
          this.groupType = 'day' // 按天查询
          this.startTime = dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
          for(let i=Number(dayjs().format('DD'))-1; i>0; i--) {
            this.axisDataList.push(dayjs().subtract(i, 'day').startOf('day').format('MM-DD'))
          }
          console.log('查询当月的数据:', this.startTime, this.endTime, this.axisDataList)

          this.getCheckOutData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
          this.getPersonsData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')

          let onlineStartTime = dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
          let onlineEndTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.getOnlineRate(onlineStartTime, onlineEndTime, this.selectedData.station)
        }
      }
    }
  },
  created () {

  },
  mounted () {
    // console.log('收银台数据：', this.selectedData)
    this.axisDataList = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
    this.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getCheckOutData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
    this.getPersonsData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
    this.getEventData(this.groupType, this.startTime, this.endTime, this.selectedData.station, 'checkout', this.checkoutAction)

    let onlineStartTime = dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    let onlineEndTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    for(let i=7; i>0; i--) {
      this.onlineAxisData.push(dayjs().subtract(i, 'day').startOf('day').format('MM-DD'))
    }
    this.getOnlineRate(onlineStartTime, onlineEndTime, this.selectedData.station)

  },
  methods: {
    // 获取收银台服务人数，服务时间，违规率
    getCheckOutData(groupType, interval, start_time, end_time, station, category) {
      axios.get('http://10.202.5.9:5123/datacenter/service/statistic', {
        params: {
          group: groupType,
          interval,
          start_time,
          end_time,
          station,
          category
        }
      }).then((res) => {
        console.log('收银台主页---------服务人数查询：', res)
        let checkoutResData = res.data.data
        this.countData[0].value = checkoutResData.count_all + ' 人'
        this.countData[1].value = Math.round(checkoutResData.time_all/60/60) + ' 小时' // 分钟
        this.countData[2].value = Math.round(checkoutResData.average_all/60) + ' 分钟' // 平均服务分钟

        // console.log('+++++++++++++', this.totalNum, this.totalTime, this.avgTime)

        let resData = res.data.data
        let resDataGroup = resData.count_group

        for(let i in resDataGroup) {
          // // console.log(resDataGroup[i])
          this.servicePersonsData.push(resDataGroup[i].total_num)
          this.avgServiceTimeData.push(resDataGroup[i].average_time)
        }
      })

      // 查询收银台违规率
      axios.get('http://10.202.5.9:5123/datacenter/violate/now', {
        params: {
          station,
          category
        }
      }).then((res) => {
        console.log('收银台违规率：', res)
        for(let i in res.data.data[station]) {
          this.countData[3].value = (res.data.data[station][i]*100).toFixed(2) + ' %'
        }
      })
    },
    // 获取进店人数
    getPersonsData(groupType, interval, start_time, end_time, station, category) {
      // console.log('getPersonsData', start_time, end_time, station, category)
      axios.get('http://10.202.5.9:5123/datacenter/customer/enter', {
        params: {
          group: groupType,
          interval,
          start_time,
          end_time,
          station
        }
      }).then((res) => {
        console.log('收银台进店人数', res)
          let enterResData = res.data.data.count_group
          for(let i in enterResData){
            this.enterPersonsData.push(enterResData[i])
          }
      })
    },
    // 获取收银台违规事件
    getEventData(groupType, start_time, end_time, station, category, action=[]) {
      // console.log('获取收银台违规事件：', start_time, end_time, station,category, action)
      let nowHour = Number(end_time.slice(11, 13))
      let apiList = action.map((ele) => {
        return  axios.get('http://10.202.5.9:5123/datacenter/statistic', {
                  params: {
                    group: groupType,
                    start_time: start_time,
                    end_time: end_time,
                    station: station,
                    category: category,
                    // status: '违规',
                    action: ele
                  }
                })
      })
      // // console.log('apiList: ', apiList)
      axios.all(apiList)
        .then(axios.spread((...res) => {
          // console.log('获取收银台违规事件结果：', [...res])
          let resData = [...res]
          for(let i=0; i<action.length; i++){
            this.eventSeriesData[i].value = resData[i].data.data.total
          }
          // console.log('获取收银台违规事件最后的数据：', this.eventSeriesData)
        }));
    },
    // 获取站长在线率
    getOnlineRate(start_time, end_time, station) {
      // console.log('getPersonsData', start_time, end_time, station, category)
      axios.get('http://10.202.5.9:5123/datacenter/manager_online/history', {
        params: {
          start_time,
          end_time,
          station
        }
      }).then((res) => {
        console.log('站长在线率', res)
        let onlineRate = res.data.data
        for(let i in onlineRate) {
          // console.log(onlineRate[i])
          this.onlineRateData.push(onlineRate[i].toFixed(2)*100)
        }
      })
    },
  }
}
</script>

<style lang="less">

</style>

