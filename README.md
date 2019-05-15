# datav 大数据可视化系统

## iview 版本2

第一版请看分支 [element-ui-v1](https://github.com/fuyi501/dataV/tree/element-ui-v1)

这一版主要使用 [iview](https://www.iviewui.com/) 开发同样采用 vue、vue-echarts、echarts 开发，增加了 vue-video-player 播放视频流，增加了视频监控。

## 如何使用

```
git clone https://github.com/fuyi501/dataV.git
npm install
npm run serve
```

## 效果图

后面增加。。。 :joy: :joy: :joy:

## 开发工具

主要采用 `echarts` 开发，`echarts` 开发起来很方便，文档也很全，可以直接使用 `vue+echarts` 开发。

不过 vue 中更新数据之后需要图表及时更新，我们使用 `echarts` 的话，需要自己封装组件实现动态刷新图表，后来直接使用 `vue-echarts` 可以直接实现目的，所以整个系统主要采用 `vue-echarts` 开发。

但是里面还有一个问题是地图的使用，`vue-echarts` 中使用的是 `geo` 地图，扩展性不强，我想直接使用 `echarts` 的扩展组件 `bmap` ，开发起来扩展性和定制性更强，所以在地图这块主要使用 `echarts+bmap` 。

视频播放使用 `vue-video-player` 开发。

- [iview](https://www.iviewui.com/) 一套基于 Vue.js 的高质量 UI 组件库。

- [echarts](https://echarts.baidu.com/index.html) 一个使用 JavaScript 实现的开源可视化库。

- [Vue-ECharts](https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md) ECharts 的 Vue.js 组件。基于 ECharts v4.1.0+ 开发，依赖 Vue.js v2.2.6+。

- [Vue-Video-Player](https://github.com/surmon-china/vue-video-player/) 适用于 Vue 的 video.js 播放器组件。

- [echarts 主题构建](https://echarts.baidu.com/theme-builder/) echarts 主题构建工具。

- [百度地图主题构建](http://lbsyun.baidu.com/customv2/index.html) 百度地图主题构建工具。

- [v-charts](https://v-charts.js.org/) 基于 Vue2.0 和 echarts 封装的 v-charts 图表组件。饿了么团队开发，文档感觉不是很完善，不过也是一个很方便不错的库。

