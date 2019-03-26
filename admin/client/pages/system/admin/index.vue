<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
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
          text: '停用',
          type: 'text',
          emit: 'emit-stop',
          show (index, row) {
            if (row.activated === '在用') {
              return true
            }
          }
        },
        {
          text: '在用',
          type: 'text',
          emit: 'emit-run',
          show (index, row) {
            if (row.activated === '停用') {
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
          newArray[i].activated = '在用'
        } else {
          newArray[i].activated = '停用'
        }
      }
    }
    handleEditEvent ({index, row}) {
      // console.log(index)
      // console.log(row)
      this.$router.push('/system/admin/edit')
    }
    async handleStop ({index, row}) {
      let stop = this.rowHandle.custom
      for (let i = 0; i < stop.length; i++) {
        if (stop[i].text === '停用') {
          row.activated = '停用'
        }
      }
      console.log(typeof row.activated)
      // await axios.post(`/api/supervise/admins/${row.id}/activated`, {activated: row.activated}).then(res => {
      //   console.log(res)
      // })
    }
    async handleRun ({index, row}) {
      let run = this.rowHandle.custom
      for (let i = 0; i < run.length; i++) {
        if (run[i].text === '在用') {
          row.activated = '在用'
        }
      }
      // console.log(typeof row.activated)
      // await axios.post(`/api/supervise/admins/${row.id}/activated`, {activated: new Boolean(row.activated)}).then(res => {
      //   console.log(res)
      // })
    }
    async handleReset ({index, row}) {
      await axios.put(`/api/supervise/admins/${row.id}/reset`)
      this.initData()
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  /deep/.drug-table{
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
