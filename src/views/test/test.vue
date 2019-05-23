<template>
  <div class="home" style="max-height:2200px;" >
    <!-- 左侧 -->
    <Row type="flex" justify="start" :gutter="20">
      <Col :span="6"><data1></data1></Col>
      <Col :span="6"><data2></data2></Col>
      <Col :span="6"><data3></data3></Col>
      <Col :span="6"><wenduji></wenduji></Col>
      <Col :span="6"><yuanzhu></yuanzhu></Col>
      <Col :span="6"><tongji></tongji></Col>
      <Col :span="6"><jianbian></jianbian></Col>
      <Col :span="6"><xiangxingtu2></xiangxingtu2></Col>
      <Col :span="6"><tiaoxing></tiaoxing></Col>
      <Col :span="6"><bingtu></bingtu></Col>
      <Col :span="6"><zhutu></zhutu></Col>
      <Col :span="6"><bingtu2></bingtu2></Col>
      <Col :span="6"><xiangxingtu3></xiangxingtu3></Col>
      <Col :span="6"><xiangxingtu4></xiangxingtu4></Col>
    </Row>
  </div>
</template>

<script>
import constData from "@/util/constData"; // 保存的常量

import Data1 from "./components/river";
import Data2 from "./components/pingjunzhi1";
import Data3 from "./components/xiangxingtu1";
import Xiangxingtu2 from "./components/xiangxingtu2";
import Xiangxingtu3 from "./components/xiangxingtu3";
import Xiangxingtu4 from "./components/xiangxingtu4";
import Wenduji from "./components/wenduji";
import Yuanzhu from "./components/yuanzhu";
import Tongji from "./components/tongji";
import Jianbian from "./components/jianbian";
import Tiaoxing from "./components/tiaoxing";
import Bingtu from "./components/bingtu";
import Zhutu from "./components/zhutu";
import Bingtu2 from "./components/bingtu2";

export default {
  name: "analysis",
  components: {
    Data1,
    Data2,
    Data3,
    Wenduji,
    Yuanzhu,
    Tongji,
    Jianbian,
    Xiangxingtu2,
    Xiangxingtu3,
    Xiangxingtu4,
    Tiaoxing,
    Bingtu,
    Zhutu,
    Bingtu2
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style>
</style>

