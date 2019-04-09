<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="file-search">
      <el-date-picker
        size="small"
        v-model="beginEndDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input size="small" v-model="inputValue" placeholder="请输入用户名" style="width: 200px;margin-right: 10px;"></el-input>
      <el-button type="primary" size="small" @click="search">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="loginlogList"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"
      :options="options"
      class="drug-table"
    />
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import axios from 'axios'
  import moment from 'moment'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Interface extends Vue {
    beginEndDate = ''
    startDate = '' // 起始日期
    endDate = '' // 结束日期
    inputValue = ''
    columns= [
      {
        title: '用户名',
        key: 'username'
      },
      {
        title: '登陆类型',
        key: 'type'
      },
      {
        title: '登陆方式',
        key: 'mode'
      },
      {
        title: '登陆日期',
        key: 'date'
      }
    ]
    loginlogList = []
    loading = false
    pagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options = {
      border: true
    }

    clear () {
      this.beginEndDate = ''
      this.startDate = ''
      this.endDate = ''
      this.inputValue = ''
      this.getData()
    }

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getData()
    }
    beforeMount () {
      this.getData()
    }
    async getData () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        username: this.inputValue,
        startDate: this.startDate,
        endDate: this.endDate
      }
      let {data: loginData} = await axios.get(`/api/supervise/loginLogs`, {params})
      console.log(loginData)

      this.loginlogList = loginData.list
      this.pagination.total = loginData.total

      this.loginlogList.forEach(item => {
        item.date = moment(item.date).format('YYYY-MM-DD hh:mm:ss')
      })
    }
    // 查询
    async search () {
      if (this.beginEndDate) {
        for (let i = 0, len = this.beginEndDate.length; i < len; i++) {
          this.beginEndDate[i] = moment(this.beginEndDate[i]).format('YYYY-MM-DD')
        }
        this.startDate = this.beginEndDate[0] + ' 00:00:00'
        this.endDate = this.beginEndDate[1] + ' 23:59:59'
      }
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
    background: #FFF;
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
