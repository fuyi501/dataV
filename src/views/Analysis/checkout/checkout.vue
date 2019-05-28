<template>
  <div class="charts-border">
    <!-- <violations></violations> -->
    <checkout-count
      :countData="countData"
      countWidth="120px">
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

    <checkout-event-pie
      :eventSeriesData="eventSeriesData">
    </checkout-event-pie>
  </div>
</template>

<script>
/*
收银台图表统计总设计页面
1.  违规次数 violations.vue
    总的违规次数，各事件违规次数，事件包括：['单手', '服务超时', '双手接递']

*/
import constData from '@/util/constData' // 保存的常量
import axios from 'axios'
import dayjs from 'dayjs'

// import Violations from './violations'
import CheckoutCount from './checkoutCount'
import Service from './service'
import PersonsCount from './persons'
import CheckoutEventPie from './checkoutEventPie'

export default {
  components: {
    // Violations,
    CheckoutCount,
    Service,
    PersonsCount,
    CheckoutEventPie
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
        { title: '服务总时间', value: '0 分钟'},
        { title: '平均服务时间', value: '0 分钟'},
        { title: '违规率', value: '10 %'}
      ],

      totalNum: 0, // 服务总人数
      totalTime: 0, // 服务总时间
      avgTime: 0, // 平均服务时间

      servicePersonsData: [], // 服务人数
      avgServiceTimeData: [], // 平均服务时间

      enterPersonsData: [], // 进店人数

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
          this.groupType = 'hour' // 按小时查询
          this.axisDataList = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
          this.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

          this.getCheckOutData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
          this.getPersonsData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
          this.getEventData(this.groupType, this.startTime, this.endTime, this.selectedData.station, 'checkout', this.checkoutAction)

        }else if(this.selectedData.dateTime === 'week') {
          // console.log('查询近一周的数据')
          this.servicePersonsData = []
          this.avgServiceTimeData = []
          this.enterPersonsData = []
          this.axisDataList = []
          this.groupType = 'day' // 按天查询
          this.startTime = dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          for(let i=7; i>0; i--) {
            this.axisDataList.push(dayjs().subtract(i, 'day').startOf('day').format('MM-DD'))
          }
          // console.log('查询近一周的数据:', this.startTime, this.endTime, this.axisDataList)

          this.getCheckOutData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
          this.getPersonsData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station, 'checkout')
          this.getEventData(this.groupType, this.startTime, this.endTime, this.selectedData.station, 'checkout', this.checkoutAction)
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
  },
  methods: {
    // 获取收银台服务人数，服务时间
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
        // console.log('收银台主页---------服务人数查询：', res)
        let checkoutResData = res.data.data
        this.totalNum = checkoutResData.count_all
        this.totalTime = Math.round(checkoutResData.time_all/60) // 分钟
        this.avgTime = checkoutResData.average_all

        // console.log('+++++++++++++', this.totalNum, this.totalTime, this.avgTime)

        let resData = res.data.data
        let resDataGroup = resData.count_group

        for(let i in resDataGroup) {
          // // console.log(resDataGroup[i])
          this.servicePersonsData.push(resDataGroup[i].total_num)
          this.avgServiceTimeData.push(resDataGroup[i].average_time)
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
        // console.log('进店人数', res)
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
    }
  }
}
</script>

<style lang="less">

</style>

