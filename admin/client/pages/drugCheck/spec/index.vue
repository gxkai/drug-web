<template>
  <div class="common--content">
    <bread-crumb :path="$route.path"/>
    <div class="common--content__search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增规格</el-button>
      <el-input v-model="commonNameValue" size="small" placeholder="请输入规格名称" style="width: 200px;"></el-input>
      <el-button type="primary" size="small" @click="searchSpec">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <div>
      <d2-crud
        ref="d2Crud"
        :columns="columns"
        :data="specList"
        :loading="loading"
        :pagination="pagination"
        @pagination-current-change="paginationCurrentChange"
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
  export default class Spec extends Vue {
    commonNameValue = ''
    columns = [
      {
        title: '序号',
        key: 'index',
        width: 320
      },
      {
        title: '规格名称',
        key: 'name'
      }
    ]
    specList = []
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
      name: {
        title: '规格名称',
        value: ''
      }
    }
    addTemplate = {
      name: {
        title: '规格名称',
        value: ''
      }
    }
    formOptions = {
      labelWidth: '80px',
      labelPosition: 'right',
      saveLoading: false
    }
    addRules = {
      specId: [ { required: true, message: '请输入ID', trigger: 'blur' } ],
      specName: [ { required: true, message: '请输入规格名称', trigger: 'blur' } ]
    }
    clear () {
      this.commonNameValue = ''
    }

    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    }

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getAllSpecs()
    }

    // 编辑
    async handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      let params = {
        name: row.name
      }
      await axios.put(`/api/supervise/specs/${row.id}`, params)
      setTimeout(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    }

    // 删除
    async handleRowRemove ({ index, row }, done) {
      await axios.delete(`/api/supervise/specs/${row.id}`)
      setTimeout(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
        this.pagination.total -= 1
        // this.getAllSpecs()
      }, 300)
    }

    // 新增
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    }

    async handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      let params = {
        name: row.name
      }
      await axios.post(`/api/supervise/specs`, params)
      setTimeout(() => {
        // console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
      this.getAllSpecs()
    }

    searchSpec () {
      this.getAllSpecs()
    }

    async getAllSpecs () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        name: this.commonNameValue.trim()
      }
      let {data: specs} = await axios.get(`/api/supervise/specs`, {params})
      this.specList = specs.list
      this.pagination.total = specs.total

      this.specList.forEach((item, index) => {
        item.index = (this.pagination.currentPage - 1) * this.pagination.pageSize + index + 1
      })
    }

    mounted () {
      this.getAllSpecs()
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
