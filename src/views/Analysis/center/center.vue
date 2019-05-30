<template>
  <div >
    <my-info-card
      :infoCardData="infoCardData">
    </my-info-card>

    <!-- 今日违规事件总体统计 -->
    <div class="charts-border">
      <today-data-line
        :violateData="violateData">
      </today-data-line>
    </div>

    <!-- 保险柜数据 和 卸油口 数据 -->
    <div class="charts-border" style="margin-top:10px;text-align:center;">
      <unload-count
        :countData="countData">
      </unload-count>
    </div>

    <event-table
      :eventTableData="eventTableData">
    </event-table>

  </div>
</template>

<script>
/*
中间图表统计总设计页面
*/
import constData from '@/util/constData' // 保存的常量
import axios from 'axios'
import dayjs from 'dayjs'

// 页面组件
import MyInfoCard from './myInfoCard'
import TodayDataLine from './todayDataLine.vue'
import UnloadCount from './unloadCount'
import EventTable from './eventTable'

export default {
  components: {
    TodayDataLine,
    MyInfoCard,
    UnloadCount,
    EventTable
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

      // 卡片数据
      infoCardData: [
        { title: '本站服务总评分', icon: 'ios-browsers', count: 100, leftColor: '#9A66E4', rightColor: '#9A66E4' },
        { title: '加油区服务评分', icon: 'md-information-circle', count: 100, leftColor: '#E46CBB', rightColor: '#E46CBB' },
        { title: '收银台服务评分', icon: 'md-bug', count: 100, leftColor: '#ed3f14', rightColor: '#ed3f14' },
        { title: '加油区服务车辆总数', icon: 'md-locate', count: 500, leftColor: '#19be6b', rightColor: '#19be6b' },
        { title: '收银台服务总人数', icon: 'md-chatbubbles', count: 2000, leftColor: '#2d8cf0', rightColor: '#2d8cf0' },
        { title: '加油区平均服务时间', icon: 'md-help-circle', count: 4, leftColor: '#ff9900', rightColor: '#ff9900' }
      ],

      violateData: {
        title: '今日违规操作统计量',
        legendData: ['收银台', '加油区', '保险柜', '卸油口'],
        xAxisData: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        seriesDataCheckout: [],
        seriesDataRefuel: [],
        seriesDataSafebox: [],
        seriesDataUnload: []
      },

      countData: [ // 违规事件分布
        { title: '卸油次数', value: '0 次'},
        { title: '卸油违规率', value: '0 %'},
        { title: '保险柜打开次数', value: '0 次'},
        { title: '钱箱打开次数', value: '1 次'}
      ],
      eventTableData: [] // 表格数据
    }
  },
  watch: {
    selectedData: {
      deep: true,
      handler (value) {
        if(this.selectedData.dateTime === 'today') {
          // 初始化为空
          this.violateData.seriesDataCheckout = []
          this.violateData.seriesDataRefuel = []
          this.violateData.seriesDataSafebox = []
          this.violateData.seriesDataUnload = []
          this.eventTableData = []

          this.groupType = 'hour' // 按小时查询
          this.violateData.xAxisData = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
          this.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

          this.getCountData(this.groupType, this.startTime, this.endTime, this.selectedData.station, ['开启保险柜','开启钱箱','油罐车到达'])
          this.getViolateData(this.groupType, this.startTime, this.endTime, this.selectedData.station, constData.categoryData)
          this.getInfoCardData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station)
          this.getEventsData(this.groupType, this.startTime, this.endTime, this.selectedData.station, constData.actionsData)

        }else if(this.selectedData.dateTime === 'week'){

          // 初始化为空
          this.violateData.seriesDataCheckout = []
          this.violateData.seriesDataRefuel = []
          this.violateData.seriesDataSafebox = []
          this.violateData.seriesDataUnload = []
          this.violateData.xAxisData = []
          this.eventTableData = []

          this.groupType = 'day' // 按天查询
          this.startTime = dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          for(let i=7; i>0; i--) {
            this.violateData.xAxisData.push(dayjs().subtract(i, 'day').startOf('day').format('MM-DD'))
          }

          this.getCountData(this.groupType, this.startTime, this.endTime, this.selectedData.station, ['开启保险柜','开启钱箱','油罐车到达'])
          this.getViolateData(this.groupType, this.startTime, this.endTime, this.selectedData.station, constData.categoryData)
          this.getInfoCardData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station)
          // 不查表格数据
          // this.getEventsData(this.groupType, this.startTime, this.endTime, this.selectedData.station, constData.actionsData)

        }else if(this.selectedData.dateTime === 'month'){

          // 初始化为空
          this.violateData.seriesDataCheckout = []
          this.violateData.seriesDataRefuel = []
          this.violateData.seriesDataSafebox = []
          this.violateData.seriesDataUnload = []
          this.violateData.xAxisData = []
          this.eventTableData = []

          this.groupType = 'day' // 按天查询
          this.startTime = dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss')
          this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
          for(let i=Number(dayjs().format('DD'))-1; i>0; i--) {
            this.violateData.xAxisData.push(dayjs().subtract(i, 'day').startOf('day').format('MM-DD'))
          }

          this.getCountData(this.groupType, this.startTime, this.endTime, this.selectedData.station, ['开启保险柜','开启钱箱','油罐车到达'])
          this.getViolateData(this.groupType, this.startTime, this.endTime, this.selectedData.station, constData.categoryData)
          this.getInfoCardData(this.groupType, '1', this.startTime, this.endTime, this.selectedData.station)
          // 不查表格数据
          // this.getEventsData(this.groupType, this.startTime, this.endTime, this.selectedData.station, constData.actionsData)

        }
      }
    }
  },
  created () {

    // this.infoCardData[0].title = constData.stationList2[this.selectedData.station] + this.infoCardData[0].title
    // 默认查询当天数据
    this.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

    this.getCountData(this.groupType, this.startTime, this.endTime, this.selectedData.station, ['开启保险柜','开启钱箱','油罐车到达'])
    this.getViolateData(this.groupType, this.startTime, this.endTime, this.selectedData.station, constData.categoryData)
    this.getInfoCardData('hour', '1', this.startTime, this.endTime, this.selectedData.station)

    // this.startTime = dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    // this.endTime = dayjs().add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    // console.log(this.startTime, this.endTime)
    this.getEventsData('hour', this.startTime, this.endTime, this.selectedData.station, constData.actionsData)

  },
  methods: {
    // 获取卡片数据
    getInfoCardData(groupType, interval, start_time, end_time, station) {
      // console.log('getInfoCardData', start_time, end_time, station, category)

      // 站点评分
      let stationIndex = axios.get('http://10.202.5.9:5123/datacenter/composite_index/now', {
        params: {
          station: station
        }
      })
      // 加油区服务总车辆，平均服务时间
      let refuelInfo = axios.get('http://10.202.5.9:5123/datacenter/service/statistic', {
        params: {
          group: groupType,
          interval,
          start_time,
          end_time,
          station,
          category: 'refuel',
          channel: '4'
        }
      })

      // 收银台服务总人数
      let checkoutInfo = axios.get('http://10.202.5.9:5123/datacenter/service/statistic', {
        params: {
          group: groupType,
          interval,
          start_time,
          end_time,
          station,
          category: 'checkout'
        }
      })

      // // console.log('apiList: ', apiList)
      axios.all([stationIndex, refuelInfo, checkoutInfo])
        .then(axios.spread((stationIndexRes, refuelInfoRes, checkoutInfoRes) => {
          // console.log('中间卡片信息：', stationIndexRes, refuelInfoRes, checkoutInfoRes)

          this.infoCardData[0].count = stationIndexRes.data.data[station].score
          this.infoCardData[1].count = stationIndexRes.data.data[station].details['refuel']
          this.infoCardData[2].count = stationIndexRes.data.data[station].details['checkout']

          this.infoCardData[3].count = refuelInfoRes.data.data.count_all
          this.infoCardData[4].count = checkoutInfoRes.data.data.count_all
          this.infoCardData[5].count = refuelInfoRes.data.data.average_all/60
        }))
    },
    // 获取加油站各场景违规事件，categorys 是一个数组
    getViolateData(groupType, start_time, end_time, station, categorys=[]) {
      console.log('getViolateData', start_time, end_time, station, categorys)
      axios.get('http://10.202.5.9:5123/datacenter/statistic', {
        params: {
          strict: 1, // 严格模式
          group: groupType,
          start_time: start_time,
          end_time: end_time,
          station: station,
          categorys: categorys.join(',')
        }
      }).then((res) => {
        console.log('违规事件：', res)
        let violateRes = res.data.data.categorys

        let checkoutData = violateRes['checkout'].group
        let refuel_sideData = violateRes['refuel_side'].group
        let safeboxData = violateRes['safebox'].group
        let unloadData = violateRes['unload'].group

        for(let i in checkoutData){
          this.violateData.seriesDataCheckout.push(checkoutData[i])
          this.violateData.seriesDataRefuel.push(refuel_sideData[i])
          this.violateData.seriesDataSafebox.push(safeboxData[i])
          this.violateData.seriesDataUnload.push(unloadData[i])
        }
        console.log(this.violateData)
      })
    },
    // 获取卸油次数，卸油违规率，保险柜打开次数，钱箱打开次数
    getCountData(groupType, start_time, end_time, station, actions=[]) {
      // console.log('获取卸油次数，卸油违规率，保险柜打开次数，钱箱打开次数：', start_time, end_time, station, action)
      axios.get('http://10.202.5.9:5123/datacenter/statistic', {
        params: {
          strict: 1, // 严格模式
          group: groupType,
          start_time: start_time,
          end_time: end_time,
          station: station,
          actions: actions.join(',')
        }
      }).then((res) => {
        // console.log('获取卸油次数，卸油违规率，保险柜打开次数，钱箱打开次数查询：', res.data.data)
        let actionsRes = res.data.data.actions
        this.countData[2].value = actionsRes['开启保险柜']['total'] + ' 次' // 保险柜
        this.countData[3].value = actionsRes['开启钱箱']['total'] + ' 次' // 钱箱
        this.countData[0].value = actionsRes['油罐车到达']['total'] + ' 次' // 卸油次数
      })

      // 查询卸油口违规率
      axios.get('http://10.202.5.9:5123/datacenter/violate/now', {
        params: {
          station,
          category: 'refuel'
        }
      }).then((res) => {
        console.log('加油区违规率：', res)
        let sum = 0 // 总的违规率
        let index = 0 // 有多少个加油岛
        for(let i in res.data.data[station]) {
          sum += res.data.data[station][i]*100
          index++
        }
        console.log(sum, index)
        this.countData[1].value = (sum/index).toFixed(2) + ' %'
      })
    },
    // 获取表格数据
    getEventsData(groupType, start_time, end_time, station, actions=[]){
      axios.get('http://10.202.5.9:5123/datacenter/statistic', {
        params: {
          strict: 1, // 严格模式
          group: groupType,
          start_time: start_time,
          end_time: end_time,
          station: station,
          actions: actions.join(',')
        }
      }).then((res) => {
        console.log('获取所有表格数据：', res.data.data)
        let actionsRes = res.data.data.actions
        this.eventTableData = actions.map((element, index) => {
          let todayCount = actionsRes[element]['group'][start_time]
          let yestodayCount = actionsRes[element]['group'][dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')]
          let decreaseCount = yestodayCount - todayCount
          return {
            eventName: element,
            todayCount,
            yestodayCount,
            decreaseCount,
            score: -2
          }
        })
        this.eventTableData = this.eventTableData.sort((a,b) => b.todayCount - a.todayCount)
        console.log('this.table:', this.eventTableData)
      })
    }

  }
}
</script>

<style lang="less">
.countSum {
  display: inline-block;
  padding: 0.75rem;
  margin: 0.75rem 0.75rem;
  color: #20D1D2;
  height: 70px;
  vertical-align: middle;
  border: 1px solid #1081B2;
  border-radius: 4px;
}
.countTitle {
  font-size: 1.4rem;
  height: 18px;
  line-height: 18px;
  color: #fff;
}
.countContent {
  font-size: 2.2rem;
  height: 3rem;
  line-height: 3rem;
}
</style>


