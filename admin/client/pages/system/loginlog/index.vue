<template>
  <div class="log-wrap">
    <div class="log-list">
      <bread-crumb :path="$route.path"/>
      <div class="file-search">
        <el-date-picker
          size="small"
          style="width: 200px;"
          v-model="startDate"
          value-format="yyyy-MM-DD HH:mm:ss"
          type="datetime"
          placeholder="开始日期">
        </el-date-picker>
        <el-date-picker
          size="small"
          style="width: 200px;"
          v-model="endDate"
          value-format="yyyy-MM-DD HH:mm:ss"
          type="datetime"
          placeholder="结束日期">
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
    startDate = ''
    endDate = ''
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
        endDate: this.endDate,
        startDate: this.startDate,
        username: this.inputValue,
        pageNum: this.pagination.currentPage,
        pageSize: 15
      }
      await axios.get(`/api/supervise/loginLogs`, {params: params}).then(res => {
        this.loginlogData = res.data.list
        this.pagination.total = res.data.total
        this.loginlogData.forEach(e => {
          e.date = moment(e.date).format('YYYY-MM-DD HH:mm:ss')
          // console.log(e.date)
        })
      })
    }
    clear () {
      this.startDate = ''
      this.endDate = ''
      this.inputValue = ''
      this.initData()
    }
  }
</script>

<style scoped lang="scss">
  .log {
    &-wrap {
      padding: 0 10px;
      margin-bottom: 30px;
    }

    &-list {
      min-height: 850px;
      padding: 10px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;
    }
  }
  /deep/.file-search{
    display: flex;
    justify-content: Flex-start;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 15px;
    margin-bottom: 15px;
    padding-left: 10px;

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
