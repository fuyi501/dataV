<template>
  <div class="home" :style="{height: contentHeight}">
    <!-- 左侧 -->
    <Row type="flex" justify="start">
      <Col :span="6">
        <Row >
          <pass7-day-data-line></pass7-day-data-line>
        </Row>
        <Row style="margin: 20px 0px;">
          <pass7-day-data-bar></pass7-day-data-bar>
        </Row>
        <Row style="margin: 20px 0px;">
          <refuel-overview-event-pie></refuel-overview-event-pie>
        </Row>
      </Col>

      <!-- 中间 -->
      <Col :span="12">
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
          <safe-box-event-pie></safe-box-event-pie>
        </Row>
        <Row style="margin: 20px 0px;">
          <checkout-event-pie></checkout-event-pie>
        </Row>
        <Row style="margin: 20px 0px;">
          <unload-event-pie></unload-event-pie>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import { BMap, MapGeo, InMap } from '@/components/map'
import constData from '@/util/constData' // 保存的常量

// 页面组件
import TodayDataLine from './components/todayDataLine.vue'
import Pass7DayDataLine from './components/pass7DayLine'
import Pass7DayDataBar from './components/pass7DayBar'
import SafeBoxEventPie from './components/safeBoxEventPie'
import CheckoutEventPie from './components/checkoutEventPie'
import UnloadEventPie from './components/unloadEventPie'
import RefuelOverviewEventPie from './components/refuelOverviewEventPie'

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
    InMap
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

  }
};
</script>

<style>
.home {
  padding: 20px;
  /* margin: -20px 0px; */
  /* background-color: #0a4271; */
  /* background-color: #0b0f34 !important; */
  /* background-color: #01237C !important; */
  background: url('../../assets/bg.jpg') center;
  /* background-size: 100% 100%; */
  /* box-sizing: border-box; */
  /* height: 100%; */
}
</style>

