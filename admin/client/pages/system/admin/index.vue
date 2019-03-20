<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :options="options"
      :rowHandle="rowHandle"
      @emit-edit="handleEditEvent"
      @emit-stop="handleStop"
      @emit-run="handleRun"
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
  export default class DrugShop extends Vue {
    columns= [
      {
        title: '序号',
        key: 'adminId',
        width: 60
      },
      {
        title: '名字',
        key: 'name'
      },
      {
        title: '账号',
        key: 'account'
      },
      {
        title: '角色',
        key: 'role'
      },
      {
        title: '最后一次登录时间',
        key: 'lastLogin',
        width: 240
      },
      {
        title: '状态',
        key: 'curState'
      }
    ]
    data= [
      {
        adminId: '1',
        name: '哈哈',
        account: '147',
        role: '管理员',
        lastLogin: '2019-03-15 15:39:33',
        curState: '在用'
      },
      {
        adminId: '2',
        name: '呵呵',
        account: '123',
        role: '管理员',
        lastLogin: '2019-03-15 15:39:33',
        curState: '停用'
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
            if (row.curState === '在用') {
              return true
            }
          }
        },
        {
          text: '在用',
          type: 'text',
          emit: 'emit-run',
          show (index, row) {
            if (row.curState === '停用') {
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
    mounted () {
    }
    handleEditEvent ({index, row}) {
      // this.$message.success(index.toString())
      console.log(index)
      console.log(row)
      this.$router.push('/system/admin/edit?adminId=' + row.adminId)
    }
    handleStop ({index, row}) {
      let stop = this.rowHandle.custom
      for (let i = 0; i < stop.length; i++) {
        if (stop[i].text === '停用') {
          row.curState = '停用'
        }
      }
    }
    handleRun ({index, row}) {
      let run = this.rowHandle.custom
      for (let i = 0; i < run.length; i++) {
        if (run[i].text === '在用') {
          row.curState = '在用'
        }
      }
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
