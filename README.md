# datav 大数据可视化系统

## element-ui 版本1

一直想做一个大屏展示系统，一直没机会做，这次终于尝试了一下，采用 vue、vue-echarts、echarts、element-ui 设计，这个是最简单的版本，只是设计了下布局，增加了几个图表。

这一版主要使用 element-ui 开发，第二版使用 iview 开发。

第一版没有组件化，代码很乱 :joy: :joy: :joy:

后面主要修改第二版的，这一版就这样吧。 :joy: :joy: :joy:

## 如何使用

```
git clone https://github.com/fuyi501/dataV.git
git checkout element-ui-v1
npm install
npm run serve
```

## 效果图

#### vue-echarts 和 geo 地图

![](http://img.fuwenwei.com/blog/20190511150836.GIF)

#### vue-echarts 和 bmap 地图

![](http://img.fuwenwei.com/blog/20190511150716.GIF)

## 开发工具

主要采用 `echarts` 开发，`echarts` 开发起来很方便，文档也很全，可以直接使用 `vue+echarts` 开发。

不过 vue 中更新数据之后需要图表及时更新，我们使用 `echarts` 的话，需要自己封装组件实现动态刷新图表，后来直接使用 `vue-echarts` 可以直接实现目的，所以整个系统主要采用 `vue-echarts` 开发。

但是里面还有一个问题是地图的使用，`vue-echarts` 中使用的是 `geo` 地图，扩展性不强，我想直接使用 `echarts` 的扩展组件 `bmap` ，开发起来扩展性和定制性更强，所以在地图这块主要使用 `echarts+bmap` 。

- [element-ui](https://element.eleme.cn/#/zh-CN/component/installation)

- [echarts](https://echarts.baidu.com/index.html)

- [echarts 主题构建](https://echarts.baidu.com/theme-builder/)

- [百度地图主题构建](http://lbsyun.baidu.com/customv2/index.html)

- [v-charts](https://v-charts.js.org/) 饿了么团队开发，但是文档很久没有更新了，很多配置文件配置起来很模糊，不过也是一个很方便不错的库。

