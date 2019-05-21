<template>
  <div class="home" :style="{height: contentHeight}">
    <!-- 左侧 -->
    <Row type="flex" justify="start" :gutter="20">
      <Col :span="24">
        <Row   type="flex" justify="start" :gutter="20" >
          <i-col :span="6" v-for="(item, i) in videoInfo" :key="`info-${i}`" style="margin-bottom:30px;">
            <Card>
              <p slot="title" style="">{{ item.title }}</p>
              <div >
                <MyVideo :src="item.videoSrc"></MyVideo>
              </div>
            </Card>
          </i-col>
        </Row>
      </Col>

      <!-- 右侧 -->
      <!-- <Col :span="8">
        <Row :gutter="20">
          <i-col :span="12" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
            <infor-card shadow :leftColor="infor.leftColor" :rightColor="infor.rightColor" :icon="infor.icon" :icon-size="56">
              <count-to :end="infor.count" count-class="count-style"/>
              <p style="color:#fff">{{ infor.title }}</p>
            </infor-card>
          </i-col>
        </Row>
        <Row style="margin: 10px 0px;">
          <chart-line :text="lineData.title" :xAxisData="lineData.xAxisData" :seriesData="[...lineData.seriesData]"/>
        </Row>
      </Col> -->

    </Row>
  </div>
</template>

<script>
import MyVideo from '@/components/myvideo/MyVideo'
import CountTo from '@/components/count-to'
import InforCard from '@/components/infocard/InforCard.vue'
import { ChartLine, ChartBar } from '@/components/charts'

export default {
  name: "home",
  components: {
    MyVideo,
    InforCard,
    CountTo,
    ChartLine
  },
  data() {
    return {
      contentHeight: "",
      videoInfo: [
        // { title: '加油站1', videoSrc: 'rtmp://live.hkstv.hk.lxdns.com/live/hks1'},
        // { title: '加油站2', videoSrc: 'rtmp://58.200.131.2:1935/livetv/hunantv'},
        { title: '明德门收银台', videoSrc: 'rtmp://10.202.114.186/live/mingdemen_1'},
        { title: '明德门站', videoSrc: 'rtmp://10.202.114.186/live/mingdemen_2'},
        { title: '明德门全景1', videoSrc: 'rtmp://10.202.114.186/live/mingdemen_3'},
        { title: '明德门站1', videoSrc: 'rtmp://10.202.114.186/live/mingdemen_4'},
        { title: '明德门站2', videoSrc: 'rtmp://10.202.114.186/live/mingdemen_5'},
        { title: '明德门站3', videoSrc: 'rtmp://10.202.114.186/live/mingdemen_6'},
        { title: '明德门站4', videoSrc: 'rtmp://10.202.114.186/live/mingdemen_7'},
        { title: '明德门站', videoSrc: 'rtmp://10.202.114.186/live/mingdemen_9'}
      ],
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, leftColor: '#2d8cf0', rightColor: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 232, leftColor: '#19be6b', rightColor: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, leftColor: '#ff9900', rightColor: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, leftColor: '#ed3f14', rightColor: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, leftColor: '#E46CBB', rightColor: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, leftColor: '#9A66E4', rightColor: '#9A66E4' }
      ],
      lineData: {
        title: '每周用户活跃量',
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: [
          { data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' },
          { data: [120, 232, 401, 534, 5290, 3330, 2320], type: 'line', areaStyle: {} }
        ]
      }
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
    window.onresize = function temp() {
      this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
      console.log(this.contentHeight);
    };
    setInterval( () => {
      this.lineData.seriesData[0].data.shift();
      this.lineData.seriesData[0].data.push(this.random(100, 1000));
    }, 3000)
  },
  methods: {
    random(lower, upper) {
      return Math.floor(Math.random() * (upper - lower)) + lower;
    }
  }
};
</script>

<style >
.ivu-card-bordered {
  border: 1px solid #0a4271 !important;
  border-color: #0a4271 !important;
}
.ivu-card-head {
  padding: 4px 15px !important;
  border-bottom: 1px solid #0b0f34 !important;
  /* background-color: #13a4c2 !important; */
  background-color: #0b0f34 !important;
  background-image: url('../../assets/title-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.ivu-card-head p{
  font-size: 1.6rem !important;
  line-height: 16px;
  margin-top: 4px;
  color: #fff !important;
  text-align: left;
}
.ivu-card-body {
  padding: 0px !important;
}
.count-style{
  font-size: 50px;
  color: #fff;
}
</style>

