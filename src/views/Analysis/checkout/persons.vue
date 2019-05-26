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
收银台进店人数，服务人数对比
*/
import constData from '@/util/constData' // 保存的常量
// 工具
import axios from 'axios'
import dayjs from 'dayjs'

// 查询收银台实时服务人数和服务时间
export default {
  components: {},
  props: {
    // 选择的站点名称
    selectedStation: {
      type: Object,
      default: () => new Object({station: 'xiwan'})
    },
    servicePersonsData: {
      type: Array
    },
    enterPersonsData: {
      type: Array
    },
    axisDataList: {
      type: Array
    }
  },
  data() {
    return {
      groupType: 'hour', // 查询类型
      today_start: '', // 今天的开始时间
      today_end: '', // 截止到现在的时间点
      axisData: [],
      option: {
        title: {
          text: "收银台进店人数和服务人数",
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["进店人数", "服务人数"]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          right: '10%'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.axisDataList,
        },
        yAxis: [{
          type: "value",
          name: '人数',
          axisLabel: {
            formatter: "{value} 人"
          }
        }],
        series: [
          {
            name: "进店人数",
            type: "line",
            data: this.enterPersonsData,
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
            name: "服务人数",
            type: "line",
            data: this.servicePersonsData,
            // markPoint: {
            //   data: [
            //     { type: "max", name: "最大值" },
            //     { type: "min", name: "最小值" }
            //   ]
            // },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      }
    }
  },
  watch: {
    enterPersonsData: {
      deep: true,
      handler (value) {
        console.log('进店人数新的值：', value)
        this.option.series[0].data = value
      }
    },
    servicePersonsData: {
      deep: true,
      handler (value) {
        console.log('服务人数新的值：', value)
        this.option.series[1].data = value
      }
    },
    axisDataList: {
      deep: true,
      handler (value) {
        this.option.xAxis.data = value
      }
    }
  },
  created () {
    // 今日实时数据
    this.today_start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.today_end = dayjs().format('YYYY-MM-DD HH:mm:ss')
    // this.getPersonsData(this.groupType, '1', this.today_start, this.today_end, this.selectedStation.station, 'checkout')
  },
  mounted() {

  },
  methods: {
    // 获取当天收银台服务人数，服务时间
    getPersonsData(groupType, interval, start_time, end_time, station, category) {
      // 初始化坐标轴数据为空
      // for(let i=0; i<action.length; i++){
      //   // 1. 需要修改添加的数据
      //   this.todayViolationsData.seriesData[i].data = []
      // }
      console.log('getPersonsData', start_time, end_time, station, category)

      // 查询两次，一个是进店人数接口，一个是服务人数接口
      let enterPersonsApi = axios.get('http://10.202.5.9:5123/datacenter/customer/enter', {
        params: {
          group: groupType,
          interval,
          start_time,
          end_time,
          station
        }
      })
      let servicePersonsApi = axios.get('http://10.202.5.9:5123/datacenter/service/statistic', {
        params: {
          group: groupType,
          interval,
          start_time,
          end_time,
          station,
          category
        }
      })
      axios.all([enterPersonsApi, servicePersonsApi])
        .then(axios.spread((enterRes, serviceRes) => {
          console.log('进店人数和服务人数：', enterRes, serviceRes)
          let enterResData = enterRes.data.data.count_group
          let serviceResData = serviceRes.data.data.count_group
          for(let i in enterResData){
            this.option.series[0].data.push(enterResData[i])
          }
          for(let i in serviceResData){
            this.option.series[1].data.push(serviceResData[i].total_num)
          }

        }));
    }
  }
};
</script>

<style lang="less">
</style>

