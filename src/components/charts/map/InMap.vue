<template>
  <div class="mymap">
    <div id="allmap" style="width:100%;height:1000px"> </div>
  </div>
</template>

<script>

import inMap from 'inmap'
import shanxi from './shanxi/shanxi'
import xian from './shanxi/xian'
import oilGeoData from './data/oilGeo'

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
        id: 'allmap',
        skin: "Blueness",
        center: [108.881385,34.236727], //地图中心点
        zoom: {
          value: 7, //当前地图级别
          show: true, //放大缩小按钮显示
          max: 18,
          min: 12
        },
      })

      // 地图行政区域涂图层
      var polygonOverlay = new inMap.PolygonOverlay({
        tooltip: {
            show: false,
            formatter: function(params) {
                return (
                "<div style='background-color:#fff;color:red;margin:-10px !important;padding:10px !important;'>" +
                " <div>" +
                " <span>时间 : </span><span>14:00</span>" +
                " </div>" +
                " <div>" +
                " <span>地区 : </span><span>" +
                params.name +
                "</span>" +
                " </div>" +
                " <div>" +
                " <span>温度 : </span><span>" +
                params.count +
                "℃</span>" +
                " </div></div>"
                );
            },
            offsets: {
            top: 15,
            left: 15
            },
            customClass: "auto"
        },
        // legend: {
        //     show: true,
        //     title: "板块去重设备数 "
        // },
        style: {
            normal: {
            borderWidth: 1.5,
            label: {
                show: true, // 是否显示
                font: "13px bold ",
                color: "#fff"
            }
            },
            mouseOver: {
              shadowColor: "rgba(0, 0, 0, 1)",
              // shadowBlur: 10,
              borderWidth: 1.5,
              label: {
                  color: "rgba(0, 0, 0, 1)"
              }
            },
            // selected: {
            // backgroundColor: "rgba(184,0,0,1)",
            // borderColor: "rgba(255,255,255,1)",
            // label: {
            //     color: "rgba(255,255,255,1)"
            // }
            // },
            colors: [
                "rgba(156,200,249,0.4)",
                "rgba(93,158,247,0.4)",
                "rgba(134,207,55,0.4)",
                "rgba(252,198,10,0.4)",
                "rgba(255,144,0,0.4)"
            ]
        }
        });

      let da = {
        "西万路加油站": "高薪"
      }
      // 移动的线图层
      var moveLineOverlay = new inMap.MoveLineOverlay({
        style: {
          point: { //散点配置
            tooltip: {
              show: true,
              formatter: (params) => {
                // console.log('鼠标', JSON.stringify(params))
                return (
                  `<div>
                    <div style="font-size:16px;font-weight:blod;">
                      <span>${params.name}</span>
                    </div>
                    <div>
                      <span>经纬度：</span>
                      <span>${params.geometry.coordinates} </span>
                    </div>
                    <div>
                      <span>数据：</span>
                      <span>${da[params.name]} </span>
                    </div>
                  </div>`
                )
              },
              customClass: "auto"
            },
            // 散点样式
            style: {
              normal: {
                backgroundColor: 'rgba(200, 200, 50, 1)',
                borderWidth: 1,
                borderColor: "rgba(255,255,255,1)",
                size: 6,
                label: {
                  show: true,
                  color: 'rgba(255,255,255,1)'
                },
              },
              mouseOver: {
                backgroundColor: 'rgba(200, 200, 200, 1)',
                borderColor: "rgba(255,255,255,1)",
                borderWidth: 4,
              },
              selected: {
                backgroundColor: 'rgba(200,200,50,1)',
                borderColor: "rgba(255,255,255,1)",
                borderWidth: 4,
                size: 12
              },
            },
            event: { // 散点点击事件
              onMouseClick: function (item) {
                // console.log('鼠标点击', JSON.stringify(item))
              },
              onMouseOver (item) {
                // console.log('鼠标悬浮', JSON.stringify(item))
              }
            }
          },
          line: { //线的配置
            style: {
              normal: {
                borderColor: 'rgba(200, 200, 50, 1)',
                borderWidth: 2,
                // shadowColor: 'rgba(255, 250, 50, 1)',
                // shadowBlur: 20,
                lineOrCurive: "curve" // 弧度
              }
            }
          },
          lineAnimation: {
            style: {
              size: 4,
              //移动点颜色
              fillColor: '#fff',
              //移动点阴影颜色
              shadowColor: '#fff',
              //移动点阴影大小
              shadowBlur: 10,
              lineOrCurve: 'curve',
            }
          }
        },
        data: oilGeoData,
      });

      let data = [{
        name: '中国石油陕西销售公司',
        geometry: {
          type: 'Point',
          coordinates: [108.881385,34.236727]
        },
        style: {
          color: 'rgba(200, 200, 50, 0.7)',
          speed: 1,
          size: 30
        }
      }]

      var PointAnimationOverlay = new inMap.PointAnimationOverlay({
        style: {
          fps: 90, //动画帧数
          color: "#FAFA32",
          size: 20,
          speed: 0.15
        },
        data: data
      });

      inmap.add(PointAnimationOverlay);
      polygonOverlay.setData(shanxi.shanxi)
      // inmap.add(polygonOverlay);
      inmap.add(moveLineOverlay);

      // overlay.setData(shanxi.shanxi)
    }
  }
}
</script>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
.mymap {
  height: 1000px;
  width: 100%;
  border: 2px solid #084272;
  margin: 0 auto;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
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