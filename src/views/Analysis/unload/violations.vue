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
export default {
  props: {
    heguiData: Array,
    weiguiData: Array,
    heguilvData: Array
  },
  data() {
    return {
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
            data: this.heguiData
          },
          {
            name: '违规',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              formatter: '{c}次'
            },
            data: this.weiguiData
          },
          {
            name: '违规率',
            type: 'line',
            yAxisIndex: 1,
            label: {
              formatter: '{c}%'
            },
            data: this.heguilvData
          }
        ]
      }
    };
  }
}
</script>

<style lang="less">
</style>