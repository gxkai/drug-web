<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="pharm-search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
      <el-input v-model="roleNameValue" size="small" placeholder="请输入角色名称" style="width: 150px;"></el-input>
      <el-button type="primary" size="small">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :options="options"
      :rowHandle="rowHandle"
      @emit-edit="handleEdit"
      @row-remove="handleRowRemove"
      class="drug-table"
    />
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
  export default class Role extends Vue {
    roleNameValue = ''
    columns = [
      {
        title: 'ID',
        key: 'roleId'
      },
      {
        title: '角色名称',
        key: 'roleName'
      },
      {
        title: '角色描述',
        key: 'roleDescription'
      }
    ]
    data = [
      {
        roleId: 'MkeNsdeWQAS_cUxKNUkn2g',
        roleName: '管理员',
        roleDescription: '管理员管理员管理员管理员管理员管理员'
      },
      {
        roleId: 'z1R7wJdNS7KLN4CemAe0Ug',
        roleName: '卫计委',
        roleDescription: '卫计委卫计委卫计委卫计委卫计委卫计委'
      }
    ]
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
    options= {
      border: true
    }
    rowHandle= {
      custom: [
        {
          text: '编辑',
          type: 'text',
          emit: 'emit-edit'
        }
      ],
      remove: {
        type: 'text',
        size: 'small',
        confirm: true
      }
    }
    mounted () {
    }
    handleEdit ({index, row}) {
      this.$router.push('/system/role/edit')
    }
    addRow () {
      this.$router.push('/system/role/create')
    }
    clear () {
      this.roleNameValue = ''
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

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  .pharm-search{
    display: flex;
    justify-content: Flex-start;
    align-items: center;
    .el-input{
      margin: 0 10px;
    }
    .el-select{
      width: 150px;
      margin-left: 5px;
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
