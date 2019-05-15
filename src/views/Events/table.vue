<template>
  <div>
    <Table :row-class-name="rowClassName"  :columns="columns10" :data="data9"></Table>
    <Page :total="100" show-elevator show-total style="text-align:left;margin:10px 0px;;"/>
  </div>
</template>
<script>
    import expandRow from './table-expand.vue';
    export default {
        components: { expandRow },
        data () {
            return {
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
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
                data9: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        job: 'Data engineer',
                        interest: 'badminton',
                        birthday: '1991-05-14',
                        book: 'Steve Jobs',
                        movie: 'The Prestige',
                        music: 'I Cry'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',
                        job: 'Data Scientist',
                        interest: 'volleyball',
                        birthday: '1989-03-18',
                        book: 'My Struggle',
                        movie: 'Roman Holiday',
                        music: 'My Heart Will Go On'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',
                        job: 'Data Scientist',
                        interest: 'volleyball',
                        birthday: '1989-03-18',
                        book: 'My Struggle',
                        movie: 'Roman Holiday',
                        music: 'My Heart Will Go On'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',
                        job: 'Data Scientist',
                        interest: 'volleyball',
                        birthday: '1989-03-18',
                        book: 'My Struggle',
                        movie: 'Roman Holiday',
                        music: 'My Heart Will Go On'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',
                        job: 'Data Scientist',
                        interest: 'volleyball',
                        birthday: '1989-03-18',
                        book: 'My Struggle',
                        movie: 'Roman Holiday',
                        music: 'My Heart Will Go On'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        job: 'Data Product Manager',
                        interest: 'tennis',
                        birthday: '1992-01-31',
                        book: 'Win',
                        movie: 'Jobs',
                        music: 'Don’t Cry'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        job: 'Data Analyst',
                        interest: 'snooker',
                        birthday: '1988-7-25',
                        book: 'A Dream in Red Mansions',
                        movie: 'A Chinese Ghost Story',
                        music: 'actor'
                    }
                ]
            }
        },
        methods: {
            rowClassName (row, index) {
              return 'demo-table-info-row';
            }
        }
    }
</script>

<style lang="less">
@table-background-color: #0a4271 !important;

.ivu-table {
  color: #fff !important;
}
.ivu-table .demo-table-info-row td{
  background-color: #01237C;
  color: greenyellow;
  font-size: 16px;
}
.ivu-table th {
  background-color: @table-background-color;
  font-size: 16px;
}
.ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
}
.ivu-table td.demo-table-info-column{
    background-color: #2db7f5;
    color: #fff;
}
.ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
}
.ivu-table .demo-table-info-cell-age {
    background-color: #ff6600;
    color: #fff;
}
.ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
}

.ivu-table-wrapper {
  border: 1px solid @table-background-color;
}
.ivu-table:after {
  background-color: @table-background-color;
}
.ivu-table td, .ivu-table th {
  border-bottom: 1px solid @table-background-color;
}
.ivu-page-next, .ivu-page-prev {
  background-color: #01237C !important;
}
.ivu-page-item {
  background-color: green !important;
  color: red !important;
}
.ivu-page-item a {
  color: white !important;
}
.ivu-page-item-active a {
  color: blue !important;
}
.ivu-page-options-elevator input {
  background-color: green !important;
  color: #fff !important;
}
</style>

