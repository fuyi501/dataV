<template>
<Row type="flex" justify="center" align="bottom">
  <Col :span="7"></Col>
  <Col :span="10">
    <div class="layout-title">
      中国石油陕西销售公司加油站现场 AI 管控系统
    </div>
  </Col>
  <Col :span="7" >
    <Menu mode="horizontal" active-name="1">
      <div class="layout-nav">
        <MenuItem name="1" to="/">
          <Icon type="md-home" />
          主页
        </MenuItem>
        <!-- <MenuItem name="2" to="/monitor">
          <Icon type="md-videocam" />
          智能监控
        </MenuItem> -->
        <MenuItem name="4" to="/analysis">
          <!-- <Icon type="md-analytics" /> -->
          <Icon type="md-stats" />
          智能分析
        </MenuItem>
        <MenuItem name="3" to="/events">
          <Icon type="md-alert" />
          报警事件
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
  height: 0rem !important;
  line-height: 5rem !important;
}
.ivu-menu-horizontal.ivu-menu-light:after {
  height: 0rem !important;
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
    height: 6rem;
    line-height: 6rem;
    font-size: 3.6rem;
    font-weight: bold;
    text-align: center;
    color: #4bdaff;
    border-radius: 0.3rem;
    // float: left;
    // position: relative;
    top: 1.5rem;
    border-bottom: 0.3rem solid #4bdaff;
    // left: 0px;
}
.ivu-menu-item {
  color: #fff !important;
  font-weight: bold;
  font-size: 1.6rem !important;
}

.layout-nav{
    // width: 82rem;
    height: 5rem;
    padding-left: 3rem;
    margin: 0 auto;
    // float: right;
}
</style>
