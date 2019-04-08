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
      <el-button type="primary" size="small" @click="searchInterface">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="interList"
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
    columns = [
      {
        title: 'URL',
        key: 'uri'
      },
      {
        title: 'method',
        key: 'method'
      },
      {
        title: '次数',
        key: 'quantity'
      },
      {
        title: '日期',
        key: 'date'
      }
    ]
    interList = []
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
    }

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getInterface()
    }

    searchInterface () {
      if (this.beginEndDate) {
        for (let i = 0, len = this.beginEndDate.length; i < len; i++) {
          this.beginEndDate[i] = moment(this.beginEndDate[i]).format('YYYY-MM-DD')
        }

        this.startDate = this.beginEndDate[0] + ' 00:00:00'
        this.endDate = this.beginEndDate[1] + ' 23:59:59'
      }

      this.getInterface()
    }

    async getInterface () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        startDate: this.startDate,
        endDate: this.endDate
      }
      let {data: interData} = await axios.get(`/api/supervise/restStatistics`, {params})
      console.log(interData)

      this.interList = interData.list
      this.pagination.total = interData.total

      this.interList.forEach(item => {
        item.date = moment(item.date).format('YYYY-MM-DD hh:mm:ss')
      })
    }

    beforeMount () {
      this.getInterface()
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
