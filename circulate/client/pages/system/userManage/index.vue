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
        :form-options="formOptions"

        add-title="新增用户"
        :add-template="addTemplate"
        @row-add="addUser"

        @emit-view="viewDetail"
        @emit-stop="stopUser"
        @emit-reset="reset"
        @dialog-cancel="handleDialogCancel"
        class="drug-table"
      />
    </div>

    <!--查看-->
    <el-dialog
      title="查看"
      :visible.sync="viewDialogVisible"
      width="30%">
      <el-form ref="viewForm" :model="viewData" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="viewData.userName" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="viewData.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="viewData.mobile" readonly></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="viewData.type" readonly></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="viewData.userState" readonly></el-input>
        </el-form-item>
        <el-form-item label="最后操作日期">
          <el-input v-model="viewData.lastActionDate" readonly></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  // import axios from 'axios'
  // import moment from 'moment'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class User extends Vue {
    viewDialogVisible = false
    viewData = {}
    userList = [
      {
        userName: '恍若晨曦',
        name: '王明',
        mobile: '15716239253',
        type: '配送员',
        userState: '在职',
        lastActionDate: '2019-04-13 13:33:30'
      },
      {
        userName: '冷月星辰',
        name: '张三',
        mobile: '15716239253',
        type: '营业员',
        userState: '离职',
        lastActionDate: '2019-04-12 12:05:30'
      }
    ]

    columns= [
      {
        title: '用户名',
        key: 'userName'
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
        key: 'type'
      },
      {
        title: '状态',
        key: 'userState'
      },
      {
        title: '最后操作日期',
        key: 'lastActionDate'
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

    addTemplate = {
      userName: {
        title: '用户名',
        value: ''
      },
      name: {
        title: '姓名',
        value: ''
      },
      mobile: {
        title: '手机',
        value: ''
      },
      type: {
        title: '类型',
        value: ''
      },
      userState: {
        title: '状态',
        value: ''
      }
    }

    formOptions = {
      labelWidth: '80px',
      labelPosition: 'left',
      saveLoading: false
    }

    handleDialogCancel (done) {
      done()
    }

    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.initData()
    }

    // 打开新增弹框
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    }

    // 新增用户
    addUser (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        })

        // done可以传入一个对象来修改提交的某个字段
        done()
        this.formOptions.saveLoading = false
      }, 300)
    }

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
      // let params = {
      //   pageNum: this.pagination.currentPage,
      //   pageSize: this.pagination.pageSize
      // }
      // let data = await axios.get(`/api/shop/accounts`, {params})
      // console.log(data)
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
