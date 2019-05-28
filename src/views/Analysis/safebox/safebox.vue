<template>
  <div style="width:100%;">
    <!-- <p>保险柜</p> -->
    <violations
      :title="todayViolationsData.title"
      :xAxisData="todayViolationsData.xAxisData"
      :legendData="todayViolationsData.legendData"
      :seriesData="[...todayViolationsData.seriesData]"
      >
    </violations>
  </div>
</template>

<script>
/*
保险柜图表统计总设计页面
1.违规次数 violations.vue
  总的违规次数，各事件违规次数，事件包括：['开启保险柜', '关闭保险柜', '保险柜打开', '开启钱箱']
*/
import axios from 'axios'
import dayjs from 'dayjs'
import constData from '@/util/constData' // 保存的常量

import Violations from './violations'

export default {
  components: {
    Violations
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
      today_start: '', // 今天的开始时间
      today_end: '', // 截止到现在的时间点
      // 需要传递的数据
      todayViolationsData: {
        title: '财务违规操作统计',
        tooltip:{},
        legendData: ['开启保险柜', '关闭保险柜', '保险柜打开', '开启钱箱'],
        xAxisData: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"],
        seriesData: [
          { name: '开启保险柜', data: [], type: 'line', areaStyle: {} },
          { name: '关闭保险柜', data: [], type: 'line', areaStyle: {} },
          { name: '保险柜打开', data: [], type: 'line', areaStyle: {} },
          { name: '开启钱箱', data: [], type: 'line', areaStyle: {} },
          {
            name: '事件占比',
            type: 'pie',
            center: ['55%', '36%'],
            radius: '25%',
            z: 100,
            label: {
              normal: {
                show: true,
                formatter: "{b}\n{c}次 ({d}%)",
                textStyle: {
                  fontSize: 16
                }
              }
            },
            data: [{ value: 0, name: '开启保险柜' ,tooltip: {trigger: 'item',formatter: "{a} <br/>{b} : {c} ({d}%)"},textStyle:{fontSize:14} },
                  { value: 0, name: '关闭保险柜' ,tooltip: {trigger: 'item',formatter: "{a} <br/>{b} : {c} ({d}%)"},textStyle:{fontSize:14} },
                  { value: 0, name: '保险柜打开' ,tooltip: {trigger: 'item',formatter: "{a} <br/>{b} : {c} ({d}%)"},textStyle:{fontSize:14} },
                  { value: 0, name: '开启钱箱' ,tooltip: {trigger: 'item',formatter: "{a} <br/>{b} : {c} ({d}%)"},textStyle:{fontSize:14} }],
          }
        ]
      },
    }
  },
  watch: {
    selectedData: {
      deep: true,
      handler (value) {
        console.log('保险柜深度检测……………………………%%%%%%%%%%%%………………………………………s新的值：', value)
        this.getViolationsData(this.groupType, this.today_start, this.today_end, value.station, constData.categoryData)
      }
    }
  },
  created () {
    // 今日实时数据
    this.today_start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.today_end = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getViolationsData(this.groupType, this.today_start, this.today_end, this.selectedData.station, 'safebox')
  },
  methods: {
    // 获取当天保险柜违规数据
    getViolationsData(groupType, start_time, end_time, station, category, action=['开启保险柜','关闭保险柜','保险柜打开','开启钱箱']) {
      // 初始化坐标轴数据为空
      for(let i=0; i<action.length; i++){
        // 1. 需要修改添加的数据
        this.todayViolationsData.seriesData[i].data = []
      }
      console.log('查询新的数据：getViolationsData', start_time, end_time, station, action)
      // 当前小时时间点
      // let nowHour = Number(end_time.slice(11, 13))
      axios.get('http://10.202.5.9:5123/datacenter/statistic', {
        params: {
          strict: 1, // 严格模式
          group: groupType,
          start_time: start_time,
          end_time: end_time,
          station: station,
          status: '违规',
          category: category,
          actions: action.join(',')
        }
      }).then((res) => {
        console.log('单保险柜违规事件查询：', res.data.data.actions)

        let actions = res.data.data.actions

        action.forEach((element, index) => {

          let actionGroupData = actions[element]['group']
          let actionTotalData = actions[element]['total']
          // console.log(element, index, actionTotalData)

          for(let i in actionGroupData){
            // 2. 需要修改添加的数据
            this.todayViolationsData.seriesData[index].data.push(actionGroupData[i])
            this.todayViolationsData.seriesData[action.length].data[index].value = actionTotalData
          }
        })
      })
    }
  }
}
</script>

<style lang="less">

</style>

