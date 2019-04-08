<template>
  <div class="word-wrap">
    <div class="word">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>搜索词管理</h3>
        <el-button @click="addRow" type="primary" size="small">新增</el-button>
      </div>

      <div class="list">
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="keywordsData"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"

          @view-emit="view"
          @firstPush-emit="firstPush"

          add-title="我的新增"
          :add-template="addTemplate"
          :form-options="formOptions"
          @row-add="handleRowAdd"
          @dialog-cancel="handleDialogCancel"
          @row-remove="handleRowRemove"
        />
      </div>

      <el-dialog
        title="查看"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal = 'isClickModal'>
        <div class="main">
          <el-form :model="viewData" label-width="100px">
            <el-form-item label="序号">
              <el-input v-model="viewData.index" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="搜索词">
              <el-input v-model="viewData.name" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="搜索次数">
              <el-input v-model="viewData.searchTimes" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="viewData.type" readonly placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" type="primary">关 闭</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="首推药品"
        :visible.sync="firstPushDialogVisible"
        width="50%"
        :close-on-click-modal='isClickModal'>
        <FirstDrug v-on:listenToChildEvent="getSelectedInfo"></FirstDrug>
        <div slot="footer" class="dialog-footer">
          <el-button @click="firstPushDialogVisible = false" type="primary">关 闭</el-button>
          <el-button @click="confirmPush" type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import FirstDrug from '@/components/drugCheck/drug/index'
  import axios from 'axios'

  @Component({
    components: {
      BreadCrumb,
      FirstDrug
    }
  })
  export default class Word extends Vue {
    viewData = {}
    selectedDrugs = []
    middelList = []
    isClickModal = false
    dialogVisible = false
    firstPushDialogVisible = false

    columns = [
      {
        title: '序号',
        key: 'index'
      },
      {
        title: '搜索词',
        key: 'name'
      },
      {
        title: '搜索次数',
        key: 'searchTimes'
      },
      {
        title: '类型',
        key: 'type'
      }
    ]
    keywordsData = []
    loading= false
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
          emit: 'view-emit'
        },
        {
          text: '首推药品',
          type: 'text',
          emit: 'firstPush-emit'
        }
      ],
      remove: {
        text: '删除',
        type: 'text',
        confirm: true
      }
    }
    addTemplate = {
      name: {
        title: '搜索词',
        value: ''
      },
      type: {
        title: '类型',
        value: ''
      }
    }
    formOptions = {
      labelWidth: '80px',
      labelPosition: 'left',
      saveLoading: false
    }

    beforeMount () {
      this.initData()
    }

    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.initData()
      this.search()
    }
    async initData () {
      let params = {
        name: '',
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      let data = await axios.get(`/api/supervise/keywords`, {params: params})
      this.keywordsData = data.data.list
      // 添加序号
      this.keywordsData.forEach((item, index) => {
        item.index = (this.pagination.currentPage - 1) * this.pagination.pageSize + index + 1
        if (item.type === 'ADMIN') {
          item.type = '后台推荐'
        } else if (item.type === 'ACCOUNT') {
          item.type = '用户搜索'
        }
        if (item.searchTimes === null) {
          item.searchTimes = 0
        }
      })
      this.pagination.total = data.data.total
    }

    firstPush ({index, row}) {
      this.firstPushDialogVisible = true
    }

    getSelectedInfo (data) {
      console.log(data)
      this.selectedDrugs = data
    }

    async confirmPush () {
      let pushID = ''
      this.middelList = this.selectedDrugs
      this.middelList.forEach(item => {
        pushID += `${item.id},`
      })
      pushID = pushID.substring(0, pushID.length - 1)
      let params = {
        ids: pushID
      }
      await axios.get(`/api/supervise/keywords`, {params})
      this.$message({
        message: '药品首推成功',
        type: 'success'
      })
      this.firstPushDialogVisible = false
    }

    view ({index, row}) {
      this.viewData.index = row.index
      this.viewData.name = row.name
      this.viewData.searchTimes = row.searchTimes
      this.viewData.type = row.type
      this.dialogVisible = true
    }

    // 新增关键词
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    }
    async handleRowAdd (row, done) {
      // 判重
      console.log(row)
      let getName = await axios.post(`/api/supervise/keywords/exists?name=` + row.name)
      console.log(getName)
      if (getName.data === true) {
        this.$message({
          message: '关键词已存在!',
          type: 'warning'
        })
        return false
      }
      let drugKeyword = {
        name: row.name,
        sort: row.sort,
        type: 'ADMIN' // 类型：account用户搜索/admin后台推荐
      }
      await axios.post(`/api/supervise/keywords`, drugKeyword)
      this.initData()

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

    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    }

    // 删除
    async handleRowRemove ({ index, row }, done) {
      console.log(row.id)
      await axios.delete(`/api/supervise/keywords/${row.id}`)
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

<style lang="scss">
  .word-wrap{
    padding: 20px;

    .breadcrumb-wrap{
      padding-left: 15px;
    }

    .word{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .el-dialog__body{
        padding: 20px;
        border:{
          top: 1px solid #e9e9e9;
          bottom: 1px solid #e9e9e9;
        }
      }

      .title{
        padding: 0 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;
        position: relative;
        .el-button{
          position: absolute;
          right: 30px;
          bottom: 20px;
        }
      }

      .list {
        padding: 0 30px;

        .el-table{
          th{
            background-color: #F4F4F4;
            color: #555;
          }
        }
      }

      .cell{
        .el-button+.el-button {
          margin-left: 8px;
        }
        button:nth-child(2):before{
          content: '|';
          color: #EEE;
          position: relative;
          left: -4px;
          top: -1px;
        }
      }

    }
  }
</style>
