<template>
  <v-chart
    :options="option"
    :autoresize="true"
    theme="chartsTheme"
  />
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
// 工具
import axios from "axios";
import dayjs from "dayjs";
var data = [78, 60, 60, 70, 69, 60, 70, 69];
var titlename = [
  "一级手术",
  "二级手术",
  "三级手术",
  "四级手术",
  "五级手术",
  "三级手术",
  "四级手术",
  "五级手术"
];
var valdata = [683, 234, 234, 523, 345, 234, 523, 345];
var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];

// 查询保险柜实时数据，传递保险柜今天实时数据给子组件
export default {
  components: {},
  props: {
    // 选择的站点名称
    selectedStation: {
      type: Object,
      default: () => new Object({ station: "xiwan" })
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
          text: "卸油口卸油事件"
        },
        grid: {
          top: "20%"
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: function(value, index) {
                  var num = myColor.length;
                  return myColor[index % num];
                }
              },
              formatter: function(value, index) {
                return ["{title|" + value + "} "].join("\n");
              },
              rich: {}
            }
          },
          {
            show: true,
            inverse: true,
            data: valdata,
            axisLabel: {
              textStyle: {
                color: function(value, index) {
                  var num = myColor.length;
                  return myColor[index % num];
                }
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: data,
            barWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}%"
              }
            }
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
    this.today_start = dayjs()
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    this.today_end = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.getViolationsData(
      this.groupType,
      this.today_start,
      this.today_end,
      this.selectedStation.station,
      "safebox"
    );
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
      action = ["开启保险柜", "关闭保险柜", "保险柜打开", "开启钱箱"]
    ) {
      // 初始化坐标轴数据为空
      for (let i = 0; i < action.length; i++) {
        // 1. 需要修改添加的数据
        this.todayViolationsData.seriesData[i].data = [];
      }
      console.log("getViolationsData", start_time, end_time, station, action);
      // 当前小时时间点
      // let nowHour = Number(end_time.slice(11, 13))
      axios
        .get("http://10.202.5.9:5123/datacenter/statistic", {
          params: {
            strict: 1, // 严格模式
            group: groupType,
            start_time: start_time,
            end_time: end_time,
            station: station,
            status: "违规",
            category: category,
            actions: action.join(",")
          }
        })
        .then(res => {
          console.log("单保险柜违规事件查询：", res.data.data.actions);

          let actions = res.data.data.actions;

          action.forEach((element, index) => {
            let actionGroupData = actions[element]["group"];
            let actionTotalData = actions[element]["total"];
            // console.log(element, index, actionTotalData)

            for (let i in actionGroupData) {
              // 2. 需要修改添加的数据
              this.todayViolationsData.seriesData[index].data.push(
                actionGroupData[i]
              );
              this.todayViolationsData.seriesData[action.length].data[
                index
              ].value = actionTotalData;
            }
          });
        });
    }
  }
};
</script>

<style lang="less">
</style>

