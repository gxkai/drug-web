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
  import axios from 'axios'
  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class TypeDrugs extends Vue {
    columns = [
      {
        title: 'ID',
        key: 'id',
        width: 320
      },
      {
        title: '类型名称',
        key: 'type'
      },
      {
        title: '排序',
        key: 'sort'
      }
    ]
    data = []
    loading = false;
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
      type: {
        title: '类型名称',
        value: ''
      },
      sort: {
        title: '排序',
        value: ''
      }
    }
    addTemplate = {
      type: {
        title: '类型名称',
        value: ''
      },
      sort: {
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
      type: [ { required: true, message: '请输入类型名称', trigger: 'blur' } ],
      sort: [ { required: true, message: '请输入排序', trigger: 'blur' } ]
    }
    beforeMount () {
      this.initData()
    }
    async initData () {
      await axios.get(`/api/supervise/drugTypes/father`).then(res => {
        this.data = res.data
      })
    }
    async handleRowEdit ({ index, row }, done) {
      let getName = await axios.get(`/api/supervise/drugTypes/exists`, {params: {type: row.type}})
      if (getName.data >= 1) {
        this.$message({
          message: '类型名称已存在!',
          type: 'warning'
        })
        return false
      }
      let drugTypeADTO = {
        fileId: row.fileId,
        pid: row.pid,
        showed: row.showed,
        sort: row.sort,
        type: row.type
      }
      await axios.put(`/api/supervise/drugTypes/${row.id}`, drugTypeADTO)
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
      await axios.post(`/api/supervise/drugTypes/${row.id}`)
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
      let getName = await axios.get(`/api/supervise/drugTypes/exists`, {params: {type: row.type}})
      if (getName.data >= 1) {
        this.$message({
          message: '类型名称已存在!',
          type: 'warning'
        })
        return false
      }
      let drugTypeAdminDTO = {
        fileId: row.fileId,
        pid: row.pid,
        showed: row.showed,
        sort: row.sort,
        type: row.type
      }
      await axios.post(`/api/supervise/drugTypes`, drugTypeAdminDTO)
      this.initData()
      this.formOptions.saveLoading = true
      setTimeout(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    }
    handleChild ({index, row}) {
      this.$router.push({path: '/drugCheck/type/typeChild', query: {id: row.id, type: row.type}})
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
