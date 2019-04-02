<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="file-search">
      <el-date-picker
        size="small"
        v-model="dateValue"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="convertDate">
      </el-date-picker>
      <el-input size="small" v-model="inputValue" placeholder="请输入用户名"></el-input>
      <el-button type="primary" size="small" @click="search">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="loginlogData"
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
  import axios from 'axios'
  import moment from 'moment'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class LoginLog extends Vue {
    dateValue = '' // 日期区间
    startDate = '' // 起始日期
    endDate = '' // 截止日期

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
    loginlogData= []
    loading= false
    pagination= {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options= {
      border: true
    }
    convertDate () {
      if (this.dateValue) {
        for (let i = 0, len = this.dateValue.length; i < len; i++) {
          this.dateValue[i] = moment(this.dateValue[i]).format('YYYY-MM-DD')
        }
        this.startDate = this.dateValue[0] + ' 00:00:00'
        this.endDate = this.dateValue[1] + ' 23:59:59'
      }
    }
    beforeMount () {
      this.initData()
    }
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.initData()
    }
    async initData () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: 15
      }
      let data = await axios.get(`/api/supervise/loginLogs`, {params: params})
      this.loginlogData = data.data.list
      this.pagination.total = data.data.total
      this.loginlogData.forEach(e => {
        e.date = moment(e.date).format('YYYY-MM-DD HH:mm:ss')
        // e.end = ''
        // e.start = ''
      })
    }
    async search () {
      if (this.endDate === '' && this.startDate === '' && this.inputValue === '') {
        this.$message({
          message: '查询条件不能为空',
          type: 'warning'
        })
      }
      let params = {
        // end: this.endDate,
        // start: this.startDate,
        username: this.inputValue,
        pageNum: this.pagination.currentPage,
        pageSize: 15
      }
      let searchData = await axios.get(`/api/supervise/loginLogs`, {params: params})
      this.loginlogData = searchData.data.list
      this.pagination.total = searchData.data.total
      this.loginlogData.forEach(e => {
        e.date = moment(e.date).format('YYYY-MM-DD HH:mm:ss')
      })
    }
    clear () {
      this.dateValue = ''
      this.startDate = ''
      this.endDate = ''
      this.inputValue = ''
      this.initData()
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
