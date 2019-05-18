<template>
  <div class="mybar1" :style="{height: barHeight, width: barWidth}">
    <v-chart
      :options="option1"
      :autoresize="true"
      style="height:100%;width:100%;"/>
  </div>
</template>

<script>

export default {
  name: 'ChartBar',
  props: {
    xAxisData: Array,
    seriesData: {
      type: Array,
      default: []
    },
    text: {
      type: String,
      default: '条形图组件'
    },
    subtext: {
      type: String,
      default: ''
    },
    legendData: Array,
    barHeight: {
      type: String,
      default: '300px'
    },
    barWidth: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      option1: {
        barTheme: 'walden',  // 主题
        color: ['#3398DB'],  // 颜色
        title: { // 标题
          text: this.text,  // 主标题
          subtext: this.subtext,  // 副标题
          x: 'left',  // 标题位置，left、center、right
          y: '5',  // 标题距离顶部距离
          textStyle: {  // 主标题的样式
            color: '#50dde6',
            // fontSize: 16
          },
          subtextStyle: {  // 副标题的样式
            color: '#50dde6',
            // fontSize: 16
          }
        },
        tooltip : {  // 提示框组件
          // 出发类型
          // axis 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          // item 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          trigger: 'axis',
          // 坐标轴指示器配置项。
          axisPointer : {  // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'  // 默认为直线，可选为：line、shadow、none、cross(十字)
          }
        },
        // 图例组件
        legend: {
          orient: 'horizontal',  // 图例列表的布局朝向。vertical 垂直
          top: '40',  // 图例组件离容器上侧的距离。
          textStyle: {  // 图例的公用文本样式。
            color: '#fff'
          },
          itemGap: 20, // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
          // 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）。
          // 图例组件会自动根据对应系列的图形标记（symbol）来绘制自己的颜色和标记，
          // 特殊字符串 ''（空字符串）或者 '\n'（换行字符串）用于图例的换行。
          data: this.legendData
        },
        // 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
        // 可以在网格上绘制折线图，柱状图，散点图（气泡图）。
        // 可以通过 grid 控制图表的上下左右偏移
        grid: {
          // show: true,
          top: '25%',
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true  // grid 区域是否包含坐标轴的刻度标签。
        },
        // 直角坐标系 grid 中的 x 轴
        xAxis : [{
          // 'value' 数值轴，适用于连续数据。
          // 'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
          // 'time' 时间轴，适用于连续的时序数据，
          // 与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，
          // 例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
          type : 'category',
          name: 'X轴',
          nameLocation: 'start', //  坐标轴名称显示位置。start,center,end
          nameGap: 15, // 坐标轴名称与轴线之间的距离。
          nameTextStyle: {
            color: 'red',
            fontSize: '12'
          },
          axisLine: { // 坐标轴轴线相关设置。
            // show: false, // 是否显示坐标轴
            // symbol: ['none', 'arrow'], // 坐标轴的箭头
            lineStyle: {
              color: 'white',
              width: '1',
              type: 'solid' // 坐标轴的类型，solid、dashed、dotted
            }
          },
          axisTick: { // 坐标轴刻度相关设置。
            alignWithLabel: true, // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
            inside: false, // 坐标轴刻度是否朝内，默认朝外。
            length: 5, // 坐标轴刻度的长度。
            lineStyle: { // 刻度线的样式。
              color: 'white',
              width: 1
            }
          },
          axisLabel: { // 坐标轴刻度标签的相关设置。
            textStyle: { // 写在外面没效果
              color: 'red',
              fontSize: '12'
            }
          },
          splitLine: { // 坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: ['#aaa', '#ddd'], // 分隔线颜色，可以设置成单个颜色。也可以设置成颜色数组，分隔线会按数组中颜色的顺序依次循环设置颜色。
              width: 1,
              type: 'dashed' // 分隔线的类型，solid、dashed、dotted
            }
          },
          splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
          },
          data : this.xAxisData,
        }],
        yAxis : [{
          type : 'value', // 坐标轴类型
          name: 'Y轴名称',
          nameLocation: 'end', //  坐标轴名称显示位置。start,center,end
          nameGap: 5, // 坐标轴名称与轴线之间的距离。
          nameTextStyle: {
            color: 'red',
            fontSize: '12'
          },
          axisLine: { // 坐标轴轴线相关设置。
            // show: false, // 是否显示坐标轴
            // symbol: ['none', 'arrow'], // 坐标轴的箭头
            lineStyle: {
              color: 'white',
              width: '1',
              type: 'solid' // 坐标轴的类型，solid、dashed、dotted
            }
          },
          axisTick: { // 坐标轴刻度相关设置。
            alignWithLabel: true, // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
            inside: false, // 坐标轴刻度是否朝内，默认朝外。
            length: 5, // 坐标轴刻度的长度。
            lineStyle: { // 刻度线的样式。
              color: 'white',
              width: 1
            }
          },
          axisLabel: { // 坐标轴刻度标签的相关设置。
            formatter: '{value} °C',
            textStyle: { // 写在外面没效果
              color: 'red',
              fontSize: '12'
            }
          },
          splitLine: { // 坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: ['#aaa', '#ddd'], // 分隔线颜色，可以设置成单个颜色。也可以设置成颜色数组，分隔线会按数组中颜色的顺序依次循环设置颜色。
              width: 1,
              type: 'dashed' // 分隔线的类型，solid、dashed、dotted
            }
          },
          splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
          }
        }],
        // series : this.seriesData
        series : [{
          name:'最高气温', // 系列名称
          type:'line', // 类型
          data:[11, 11, 15, 13, 12, 13, 10],
          label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
            show: true,
            color: 'red',
            fontSize: 16
          },
          markPoint: { // 图表标注点。
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'},
              {type: 'average', name: '平均值'}
            ]
          },
          markLine: { // 图表标线。
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'},
              {type: 'average', name: '平均值'}
            ]
          }
        }],
      }
    }
  },
  mounted () {
    //
  },
  methods: {
    //
  }
}
</script>

<style scoped>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
.mybar1 {
  margin: 0 auto;
  padding:0px 20px;
  background: linear-gradient(to left, #50dde6, #50dde6) left top no-repeat,
              linear-gradient(to bottom, #50dde6, #50dde6) left top no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) right top no-repeat,
              linear-gradient(to bottom, #50dde6, #50dde6) right top no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) left bottom no-repeat,
              linear-gradient(to bottom, #50dde6, #50dde6) left bottom no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) right bottom no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) right bottom no-repeat;
  background-size: 3px 20px, 30px 3px, 3px 20px, 30px 3px;
  /* box-shadow:0 0 10px #fff inset; */
  /* border: 1px solid #50dde6; */
  /* background-color: #0d4879; */
  background-color: rgba(13, 72, 121, 0.3);

}
</style>
