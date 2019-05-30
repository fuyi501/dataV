<template>
  <Row :gutter="20">
    <i-col :span="8" v-for="(infor, i) in infoCardData" :key="`infor-${i}`" style="height:100px;padding-bottom:8px;">
      <infor-card shadow :leftColor="infor.leftColor" :rightColor="infor.rightColor" :icon="infor.icon" :icon-size="56">
        <count-to :end="infor.count" count-class="count-style">
          <span v-if="i < 3" slot="right" style="margin-left:5px;color:#fff;">分</span>
          <span v-if="i === 3" slot="right" style="margin-left:5px;color:#fff;">辆</span>
          <span v-if="i === 4" slot="right" style="margin-left:5px;color:#fff;">人</span>
          <span v-if="i === 5" slot="right" style="margin-left:5px;color:#fff;">分钟</span>
        </count-to>
        <div style="color:#fff;font-size:1.8rem;margin-top:-10px;">{{ infor.title }}</div>
      </infor-card>
    </i-col>
  </Row>
</template>

<script>
// 信息卡片组件
import CountTo from '@/components/count-to'
import InforCard from '@/components/infocard/InforCard.vue'

export default {
  components: {
    CountTo,
    InforCard,
  },
  props: {
    infoCardData: Array
  },
  data () {
    return {}
  },
  watch: {
  }
}
</script>

<style lang="less">

</style>

