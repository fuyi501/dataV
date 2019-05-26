<template>
<Row type="flex" justify="center" align="bottom">
  <Col :span="8"></Col>
  <Col :span="8">
    <div class="layout-title">
      中国石油智能现场AI管控系统
    </div>
  </Col>
  <Col :span="8" >
    <Menu mode="horizontal" active-name="1">
      <div class="layout-nav">
        <MenuItem name="1" to="/">
          <Icon type="md-home" />
          主页
        </MenuItem>
        <MenuItem name="2" to="/monitor">
          <Icon type="md-videocam" />
          智能监控
        </MenuItem>
        <MenuItem name="4" to="/analysis">
          <!-- <Icon type="md-analytics" /> -->
          <Icon type="md-stats" />
          智能分析
        </MenuItem>
        <MenuItem name="3" to="/events">
          <Icon type="md-alert" />
          报警事件
        </MenuItem>
        <MenuItem name="5" to="/test">
          <Icon type="md-alert" />
          测试页面
        </MenuItem>
      </div>
    </Menu>
  </Col>



</Row>

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
  line-height: 50px !important;
}
.ivu-menu-horizontal.ivu-menu-light:after {
  height: 0px !important;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active {
  color: #fff !important;
  background-color: #1081b3;
}
.ivu-layout-header {
  background-color: #01237C !important;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    // position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-title{
    // width: 600px;
    height: 80px;
    line-height: 80px;
    font-size: 46px;
    font-weight: bold;
    text-align: center;
    color: #4bdaff;
    border-radius: 3px;
    // float: left;
    // position: relative;
    top: 15px;
    border-bottom: 3px solid #4bdaff;
    // left: 0px;
}
.ivu-menu-item {
  color: #fff !important;
  font-weight: bold;
  font-size: 1.6rem !important;
}

.layout-nav{
    // width: 820px;
    height: 50px;
    padding-left: 30px;
    margin: 0 auto;
    // float: right;
}
// .layout{
//   border: 1px solid #d7dde4;
//   background: #f5f7f9;
//   position: relative;
//   border-radius: 4px;
//   overflow: hidden;
// }
// .layout-title{
//   width: 100px;
//   height: 30px;
//   background: #5b6270;
//   border-radius: 3px;
//   float: left;
//   position: relative;
//   top: 15px;
//   left: 20px;
// }
// .layout-nav{
//   width: 420px;
//   margin: 0 auto;
//   margin-right: 20px;
// }
</style>
