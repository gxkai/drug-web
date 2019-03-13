<template>
  <div class="common--content">
    <bread-crumb :path="$route.path"/>
    <div class="common--content__search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
      <el-input v-model="commonNameValue" size="small" placeholder="请输入类型名称" style="width: 200px;"></el-input>
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
        :form-options="formOptions"
        @edit-custom="editCustom"
        @row-remove="handleRowRemove"
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
  export default class TypeChild extends Vue {
    commonNameValue = ''
    columns = [
      {
        title: 'ID',
        key: 'typeId',
        width: 240
      },
      {
        title: '类型名称',
        key: 'typeName'
      },
      {
        title: '父类名称',
        key: 'fatherTypeName'
      },
      {
        title: '排序',
        key: 'typeSort'
      },
      {
        title: '是否显示',
        key: 'isShow'
      }
    ]
    data = [
      {
        typeId: '1',
        typeName: '小儿感冒',
        fatherTypeName: '儿科用药',
        typeSort: '1',
        isShow: '是'
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
          text: '编辑',
          type: 'text',
          emit: 'edit-custom'
        }
      ],
      remove: {
        text: '删除',
        type: 'text',
        confirm: true
      }
    }
    formOptions = {
      labelWidth: '80px',
      labelPosition: 'right',
      saveLoading: false
    }
    clear () {
      this.commonNameValue = ''
    }
    addRow () {
      this.$router.push('/drugCheck/type/typeChild/create')
    }
    editCustom () {
      this.$router.push('/drugCheck/type/typeChild/edit')
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
