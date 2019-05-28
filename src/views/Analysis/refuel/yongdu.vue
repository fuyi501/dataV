<template>
  <div style="height:360px;width:100%;padding-top:20px;">
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
    selectedData: {
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
          text: "加油区拥堵指数",
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //   data: ["拥堵指数"]
        // },
        visualMap: {
          top: 10,
          right: 10,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          pieces: [{
            gt: 0,
            lte: 1,
            color: '#096',
            label: '畅通'
          }, {
            gt: 1,
            lte: 2,
            color: '#ffde33',
            label: '轻度拥堵'
          }, {
            gt: 2,
            lte: 3,
            color: '#ff9933',
            label: '中度拥堵'
          }, {
            gt: 3,
            lte: 4,
            color: '#cc0033',
            label: '严重拥堵'
          }],
          outOfRange: {
            color: '#cc0033'
          }
        },
        grid: {
          right: "8%"
        },
        xAxis: [{
          type: "category",
          // boundaryGap: false,
          data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        }],
        yAxis: [{
          type: "value",
          name: '拥堵指数',
          axisLabel: {
            formatter: "{value}"
          }
        }],
        series: [
          {
            name: "拥堵指数",
            type: "line",
            data: [],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
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
    this.getCheckOutServiceData('60', this.today_start, this.today_end, this.selectedData.station)
  },
  mounted() {

  },
  methods: {
    // 获取当天加油区服务车辆，服务时间
    getCheckOutServiceData(interval, start_time, end_time, station) {
      // 初始化坐标轴数据为空
      // for(let i=0; i<action.length; i++){
      //   // 1. 需要修改添加的数据
      //   this.todayViolationsData.seriesData[i].data = []
      // }
      console.log('getCheckOutServiceData', start_time, end_time, station)
      // 当前小时时间点
      let nowHour = Number(end_time.slice(11, 13))
      axios.get('http://10.202.5.9:5123/datacenter/ci/history', {
        params: {
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
          this.option.series[0].data.push((resDataGroup[i]*5).toFixed(2))
        }

      })
    }
  }
};
</script>

<style lang="less">
</style>

