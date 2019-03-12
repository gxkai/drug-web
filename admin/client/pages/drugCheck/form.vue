<template>
  <div class="form--content">
    <div class="form--content__search">
      <el-input v-model="commonNameValue" placeholder="请输入药剂名称" style="width: 200px;"></el-input>
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
        @dialog-cancel="handleDialogCancel"
        @form-data-change="handleFormDataChange"
        @row-remove="handleRowRemove"
      />
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  @Component
  export default class Form extends Vue {
    commonNameValue = ''
    columns = [
      {
        title: 'ID',
        key: 'formId',
        width: 320
      },
      {
        title: '编码',
        key: 'formNumber'
      },
      {
        title: '剂型名称',
        key: 'formName'
      }
    ]
    data = [
      {
        formId: '1',
        formNumber: '冲剂',
        formName: '冲剂'
      },
      {
        formId: '2',
        formNumber: '冲剂',
        formName: '冲剂'
      },
      {
        formId: '3',
        formNumber: '冲剂',
        formName: '冲剂'
      },
      {
        formId: '4',
        formNumber: '冲剂',
        formName: '冲剂'
      },
      {
        formId: '5',
        formNumber: '冲剂',
        formName: '冲剂'
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
      formId: {
        title: 'ID',
        value: ''
      },
      formNumber: {
        title: '编码',
        value: ''
      },
      formName: {
        title: '剂型名称',
        value: ''
      }
    }
    formOptions = {
      labelWidth: '80px',
      labelPosition: 'left',
      saveLoading: false
    }
    clear () {
      this.commonNameValue = ''
    }
    handleFormDataChange ({ key, value }) {
      // console.log(key)
      // console.log(value)
    }
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        // console.log(index)
        // console.log(row)
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
        message: '取消编辑',
        type: 'warning'
      })
      done()
    }
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        // console.log(index)
        // console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    }
  }
</script>

<style lang="scss">
  .form--content{
    padding: 10px;
    &__search{
      display: flex;
      justify-content: Flex-start;
      align-items: center;
      .el-input{
        margin-right: 10px;
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
