<template>
  <div class="commonName--content">
    <div class="commonName--content__search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
      <el-input v-model="commonNameValue" placeholder="请输入通用名" style="width: 200px;"></el-input>
      <el-button type="primary" size="small">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <div>
      <d2-crud
        ref="d2Crud"
        :columns="columns"
        :data="data"
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
       />
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  @Component
  export default class commonName extends Vue {
    commonNameValue = ''
    columns = [
      {
        title: 'ID',
        key: 'commonId',
        width: 320
      },
      {
        title: '通用名',
        key: 'commonName'
      }
    ]
    data = [
      {
        commonId: '1',
        commonName: 'hlsp盐酸小檗碱片'
      },
      {
        commonId: '2',
        commonName: '补肾润肺口服液'
      },
      {
        commonId: '3',
        commonName: '补肾润3肺口服液'
      },
      {
        commonId: '4',
        commonName: '补肾润肺4口服液'
      },
      {
        commonId: '5',
        commonName: '补肾润肺5口服液'
      }
    ]
    loading = false;
    pagination = {
      currentPage: 1,
      pageSize: 5,
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
      commonId: {
        title: 'ID',
        value: ''
      },
      commonName: {
        title: '通用名',
        value: ''
      }
    }
    addTemplate = {
      commonId: {
        title: 'ID',
        value: ''
      },
      commonName: {
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
    clear () {
      this.commonNameValue = ''
    }
    handleRowEdit ({ index, row }, done) {
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
    handleRowRemove ({ index, row }, done) {
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
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    }
  }
</script>

<style lang="scss">
  .commonName--content{
    padding: 10px;
    &__search{
      display: flex;
      justify-content: Flex-start;
      align-items: center;
      .el-input{
        margin: 0 10px;
        &__inner{
          height: 34px !important;
          line-height: 34px !important;
        }
      }
    }
    .el-table{
      th{
        background-color: #F4F4F4;
        color: #555;
      }
    }
    .cell{
      .el-button+.el-button{
        margin-left: 5px;
        &::before{
          content: '|';
          padding-right: 5px;
          color: #eee;
        }
      }
    }
  }
</style>
