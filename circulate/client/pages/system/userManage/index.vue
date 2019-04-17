<template>
  <div class="user-wrap">
    <div class="user-list">
      <bread-crumb :path="$route.path"/>
      <div class="pharm-search">
        <h3>用户管理</h3>
        <el-button type="primary" @click="addRow" style="background: #169bd5;">新增</el-button>
      </div>
      <d2-crud
        ref="d2Crud"
        :columns="columns"
        :data="userList"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @emit-view="viewDetail"
        @emit-stop="stopUser"
        @emit-reset="reset"
        @pagination-current-change="paginationCurrentChange"
        class="drug-table"/>
    </div>

    <!--查看-->
    <el-dialog
      title="查看"
      :visible.sync="viewDialogVisible"
      width="30%">
      <el-form ref="viewForm" :model="viewData" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="viewData.username" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="viewData.name" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="viewData.mobile" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="viewData.roleName" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="viewData.jobStatus" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="最后操作日期">
          <el-input v-model="viewData.lastModifiedDate" readonly placeholder="暂无"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--新增-->
    <el-dialog
      title="新增"
      :visible.sync="addDialogVisible"
      width="30%">
      <el-form ref="viewForm" :model="addData" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="addData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addData.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="addData.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="addData.roleName"
            style="width: 100%;"
            placeholder="请选择用户类型">
            <el-option
              v-for="(item, index) in typeOption"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="addData.jobStatus"
            style="width: 100%;"
            placeholder="请选择用户状态">
            <el-option
              v-for="(item, index) in statusOption"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import axios from 'axios'
  import moment from 'moment'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class User extends Vue {
    viewDialogVisible = false
    addDialogVisible = false
    viewData = {}
    userList = []

    columns= [
      {
        title: '用户名',
        key: 'username'
      },
      {
        title: '姓名',
        key: 'name'
      },
      {
        title: '手机',
        key: 'mobile'
      },
      {
        title: '类型',
        key: 'roleName'
      },
      {
        title: '状态',
        key: 'jobStatus'
      },
      {
        title: '最后操作日期',
        key: 'lastModifiedDate'
      }
    ]
    pagination= {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }

    options= {
      border: true
    }

    addData = {
      username: '',
      name: '',
      mobile: '',
      roleName: '',
      jobStatus: ''
    }

    // 用户状态
    statusOption = [
      {
        label: '在职',
        value: true
      },
      {
        label: '离职',
        value: false
      }
    ]

    // 用户类型
    typeOption = [
      {
        label: '配送员',
        value: 'ROLE_CIRCULATE_COURIER'
      },
      {
        label: '营业员',
        value: 'ROLE_CIRCULATE_SHOP'
      }
    ]

    rowHandle= {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'emit-view'
        },
        {
          text: '停用',
          type: 'text',
          emit: 'emit-stop'
        },
        {
          text: '重置密码',
          type: 'text',
          emit: 'emit-reset'
        }
      ]
    }

    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.initData()
    }

    // 打开新增弹框
    addRow () {
      this.addDialogVisible = true
    }

    // 新增用户
    async confirmAdd () {
      console.log(this.addData)
      this.addDialogVisible = false
    }

    // 查看
    viewDetail ({row}) {
      this.viewDialogVisible = true
      this.viewData = row
    }

    // 停用
    stopUser ({row}) {

    }

    // 重置密码
    reset ({row}) {

    }

    async initData () {
      let params = new FormData()
      params.append('pageNum', this.pagination.currentPage)
      params.append('pageSize', this.pagination.pageSize)
      params.append('shopId', 'Vwwy8nJYQJCQ4wqkCZDgyA')

      let {data: user} = await axios.get(`/api/shop/users`, {params})
      console.log(user)
      this.pagination.total = user.total
      this.userList = user.list

      this.userList.forEach(item => {
        if (item.lastModifiedDate) {
          item.lastModifiedDate = moment(item.lastModifiedDate).format('YY-MM-DD HH:ss:mm')
        }
        if (item.activated) {
          item.jobStatus = '在职'
        } else {
          item.jobStatus = '离职'
        }

        if (item.roleId === 'ROLE_CIRCULATE_COURIER') {
          item.roleName = '配送员'
        }
        if (item.roleId === 'ROLE_CIRCULATE_SHOP') {
          item.roleName = '营业员'
        }
      })
    }

    beforeMount () {
      this.initData()
    }
  }
</script>

<style scoped lang="scss">
  .user{
    &-wrap{
      padding: 0 10px;
      margin-bottom: 30px;
    }

    &-list{
      min-height: 850px;
      padding: 10px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .pharm-search{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e9e9e9;
        padding: 0 15px;
      }
    }
  }

  /deep/.drug-table{
    margin-top: 15px;
    .d2-crud-body{
      padding: 0  15px !important;
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
