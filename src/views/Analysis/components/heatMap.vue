<template>
  <div class="mymap2">
    <div id="allmap2" style="width:100%;height:500px"> </div>
  </div>
</template>

<script>

import inMap from 'inmap'
import heatData from './data/heat.js'
import wordData from './data//word.js'

export default {
  data () {
    return {

    }
  },
  mounted () {
    // alert(shanxi.shanxi)
    this.drawLine()
  },
  methods: {
    drawLine(){

      var inmap = new inMap.Map({
        id: 'allmap2',
        skin: "Blueness",
        center: [108.881385,34.236727], //地图中心点
        zoom: {
          value: 11, //当前地图级别
          show: true, //放大缩小按钮显示
          max: 18,
          min: 5
        },
      })

      var HeatOverlay = new inMap.HeatOverlay({
        style: {
            radius: 10, // 半径
            minScope: 0, // 最小区间,小于此区间的不显示
            maxScope: 1 // 最大区间,大于此区间的不显示
        }
      });

      var LabelOverlay = new inMap.LabelOverlay({
        tooltip: {
            show: true,
            formatter: "'服务质量：' + {count} + '分'",
            offsets: {
                top: 5,
                left: 12,
            }
        },
        style: {
            normal: {
                font: '14px Arial',
                color: 'rgba(255, 250, 50, 1)',
                shadowColor: 'rgba(255, 250, 50, 1)',
                shadowBlur: 10
            },
            mouseOver: {
                color: 'rgba(255, 250, 255, 1)',
            },
            selected: {
                color: 'rgba(184,0,0,1)'
            },
        },
        event: {
            onMouseClick: function (item, event) {
                console.log(item);
                //能获取当前点的信息
            }
        }
      });
      inmap.add(HeatOverlay);
      inmap.add(LabelOverlay);
      HeatOverlay.setData(heatData);
      LabelOverlay.setData(wordData);
    }
  }
}
</script>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
.mymap2 {
  height: 500px;
  width: 96%;
  border: 2px solid #084272;
  margin: 0 auto;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  /* display: none; */
  bottom: 2px !important;
}
.inmap-scale-group {
  bottom: 5px;
}
.auto {
  color: #fff;
  padding:5px 15px;
  border:0;
  background-color: rgba(13, 72, 121, 0.3);
}

</style>