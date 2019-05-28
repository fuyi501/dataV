<template>
  <div class="home" :style="{height: '3000px'}">
    <!-- 左侧 -->
    <Row type="flex" justify="start">
      <Col :span="6">
        <Row >
          <weigui2></weigui2>
          <!-- <pass7-day-data-line></pass7-day-data-line> -->
        </Row>
        <Row style="margin: 20px 0px;">
          <river></river>
          <!-- <pass7-day-data-bar></pass7-day-data-bar> -->
        </Row>
        <Row style="margin: 20px 0px;">

        </Row>
      </Col>

      <!-- 中间 -->
      <Col :span="12">
    <Button @click="handleClick">我是按钮</Button>

        <Row >
          <!-- <MapGeo :mapData="map"></MapGeo> -->
          <InMap></InMap>
        </Row>
        <Row style="margin: 20px 0px;">
          <today-data-line></today-data-line>
        </Row>
      </Col>

      <!-- 右侧 -->
      <Col :span="6">
        <Row>
          <persons2></persons2>
          <Cars></Cars>
          <!-- <persons></persons> -->
        </Row>
        <Row style="margin: 20px 0px;">
        </Row>
        <Row style="margin: 20px 0px;">
        </Row>
      </Col>
    </Row>
    <Row type="flex" justify="center" :gutter="20">
      <Col :span="6"><unload-event-pie class="charts-border"></unload-event-pie></Col>
      <Col :span="6"><checkout-event-pie class="charts-border"></checkout-event-pie></Col>
      <Col :span="6"><safe-box-event-pie class="charts-border"></safe-box-event-pie></Col>
      <Col :span="6"><refuel-overview-event-pie class="charts-border"></refuel-overview-event-pie></Col>
    </Row>
  </div>
</template>

<script>
import { BMap, MapGeo, InMap } from '@/components/charts/map'
import constData from '@/util/constData' // 保存的常量

// 页面组件
import TodayDataLine from './components/todayDataLine.vue'
import Pass7DayDataLine from './components/pass7DayLine'
import Pass7DayDataBar from './components/pass7DayBar'
import SafeBoxEventPie from './components/safeBoxEventPie'
import CheckoutEventPie from './components/checkoutEventPie'
import UnloadEventPie from './components/unloadEventPie'
import RefuelOverviewEventPie from './components/refuelOverviewEventPie'

import River from './service/river'
import Persons from './service/persons'
import Persons2 from './service/person2'
import Cars from './service/cars'
import Weigui2 from './service/weigui2'


export default {
  name: "home",
  components: {
    TodayDataLine,
    Pass7DayDataLine,
    Pass7DayDataBar,
    SafeBoxEventPie,
    CheckoutEventPie,
    UnloadEventPie,
    RefuelOverviewEventPie,
    InMap,

    River,
    Persons,
    Persons2,
    Cars,
    Weigui2
  },
  data() {
    return {
      contentHeight: ""
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
    console.log(this.contentHeight)
    window.onresize = function temp() {
      this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    }
  },
  methods: {
    handleClick() {
      console.log('我点击了')
      this.$router.push('test')
    }
  }
};
</script>

<style>
.home {
  padding: 40px 40px;
  /* margin: -20px 0px; */
  /* background-color: #0a4271; */
  /* background-color: #0b0f34 !important; */
  /* background-color: #01237C !important; */
  background: url('../../assets/bg.jpg') center;
  /* background-size: 100% 100%; */
  /* box-sizing: border-box; */
  height: 3500px;
}
</style>

