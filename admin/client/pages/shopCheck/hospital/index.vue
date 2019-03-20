<template>
  <div class="p10">
      <bread-crumb :path="$route.path"/>
      <div class="hospital-search">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
        <el-input v-model="hospitalNameValue" size="small" placeholder="请输入医院名称" style="width: 200px;"></el-input>
        <el-button type="primary" size="small">搜索</el-button>
        <el-button size="small" @click="clear">清空</el-button>
      </div>
      <d2-crud
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @emit-detail="handleDetailEvent"
        @emit-stop="handleStopEvent"
        @emit-run="handleRunEvent"
        @emit-edit="handleEditEvent"
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
    hospitalNameValue = ''
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
          emit: 'emit-detail',
          show (index, row) {
            if (row.curState === '在业' || row.curState === '停业') {
              return true
            }
          }
        },
        {
          text: '停业',
          type: 'text',
          emit: 'emit-stop',
          show (index, row) {
            if (row.curState === '在业') {
              return true
            }
          }
        },
        {
          text: '开业',
          type: 'text',
          emit: 'emit-run',
          show (index, row) {
            if (row.curState === '停业') {
              return true
            }
          }
        },
        {
          text: '编辑',
          type: 'text',
          emit: 'emit-edit',
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
    handleDetailEvent () {
      this.$router.push('/shopCheck/hospital/detail')
    }
    handleStopEvent ({index, row}) {
      let stop = this.rowHandle.custom
      for (let i = 0; i < stop.length; i++) {
        if (stop[i].text === '开业') {
          row.curState = '停业'
        }
      }
    }
    handleRunEvent ({index, row}) {
      let run = this.rowHandle.custom
      for (let i = 0; i < run.length; i++) {
        if (run[i].text === '停业') {
          row.curState = '在业'
        }
      }
    }
    handleEditEvent () {
      this.$router.push('/shopCheck/hospital/detail')
    }
    addRow () {
      this.$router.push('/shopCheck/hospital/create')
    }
    clear () {
      this.hospitalNameValue = ''
    }
  }
</script>

<style lang="scss" scoped>
  .p10{
    padding:5px 10px;
  }
  .hospital-search{
    display: flex;
    justify-content: Flex-start;
    align-items: center;
    .el-input{
      margin: 0 10px;
    }
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
