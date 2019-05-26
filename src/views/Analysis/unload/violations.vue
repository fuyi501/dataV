<template>
  <v-chart :options="option" :autoresize="true" theme="chartsTheme" />
</template>
<script>
  /*
卸油口事件次数
合规次数，违规次数，各事件合规次数占比
具有合规违规的事件包括：["接油管操作", "员工离开", "非法入侵"],
合规事件：[
  "卸油口开启",
  "卸油口关闭",
  "油罐车到达",
  "油罐车离开",
  "连接静电夹",
  "断开静电夹",
  "油井巡检",
  "卸油口巡检",
  "水溶法检测操作",
  "已放置消防器材"
]
注意："存在灭火器 " 改成 "已放置消防器材"
*/
import constData from "@/util/constData"; // 保存的常量
import axios from "axios";
import dayjs from "dayjs";
// 查询保险柜实时数据，传递保险柜今天实时数据给子组件
export default {
  components: {},
  props: {
    // 选择的站点名称
    selectedStation: {
      type: Object,
      default: () => new Object({
        station: "xiwan"
      })
    }
  },
  data() {
    return {
      groupType: "hour", // 查询类型
      today_start: "", // 今天的开始时间
      today_end: "", // 截止到现在的时间点
      // 需要传递的数据
      option: {
        title: {
          text: "卸油口操作事件"
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a0}:{c0}次<br/>{a1}:{c1}次<br/>{a2}:{c2}%'
        },
        legend: {
          data: ["合规", "违规", "违规率"]
        },
        xAxis: [{
          type: 'category',
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              fontSize: 14
            }
          },
          data: ["接油管操作", "员工离开", "非法入侵", "水溶法检测", "卸油口巡检"],
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
            type: 'value',
            // name: '次数',
            min: 0,
            // max: 0,
            minInterval: 1,
            axisLabel: {
              formatter: '{value} 次'
            }
          },
          {
            type: 'value',
            // name: '温度',
            // min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [{
            name: '合规',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              formatter: '{c}次'
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6]
          },
          {
            name: '违规',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              formatter: '{c}次'
            },
            data: [2.6, 5.9, 9.0, 26.4, 28.7]
          },
          {
            name: '违规率',
            type: 'line',
            yAxisIndex: 1,
            label: {
              formatter: '{c}%'
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3]
          }
        ]
      }
    };
  },
  watch: {
    selectedStation: {
      deep: true,
      handler(value) {
        console.log("新的值：", value);
        // this.getViolationsData(this.groupType, this.today_start, this.today_end, value.station, constData.categoryData)
      }
    }
  },
  created() {
    // 今日实时数据
    this.today_start = dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
    this.today_end = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.getViolationsData(this.groupType,this.today_start,this.today_end,this.selectedStation.station,"unload");
  },
  mounted() {},
  methods: {
    // 获取当天保险柜违规数据
    getViolationsData(
      groupType,
      start_time,
      end_time,
      station,
      category,
      action = ["接油管操作", "员工离开", "非法入侵", "水溶法检测操作", "卸油口巡检"],
      status = ['合规', '违规']
    ) {
      // 1. 初始化坐标轴数据为空
      for (let i = 0; i < status.length; i++) {
        // 1. 需要修改添加的数据
        this.option.series[i].data = [];
      }
      console.log("getViolationsData", start_time, end_time, station, action, status);
      // 当前小时时间点
      // let nowHour = Number(end_time.slice(11, 13))

      let apiList = status.map((ele) => {
        return  axios.get('http://10.202.5.9:5123/datacenter/statistic', {
                  params: {
                    strict: 1, // 严格模式
                    group: groupType,
                    start_time: start_time,
                    end_time: end_time,
                    station: station,
                    category: category,
                    actions: action.join(","),
                    status: ele,
                  }
                })
      })
      // 计算违规和合规数据
      axios.all(apiList)
        .then(axios.spread((...res) => {
          let resData = [...res]
          console.log("卸油口违规事件查询：", resData);
          for (let i in status){
            for (let j in action) {
              this.option.series[i].data.push(resData[i].data.data.actions[action[j]].total)
            }
            console.log('数据：', this.option.series[i].data)
          }

          // 计算违规率
          for(let i in action) {
            console.log(this.option.series[0].data[i]+this.option.series[1].data[i], this.option.series[2].data[i])
            if (!this.option.series[0].data[i] && !this.option.series[1].data[i]){
              this.option.series[2].data[i] = 0
            }else {
              this.option.series[2].data[i] = (this.option.series[1].data[i] / (this.option.series[0].data[i] + this.option.series[1].data[i]))*100
            }
          }

        }));


    }
  }
}
</script>

<style lang="less">
</style>