<template>
  <el-row type="flex" justify="center">
    <el-col>
      <el-menu
        :default-active="$route.path"
        mode="horizontal"
        background-color="#0a4271"
        text-color="#4bdaff"
        active-text-color="#4bdaff"
        router
      >
        <el-menu-item index="/">智能监控大数据可视化系统</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "myheader"
};
</script>

<style >
.el-menu--popup-bottom-start {
  margin-top: 0px !important;
}
.el-menu-item {
  font-size: 36px !important;
  font-weight: bold;
  float: inherit !important;
  height: 68px !important; 
  /* text-align: center !important; */
  line-height: 66px !important;
  background: url(../assets/top_title.png) no-repeat center;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0px !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 0px !important;
  color: #303133;
}
.el-menu-item:not(.is-disabled):hover {
  background-color: #0a4271 !important;
}
</style>
