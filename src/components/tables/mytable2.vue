<template>
  <div style="height:300px;width:100%;background-color: rgba(0, 0, 0, 1);opacity:0.6">
    <Table height="300" style="background-color: rgba(0, 0, 0, 0.2);" :columns="columns1" :data="data2"></Table>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data2: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        mounted () {
          console.log('%%%%%%%我的表格测试')
          console.log(this.data2.sort((a,b)=> a.age - b.age))
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
