<template>
  <div class="common--content">
    <bread-crumb :path="$route.path"/>
    <div class="common--content__search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
      <el-input v-model="commonNameValue" size="small" placeholder="请输入通用名" style="width: 200px;"></el-input>
      <el-button type="primary" size="small" @click="search">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <div>
      <d2-crud
        ref="d2Crud"
        :columns="columns"
        :data="commonNameData"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        :edit-template="editTemplate"
        :form-options="formOptions"
        @row-edit="handleRowEdit"
        @row-remove="handleRowRemove"
        @row-add="handleRowAdd"
        add-title="我的新增"
        :add-template="addTemplate"
        :add-rules="addRules"
        @dialog-cancel="handleDialogCancel"
        @pagination-current-change="paginationCurrentChange"
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
  export default class CommonName extends Vue {
    commonNameValue = ''
    columns = [
      {
        title: 'ID',
        key: 'id',
        width: 320
      },
      {
        title: '通用名',
        key: 'name'
      }
    ]
    commonNameData = []
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
      columnHeader: '操作',
      edit: {
        text: '编辑',
        type: 'text'
      },
      remove: {
        text: '删除',
        type: 'text',
        confirm: true
      }
    }
    editTemplate = {
      id: {
        title: 'ID',
        value: ''
      },
      name: {
        title: '通用名',
        value: ''
      }
    }
    addTemplate = {
      name: {
        title: '通用名',
        value: ''
      }
    }
    formOptions = {
      labelWidth: '80px',
      labelPosition: 'right',
      saveLoading: false
    }
    addRules = {
      commonId: [ { required: true, message: '请输入ID', trigger: 'blur' } ],
      commonName: [ { required: true, message: '请输入通用名', trigger: 'blur' } ]
    }
    beforeMount () {
      this.fetchData()
    }
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
      this.search()
    }
    async fetchData () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: 15
      }
      let data = await axios.get(`/api/supervise/common/names`, {params: params})
      this.commonNameData = data.data.list
      this.pagination.total = data.data.total
    }
    clear () {
      this.commonNameValue = ''
    }
    async handleRowEdit ({ index, row }, done) {
      let getName = await axios.get(`/api/supervise/common/names/${row.id}/count`, {params: {name: row.name}})
      if (getName.data >= 1) {
        this.$message({
          message: '通用名已存在!',
          type: 'warning'
        })
        return false
      }
      await axios.put(`/api/supervise/common/names/${row.id}/update`, {id: row.id, name: row.name})
      this.formOptions.saveLoading = true
      setTimeout(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    }
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    }
    async handleRowRemove ({ index, row }, done) {
      await axios.post(`/api/supervise/common/names/${row.id}/delete`)
      setTimeout(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    }
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    }
    async handleRowAdd (row, done) {
      let getName = await axios.get(`/api/supervise/common/names/count`, {params: {name: row.name}})
      if (getName.data >= 1) {
        this.$message({
          message: '通用名已存在!',
          type: 'warning'
        })
        return false
      }
      await axios.post(`/api/supervise/common/names/create`, {name: row.name})
      this.fetchData()
      this.formOptions.saveLoading = true
      setTimeout(() => {
        // console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    }
    async search () {
      if (this.commonNameValue === '') {
        this.$message({
          message: '请输入通用名名称',
          type: 'warning'
        })
      }
      let params = {
        name: this.commonNameValue,
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      await axios.get(`/api/supervise/common/names`, {params: params}).then(res => {
        this.commonNameData = res.data.list
        this.pagination.total = res.data.total
      })
    }
  }
</script>

<style lang="scss" scoped>
  .common--content{
    padding: 10px;
    &__search{
      display: flex;
      justify-content: Flex-start;
      align-items: center;
      .el-input{
        margin: 0 10px;
      }
    }
  }
  /deep/.drug-table{
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
