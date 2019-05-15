<template>
  <Menu mode="horizontal" active-name="1">
    <div class="layout-logo"> 中国石油智能监控管控系统 </div>
    <div class="layout-nav">
      <MenuItem name="1" to="/">
        <Icon type="md-home" />
        首页
      </MenuItem>
      <MenuItem name="2" to="/monitor">
        <Icon type="md-videocam" />
        智能监控
      </MenuItem>
      <MenuItem name="3" to="/events">
        <Icon type="md-alert" />
        报警事件
      </MenuItem>
      <MenuItem name="4">
        <!-- <Icon type="md-analytics" /> -->
        <Icon type="md-stats" />
        智能分析
      </MenuItem>
    </div>
  </Menu>
</template>

<script>
export default {
  components: {

  }
}
</script>


<style lang="less">
.ivu-menu-horizontal {
  height: 0px !important;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active {
  color: #fff !important;
  background-color: #1081b3;
}
.ivu-layout-header {
  background-color: #0d4879 !important;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    // width: 600px;
    line-height: 28px;
    font-size: 28px;
    font-weight: bold;
    text-align: left !important;
    color: #4bdaff;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 0px;
}
.ivu-menu-item {
  color: #fff !important;
  font-weight: bold;
  font-size: 1.6rem !important;
}

.layout-nav{
    width: 620px;
    padding-left: 30px;
    margin: 0 auto;
    float: left;
}
.layout-footer-center{
    text-align: center;
}
</style>
