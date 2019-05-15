<template>
  <div class="home" :style="{height: contentHeight}">
    <!-- 左侧 -->
    <Row type="flex" justify="start">
      <Col :span="6">
        <Row >
          <chart-line :text="lineData1.title" :xAxisData="lineData1.xAxisData" :seriesData="[...lineData1.seriesData]" style="margin:0 auto;"/>
        </Row>
        <Row style="margin: 10px 0px;">
          <chart-bar :text="barData.title" :xAxisData="barData.xAxisData" :seriesData="[...barData.seriesData]" style="margin:0 auto;"/>
        </Row>
      </Col>

      <!-- 中间 -->
      <Col :span="12">
        <Row >
          <MapGeo :mapData="map"></MapGeo>
        </Row>
        <Row style="margin: 10px 0px;">
          <chart-line :text="lineData2.title" :xAxisData="lineData2.xAxisData" :seriesData="[...lineData2.seriesData]" style="margin:0 auto;" lineWidth="96%" lineHeight="220px"/>
        </Row>
      </Col>

      <!-- 右侧 -->
      <Col :span="6">
        <Row>
          <chart-pie :text="pieData.title" :legendData="pieData.legendData" :seriesData="pieData.seriesData"></chart-pie>
        </Row>
        <Row style="margin: 10px 0px;">
          <chart-pie :text="pieData.title" :legendData="pieData.legendData" :seriesData="pieData.seriesData"></chart-pie>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import { BMap, MapGeo } from '@/components/map'
import { ChartLine, ChartBar, ChartPie } from "@/components/charts";

import map from './data/map'
import map2 from './data/map2'

export default {
  name: "home",
  components: {
    ChartLine,
    ChartBar,
    ChartPie,
    BMap,
    MapGeo
  },
  data() {
    return {
      map,
      map2,
      contentHeight: "",
      lineData1: {
        title: '每周用户活跃量',
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: [
          { data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }
        ]
      },
      lineData2: {
        title: '每周用户活跃量',
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: [
          { data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' },
          { data: [120, 232, 401, 534, 5290, 3330, 2320], type: 'line', areaStyle: {} }
        ]
      },
      barData: {
        title: '每周用户活跃量',
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: [
          { data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'bar' },
          { data: [120, 232, 401, 534, 5290, 3330, 2320], type: 'bar' }
        ]
      },
      pieData: {
        title: '我的饼图',
        legendData: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        seriesData: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ]
      }
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    contentHeight: function() {
      return `${document.documentElement.clientHeight - 60}px`;
    }
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    console.log(this.contentHeight);
    window.onresize = function temp() {
      this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    };
  },
};
</script>

<style>
.home {
  padding: 20px;
  /* margin: -20px 0px; */
  /* background-color: #0a4271; */
  background-color: #0b0f34 !important;
  /* background: url('../../assets/wrapper-bg.png') center no-repeat; */
  /* background-size: 100% 100%; */
  /* box-sizing: border-box; */
  /* height: 100%; */
}
</style>

