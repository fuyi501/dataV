<template>
  <div style="text-align:center;">
    <div class="countSum">
      <p style="font-size:10px;height:24px;line-height:24px;color:#fff;">卸油口开启</p>
      <p style="height:50px;line-height:50px;">{{xieyoukouOpen}} 次</p>
    </div>
    <div class="countSum">
      <p style="font-size:10px;height:24px;line-height:24px;color:#fff;">油罐车到达</p>
      <p style="height:50px;line-height:50px;">{{youguancheDao}} 次</p>
    </div>
    <div class="countSum">
      <p style="font-size:10px;height:24px;line-height:24px;color:#fff;">消防器材</p>
      <p style="height:50px;line-height:50px;font-size:24px;">{{xiaofang}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    xieyoukouOpen: Number,
    youguancheDao: Number,
    xiaofang: String
  }
}
</script>

<style lang="less">
.countSum {
  display: inline-block;
  padding: 10px;
  margin: 10px 10px;
  font-size: 24px;
  color: #20D1D2;
  height: 80px;
  width: 140px;
  vertical-align: middle;
  border: 1px solid #1081B2;
  border-radius: 4px;
}
</style>

