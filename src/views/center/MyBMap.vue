<template>
  <div class="mymap">
    <div id="myChart" style="height: 100%;width:100%;margin: 0 auto;"></div>
  </div>
</template>

<script>
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

import 'echarts/extension/bmap/bmap'
// require('echarts/extension/bmap/bmap');

export default {
  data () {
    return {
      
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        let busLines = []
        myChart.setOption({
          title: {
            text: '地图实例',
            textStyle: {
              color: '#fff'
            }
          },
          bmap: {
            center: [108.881424,34.236661],
            zoom: 16,
            roam: true,
            // mapStyle: mytheme
          },
          series: [{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
              normal: {
                // color: '#c23531',
                // color: 'rgb(200, 35, 45)',
                opacity: 0.2,
                width: 1
              }
            },
            progressiveThreshold: 500,
            progressive: 200
          }]
        });
    }
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.mymap {
  height: 400px;
  width:96%;
  border: 2px solid #084272;
  margin: 0 auto;
}
</style>