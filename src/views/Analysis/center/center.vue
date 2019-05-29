<template>
  <div >
    <my-info-card :selectedData="selectedData"></my-info-card>
    <!-- 今日违规事件总体统计 -->
    <div class="charts-border">
      <today-data-line :selectedData="selectedData"></today-data-line>
    </div>
    <!-- 保险柜数据 和 卸油口 数据 -->
    <div class="charts-border" style="margin-top:10px;text-align:center;">
      <unload-count :countData="countData"></unload-count>
    </div>
    <event-table :eventTableData="eventTableData"></event-table>
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

        }else if(this.selectedData.dateTime === 'week'){

        }
      }
    }
  },
  created () {
    this.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getCountData(this.groupType, this.startTime, this.endTime, this.selectedData.station, ['开启保险柜','开启钱箱','油罐车到达'])

    // this.startTime = dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    // this.endTime = dayjs().add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    // console.log(this.startTime, this.endTime)
    // this.getEventsData('day', this.startTime, this.endTime, this.selectedData.station, constData.actionsData)

    this.getViolateData(this.startTime, this.endTime, this.selectedData.station, constData.categoryData)
  },
  methods: {
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
    },
    // 获取表格数据
    getEventsData(groupType, start_time, end_time, station, actions=[]){
      axios.get('http://10.202.5.9:5123/datacenter/statistic', {
        params: {
          strict: 1, // 严格模式
          group: 'day',
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
    },
    // 获取加油站各场景违规事件，categorys 是一个数组
    getViolateData(start_time, end_time, station, categorys=[]) {
      console.log('getViolateData', start_time, end_time, station, categorys)
      axios.get('http://10.202.5.9:5123/datacenter/statistic', {
        params: {
          strict: 1, // 严格模式
          group: 'hour',
          start_time: start_time,
          end_time: end_time,
          station: station,
          categorys: categorys.join(',')
        }
      }).then((res) => {
        console.log('违规事件：', res)
      })
    },
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


