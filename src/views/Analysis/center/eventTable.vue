<template>
  <div style="height:305px;width:100%;background-color: rgba(0, 0, 0, 1);opacity:0.6">
    <Table height="305" style="background-color: rgba(0, 0, 0, 0.2);" :columns="columns1" :data="eventTableData"></Table>
  </div>
</template>
<script>
  export default {
    props: {
      eventTableData: Array
    },
    data() {
      return {
        columns1: [{
            title: '事件名称',
            key: 'eventName'
          },
          {
            title: '今日发生次数',
            key: 'todayCount'
          },
          {
            title: '昨日发生次数',
            key: 'yestodayCount'
          },
          {
            title: '与昨日相比',
            key: 'decreaseCount'
          },
          {
            title: '评分',
            key: 'score'
          }
        ],
        data2: [{
            eventName: '违规',
            todayCount: 18,
            yestodayCount: 12,
            decreaseCount: 6,
            score: -2
          }
        ]
      }
    },
    mounted() {
      console.log('%%%%%%%我的表格测试')
      console.log(this.data2.sort((a, b) => a.age - b.age))
      // setInterval(()=>{
      //   this.data2.push({
      //     name: 'Jon' + Math.random(),
      //     age: parseInt(Math.random()*100),
      //     address: 'Ottawa No. 2 Lake Park',
      //     date: '2016-10-04'
      //   })
      //   this.data2 = this.data2.sort((a,b)=> a.age - b.age).reverse()
      //   // this.data2 = JSON.parse(JSON.stringify(this.data2))
      // }, 2000)
    }
  }
</script>