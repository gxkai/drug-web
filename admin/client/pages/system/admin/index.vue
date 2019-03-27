<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="pharm-search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="adminData"
      :loading="loading"
      :pagination="pagination"
      :options="options"
      :rowHandle="rowHandle"
      @emit-edit="handleEditEvent"
      @emit-stop="handleStop"
      @emit-run="handleRun"
      @emit-reset="handleReset"
      class="drug-table"
    />
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
  export default class AdminIndex extends Vue {
    columns= [
      {
        title: '序号',
        key: 'id'
      },
      {
        title: '名字',
        key: 'name'
      },
      {
        title: '账号',
        key: 'username'
      },
      {
        title: '角色',
        key: 'roleId'
      },
      {
        title: '最后一次登录时间',
        key: 'lastLoginDate'
      },
      {
        title: '状态',
        key: 'activated'
      }
    ]
    adminData= []
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options= {
      border: true
    }
    rowHandle= {
      width: 250,
      custom: [
        {
          text: '修改',
          type: 'text',
          emit: 'emit-edit'
        },
        {
          text: '不可用',
          type: 'text',
          emit: 'emit-stop',
          show (index, row) {
            if (row.activated === '可用') {
              return true
            }
          }
        },
        {
          text: '可用',
          type: 'text',
          emit: 'emit-run',
          show (index, row) {
            if (row.activated === '不可用') {
              return true
            }
          }
        },
        {
          text: '重置密码',
          type: 'text',
          emit: 'emit-reset'
        }
      ]
    }
    beforeMount () {
      this.initData()
    }
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.initData()
    }
    async initData () {
      let params = {
        activated: '',
        name: '',
        roleId: '',
        username: '',
        pageNum: this.pagination.currentPage,
        pageSize: 15
      }
      let data = await axios.get(`/api/supervise/admins`, {params: params})
      // console.log(data)
      this.adminData = data.data.list
      this.pagination.total = data.data.total
      let newArray = this.adminData
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].activated.toString() === 'true') {
          newArray[i].activated = '可用'
        } else {
          newArray[i].activated = '不可用'
        }
      }
    }
    handleEditEvent ({index, row}) {
      this.$router.push({path: '/system/admin/edit', query: {id: row.id}})
    }
    async handleStop ({index, row}) {
      await axios.post(`/api/supervise/admins/${row.id}/activated?activated=` + false)
      this.initData()
    }
    async handleRun ({index, row}) {
      await axios.post(`/api/supervise/admins/${row.id}/activated?activated=` + true)
      this.initData()
    }
    async handleReset ({index, row}) {
      await axios.put(`/api/supervise/admins/${row.id}/reset`)
      this.initData()
    }
    addRow () {
      this.$router.push('/system/admin/create')
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
