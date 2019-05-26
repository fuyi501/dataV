<template>
  <div style="height:350px;width:100%;margin-top:10px;">
    <v-chart
      :options="option"
      :autoresize="true"
      theme="chartsTheme"
    />
  </div>
</template>
<script>
/*
加油区服务人车辆，服务时间，平均服务时间
*/
import constData from '@/util/constData' // 保存的常量
// 工具
import axios from 'axios'
import dayjs from 'dayjs'

// 查询加油区实时服务车辆和服务时间
export default {
  components: {},
  props: {
    // 选择的站点名称
    selectedStation: {
      type: Object,
      default: () => new Object({station: 'xiwan'})
    }
  },
  data() {
    return {
      groupType: 'hour', // 查询类型
      today_start: '', // 今天的开始时间
      today_end: '', // 截止到现在的时间点
      option: {
        title: {
          text: "加油区服务车辆及服务时间变化",
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["服务车辆", "平均服务时间"]
        },
        grid: {
          right: "8%"
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: [{
          type: "category",
          // boundaryGap: false,
          data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        }],
        yAxis: [{
          type: "value",
          name: '服务车辆',
          axisLabel: {
            formatter: "{value} 辆"
          }
        },{
          type: "value",
          show: true,
          name: '平均服务时间',
          axisLabel: {
            formatter: "{value} 秒"
          },
          axisTick: {
            show: true,
          },
          axisLine: {
            lineStyle: {
              width: 1
            }
          }
        }],
        series: [
          {
            name: "服务车辆",
            type: "bar",
            data: [],
            // markPoint: {
            //   data: [
            //     { type: "max", name: "最大值" },
            //     { type: "min", name: "最小值" }
            //   ]
            // },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "平均服务时间",
            type: "line",
            yAxisIndex: 1, // 多个 y 轴时使用
            data: [],
            // markPoint: {
            //   data: [
            //     { type: "max", name: "最大值" },
            //     { type: "min", name: "最小值" }
            //   ]
            // },
            markLine: {
              data: [
                { type: "average", name: "平均值" }
              ]
            }
          }
        ]
      }
    };
  },
  watch: {},
  created () {
    // 今日实时数据
    this.today_start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.today_end = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getCheckOutServiceData(this.groupType, '1', this.today_start, this.today_end, this.selectedStation.station, 'refuel')
  },
  mounted() {

  },
  methods: {
    // 获取当天加油区服务车辆，服务时间
    getCheckOutServiceData(groupType, interval, start_time, end_time, station, category) {
      // 初始化坐标轴数据为空
      // for(let i=0; i<action.length; i++){
      //   // 1. 需要修改添加的数据
      //   this.todayViolationsData.seriesData[i].data = []
      // }
      console.log('getCheckOutServiceData', start_time, end_time, station, category)
      // 当前小时时间点
      let nowHour = Number(end_time.slice(11, 13))
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
          this.option.series[0].data.push(resDataGroup[i].total_num)
          this.option.series[1].data.push(resDataGroup[i].average_time)
        }

      })
    }
  }
};
</script>

<style lang="less">
</style>

