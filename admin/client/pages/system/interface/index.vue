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
  export default class Interface extends Vue {
    dataValue = ''
    columns = [
      {
        title: 'URL',
        key: 'url'
      },
      {
        title: 'method',
        key: 'method'
      },
      {
        title: '次数',
        key: 'times'
      },
      {
        title: '日期',
        key: 'dateTime'
      }
    ]
    data = [
      {
        url: 'api/collects/drug/one',
        method: 'get',
        times: '1',
        dateTime: '2019-03-08 00:00:00'
      }
    ]
    loading = false
    pagination = {
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
    options = {
      border: true
    }
    mounted () {
    }
    clear () {
      this.dataValue = ''
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
