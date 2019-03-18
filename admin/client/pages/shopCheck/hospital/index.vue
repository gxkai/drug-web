<template>
  <div class="p10">
      <bread-crumb :path="$route.path"/>
      <div>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
      </div>
      <d2-crud
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @custom-emit-1="handleCustomEvent"
        @custom-emit-2="handleCustomEvent2"
        @custom-emit-3="handleCustomEvent2"
        @custom-emit-4="handleCustomEvent2"
        class="drug-table"
      />
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Hospital extends Vue {
    columns= [
      {
        title: '医院编码',
        key: 'hospitalId',
        width: 240
      },
      {
        title: '医院趣医编码',
        key: 'hospitalQyid'
      },
      {
        title: '医院名称',
        key: 'hospitalName'
      },
      {
        title: '经度',
        key: 'hospitalLng'
      },
      {
        title: '纬度',
        key: 'hospitalLat'
      },
      {
        title: '当前状态',
        key: 'curState'
      }
    ];
    data= [
      {
        hospitalId: '123',
        hospitalQyid: '456',
        hospitalName: '第一人民医院',
        hospitalLng: '121.023',
        hospitalLat: '30.456',
        curState: '在业'
      },
      {
        hospitalId: '123',
        hospitalQyid: '456',
        hospitalName: '第三人民医院',
        hospitalLng: '121.023',
        hospitalLat: '30.456',
        curState: '停业'
      },
      {
        hospitalId: '123',
        hospitalQyid: '456',
        hospitalName: '第三人民医院',
        hospitalLng: '121.023',
        hospitalLat: '30.456',
        curState: '停业'
      }
    ];
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    };
    options= {
      border: true
    };
    rowHandle= {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'custom-emit-1',
          show (index, row) {
            if (row.curState === '在业' || row.curState === '停业') {
              return true
            }
          }
        },
        {
          text: '停业',
          type: 'text',
          emit: 'custom-emit-2',
          show (index, row) {
            if (row.curState === '在业') {
              return true
            }
          }
        },
        {
          text: '开业',
          type: 'text',
          emit: 'custom-emit-3',
          show (index, row) {
            if (row.curState === '停业') {
              return true
            }
          }
        },
        {
          text: '编辑',
          type: 'text',
          emit: 'custom-emit-4',
          show (index, row) {
            if (row.curState === '在业' || row.curState === '停业') {
              return true
            }
          }
        }
      ]
    };
    mounted () {
    }
    handleCustomEvent ({index, row}) {
      this.$router.push('/shopCheck/hospital/detail')
      // this.$message.success(index.toString())
      console.log(index)
      console.log(row)
    }
    handleCustomEvent2 () {
      this.$router.push('/shopCheck/hospital/detail')
    }
    addRow () {
      this.$router.push('/shopCheck/hospital/create')
    }
  }
</script>

<style lang="scss" scoped>
  .p10{
    padding:5px 10px;
  }
  /deep/.drug-table{
    margin-top: 10px;
    .d2-crud-body{
      padding: 0 !important;
      .el-table{
        th{
          background-color: #F4F4F4 !important;
          color: #555 !important;
        }
        td{
          .cell{
            /deep/.el-button+.el-button{
              margin-left: 5px;
              &::before{
                content: '|';
                padding-right: 5px;
                color: #eee;
              }
            }
          }
        }
      }
    }
  }
</style>
