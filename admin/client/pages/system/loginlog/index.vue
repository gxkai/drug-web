<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="file-search">
      <el-date-picker
        size="small"
        v-model="dataValue"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input size="small" v-model="username" placeholder="请输入用户名"></el-input>
      <el-button type="primary" size="small">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :options="options"
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
  export default class LoginLog extends Vue {
    dataValue = ''
    username = ''
    columns= [
      {
        title: '用户名',
        key: 'loginName'
      },
      {
        title: '登陆类型',
        key: 'loginType'
      },
      {
        title: '登陆方式',
        key: 'loginWay'
      },
      {
        title: '登陆日期',
        key: 'loginData'
      }
    ]
    data= [
      {
        loginName: '15995600001',
        loginType: '会员',
        loginWay: '会员',
        loginData: '2019-03-19 09:13:33'
      }
    ]
    loading= false
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
    options= {
      border: true
    }
    mounted () {
    }
    clear () {
      this.dataValue = ''
      this.username = ''
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  /deep/.file-search{
    display: flex;
    justify-content: Flex-start;
    align-items: center;
    .el-date-editor{
      margin-right: 10px;
    }
    .el-input{
      width: 150px;
      margin-right: 10px;
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
