<template>
<div class="charts-border" style="height:500px;width:96%;margin-top:10px;">
  <v-chart
      :options="option"
      :autoresize="true"
      theme="chartsTheme"
    />
</div>
</template>
<script>
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

export default {
  components: {},
  data() {
    return {
      option: {
        title: {
          text: "违规事件",
          subtext: "违规事件"
        },
        grid: {
          top: "20%"
        },
        // backgroundColor: '#0e2147',
        xAxis: {
          show: true
        },
        yAxis: [
          {
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: true
            },
            splitLine: {
              show: true
            },
            axisTick: {
              show: true
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
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
</style>

