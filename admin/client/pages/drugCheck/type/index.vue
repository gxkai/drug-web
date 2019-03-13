<template>
  <div class="type--content">
    <bread-crumb :path="$route.path"/>
    <div class="type--content__search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
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
        @type-child-emit="handleChild"
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

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class TypeDrugs extends Vue {
    columns = [
      {
        title: 'ID',
        key: 'typeId',
        width: 320
      },
      {
        title: '类型名称',
        key: 'typeName'
      },
      {
        title: '排序',
        key: 'typeSort'
      }
    ]
    data = [
      {
        typeId: '1',
        typeName: '家庭常用',
        typeSort: '1'
      },
      {
        typeId: '2',
        typeName: '儿科用药',
        typeSort: '2'
      },
      {
        typeId: '3',
        typeName: '肠胃用药',
        typeSort: '3'
      },
      {
        typeId: '14',
        typeName: '呼吸系统',
        typeSort: '4'
      },
      {
        typeId: '5',
        typeName: '心脑血管',
        typeSort: '5'
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
      custom: [
        {
          text: '下级',
          type: 'text',
          emit: 'type-child-emit'
        }
      ],
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
      typeId: {
        title: 'ID',
        value: ''
      },
      typeName: {
        title: '类型名称',
        value: ''
      },
      typeSort: {
        title: '排序',
        value: ''
      }
    }
    addTemplate = {
      typeId: {
        title: 'ID',
        value: ''
      },
      typeName: {
        title: '类型名称',
        value: ''
      },
      typeSort: {
        title: '排序',
        value: ''
      }
    }
    formOptions = {
      labelWidth: '80px',
      labelPosition: 'right',
      saveLoading: false
    }
    addRules = {
      typeId: [ { required: true, message: '请输入ID', trigger: 'blur' } ],
      typeName: [ { required: true, message: '请输入类型名称', trigger: 'blur' } ],
      typeSort: [ { required: true, message: '请输入排序', trigger: 'blur' } ]
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
    handleChild () {
      this.$router.push('/drugCheck/type/typeChild')
    }
  }
</script>

<style lang="scss" scoped>
  .type--content{
    padding: 10px;
    &__search{
      display: flex;
      justify-content: Flex-start;
      align-items: center;
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
