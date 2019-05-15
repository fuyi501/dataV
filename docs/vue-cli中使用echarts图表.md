# vue-cli 中使用 vue-echarts 和 echarts 图表

vue-echarts 和 echarts的区别：

* vue-echarts 是封装后的 vue 组件，基于 ECharts v4.0.1+ 开发，依赖 Vue.js v2.2.6+，功能一样，用法也差不多，封装成vue组件后可以更方便在 vue 中使用。
* echarts 就是普通的 js 库。

vue-echarts 的特征：

* 轻量，高效，按需绑定事件
* 支持按需导入ECharts.js图表​​和组件
* 支持组件调整大小事件自动更新视图

git地址：https://github.com/ecomfe/vue-echarts/

## 效果展示

先来两张做好的效果

### vue-echarts 和 geo 地图

![](http://img.fuwenwei.com/blog/20190511150836.GIF)

### vue-echarts 和 bmap 地图

![](http://img.fuwenwei.com/blog/20190511150716.GIF)

## vue-echarts 的使用

### 安装

```sh
npm install echarts vue-echarts -S
```

### 使用方法

```js
import Vue from 'vue'
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
// import ECharts from 'vue-echarts/components/ECharts.vue' 与上一句相同

// 手动导入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'

// title,legend,tooltip 是 echarts 的组件，
// 在图表中使用需要按组件导入，否则图表的标题图例可能不能显示。
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

// 导入自带主题，可以引入多个主题
import 'echarts/theme/dark'
import 'echarts/theme/macarons'
import 'echarts/theme/infographic'

// 导入自定义主题
// 自定义主题如果是 js 文件，可以放在 echarts/theme 目录下
// 如果是 json 文件，可以像下面一样使用
import 'echarts/theme/walden'

// ./views/theme/ 下保存的是自定义的主题
import roma from './views/theme/roma.json'
import wonderland from './views/theme/wonderland.json'

// registering custom theme
ECharts.registerTheme('roma', roma)
ECharts.registerTheme('wonderland', wonderland)

// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
import 'echarts-gl'

// 注册组件后即可使用
Vue.component('v-chart', ECharts)
```

### 条形图

在 main.js 中导入 vue-echarts 后，下面以条形图为例子看下具体怎么使用。

```html
<template>
  <div class="myline1">
    <v-chart
      :options="option"
      :autoresize="true"
      :theme="lineTheme"
      style="height:300px;width:100%;"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      lineTheme: 'walden',
      option : {
        title: {
          text: '条形图',
          x: 'left',
          y: '5',
          textStyle: {
            color: '#50dde6'
          }
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : { // 坐标轴指示器，坐标轴触发有效
            type : 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'white',
              fontSize: '10'
            }
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'white',
              fontSize: '10'
            }
          },
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  mounted () {
    setInterval( () => {
      this.option.series[0].data.shift();
      this.option.series[0].data.push(this.random(100, 1000));
    }, 1000)
  },
  methods: {
    random(lower, upper) {
      return Math.floor(Math.random() * (upper - lower)) + lower;
    }
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.myline1 {
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
  background-color: #0d4879;
}
</style>
```

### 展示效果

![](http://img.fuwenwei.com/blog/20190511112011.GIF)

其他图表使用方式相似，这里就不再细说。

## vue-echarts 使用地图

使用图表的时候，很多需求情况下不可避免的需要使用地图，vue-echarts 支持地图，官方的例子提供了一个 geo 地图的使用方式，我也是在其基础上做的，并且增加了一个例子，官方例子请看：https://github.com/ecomfe/vue-echarts/blob/master/src/demo/Demo.vue。

### 导入关键组件

```js
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'

import chinaMap from 'echarts/map/json/china.json'
import ECharts from 'vue-echarts'

ECharts.registerMap('china', chinaMap)
```

### 准备地图数据

单独写一个 map.js 文件，存放地图展示需要的数据及相关代码，请详见：

[map.js](https://github.com/fuyi501/dataV/blob/master/src/views/center/data/map.js)

### 在 vue 中使用

导入 map.js 数据文件

```js
// map.js 放在 data 目录下
import map from './data/map'
```

MyMap.vue 的完整代码如下：

```js
<template>
  <div class="mygeo">
    <v-chart :options="map" :autoresize="true" style="margin: 0 auto;"/>
  </div>
</template>

<script>
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'

import ECharts from 'vue-echarts'
import chinaMap from 'echarts/map/json/china.json'
ECharts.registerMap('china', chinaMap)

import map from './data/map'

export default {
  data () {
    return {
      map
    }
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.mygeo {
  height: 400px;
  width: 96%;
  /* border: 2px solid #084272; */
  margin: 0 auto;
}
</style>
```

### 展示效果

![](http://img.fuwenwei.com/blog/20190511114426.GIF)

### 另一个例子

![](http://img.fuwenwei.com/blog/20190511114537.GIF)

同样的它的数据文件请看：[map2.js](../src/views/center/data/map2.js)

## echarts 的使用

在 vue 中使用 echarts 的扩展 bmap 的话，vue-echarts 可能就不太好用了，这里我直接使用 echarts 来实现 bmap 的使用。

### 安装 echarts

```sh
npm install echarts -S
```

### 全局引入

在 `main.js` 中添加如下代码：

```js
// 引入 echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
```

### echarts 简单使用

使用 echarts 绘制简单图表也很方便，代码如下：

```js
<template>
  <div id="myChart" style="height: 400px;width:400px;margin: 0 auto;"></div>
</template>

<script>

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
        myChart.setOption({
          title: { text: 'ECharts 入门示例' },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
    }
  }
}
</script>

<style scoped>

</style>
```

### bmap 的使用

使用 echarts 是为了使用 bmap 扩展插件，使用 bmap 首先要 导入 bmap 扩展：

```js
import 'echarts/extension/bmap/bmap'
// require('echarts/extension/bmap/bmap');
```

完整代码：

```html
<template>
  <div class="mymap">
    <div id="myChart" style="height: 100%;width:100%;margin: 0 auto;"></div>
  </div>
</template>

<script>
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
```

### 展示效果

![](http://img.fuwenwei.com/blog/20190511144306.png)

### 自定义主题

地图的显示一般会会根据自己的系统修改地图显示的样式，修改地图样式详看：

- [百度地图主题构建](http://lbsyun.baidu.com/customv2/index.html)

将生成的 json 文件保存下来，放到自己的项目中，然后引入主题：

```js
import mytheme from './theme/mytheme.json'
```

然后在 bmap 的配置中设置主题就可以了，如下：

```js
bmap: {
  center: [108.881424,34.236661],
  zoom: 16,
  roam: true,
  mapStyle: mytheme
}
```

效果如下，不过我这个主题很丑，需要根据自己的需求更改。

![](http://img.fuwenwei.com/blog/20190511145458.png)

## 总结

到这里基本就说完了，我个人特别喜欢数据可视化，之前就折腾过很久，再加上 vue 组件开发可以说很快就可以做个前端页面出来，后面再继续完善设计自己的项目。


