<template>
  <div class="home" :style="{height: contentHeight}">
    <!-- 左侧 -->
    <el-row type="flex" justify="start">
      <el-col :span="6">
        <el-row >
          <MyLine></MyLine>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <MyHistogram></MyHistogram>
        </el-row>
      </el-col>

      <!-- 中间 -->
      <el-col :span="12">
        <el-row >
          <MyMap></MyMap>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <my-line2></my-line2>
        </el-row>
      </el-col>

      <!-- 右侧 -->
      <el-col :span="6">
        <el-row>
          <MyPie></MyPie>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <MyWater></MyWater>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 左侧
import MyLine from "@/views/left/MyLine.vue";
import MyHistogram from "@/views/left/MyHistogram.vue";

// 中间
import MyMap from "@/views/center/MyMap.vue";
import MyLine2 from "@/views/center/MyLine2.vue";

// 右侧
import MyPie from "@/views/right/MyPie.vue";
import MyWater from "@/views/right/MyWater.vue";


export default {
  name: "home",
  components: {
    MyLine,
    MyHistogram,
    MyPie,
    MyWater,
    MyMap,
    MyLine2
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
    console.log(this.contentHeight);
    window.onresize = function temp() {
      this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    };
  },
};
</script>

<style>
.home {
  padding: 20px 20px;
  background-color: #0a4271;
}
</style>

