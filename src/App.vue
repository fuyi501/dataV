<template>
  <el-container id="app" ref="homePage">
    <el-main>
      <MyHeader></MyHeader>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import MyHeader from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    MyHeader
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-main {
  padding: 0px !important;
  /* margin-top: -68px; */
  /* z-index: 0 */
}
body {
  margin: 0px;
}
</style>
