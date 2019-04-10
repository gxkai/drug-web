<template>
  <div class="warning-wrap">
    <div class="warning-list">
      <bread-crumb :path="$route.path"/>
      <d2-crud
        ref="d2Crud"
        :columns="columns"
        :data="warningList"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @dialog-cancel="handleDialogCancel"
        @pagination-current-change="paginationCurrentChange"
        @emit-view="viewDetail"
        @emit-storage="storageDrug"
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
  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class EarlyWarning extends Vue {
    warningList = [] // 预警列表

    columns = [
      {
        title: '序号',
        key: 'index',
        width: 60
      },
      {
        title: '通用名',
        key: 'name'
      }
    ]
    loading = false;
    pagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options = {
      border: true
    }
    rowHandle = {
      edit: {
        text: '查看',
        type: 'text',
        emit: 'viewDetail'
      },
      remove: {
        text: '入库',
        type: 'text',
        emit: 'storageDrug'
      }
    }

    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    }

    viewDetail ({row}) {

    }

    storageDrug () {

    }

    async fetchData () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      let {data: warn} = await axios.get(`/api/shop/stocks`, {params})
      console.log(warn)
      this.warningList = warn.list
      // this.pagination.total = data.data.total
      // this.commonNameData.forEach((item, index) => {
      //   item.index = (this.pagination.currentPage - 1) * this.pagination.pageSize + index + 1
      // })
    }

    beforeMount () {
      this.fetchData()
    }

    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    }
  }
</script>

<style lang="scss" scoped>
  .warning{
    &-wrap{
      padding: 0 10px;
      margin-bottom: 30px;
    }

    &-list{
      min-height: 850px;
      background: #FFF;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #E9E9E9;
    }

    &-search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e9e9e9;
      padding-bottom: 15px;

      .right{
        padding-right: 10px;
      }

      .el-input {
        margin: 0 10px;
      }
    }
  }
  /deep/.drug-table{
    padding: 0 10px;
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
</style>
