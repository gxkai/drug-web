<template>
  <div class="repository-wrap">
    <div class="repository">
      <bread-crumb :path="$route.path"/>
      <div class="title-add">
        <h3>知识库</h3>
        <el-button type="primary" @click="dialogFormVisible = true" style="background: #169bd5;">新增</el-button>
      </div>

      <div class="list">
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="repositoryData"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @custom-emit-list="viewList"

          edit-title="我的修改"
          :edit-template="editTemplate"
          @row-edit="handleRowEdit"


          @row-remove="handleRowRemove"

          :form-options="formOptions"
          @dialog-open="handleDialogOpen"
          @dialog-cancel="handleDialogCancel"
        />

        <!--新增-->

        <el-dialog title="我的新增" :visible.sync="dialogFormVisible">
          <el-form :model="addForm" ref="addForm" :rules="rules">
            <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="图标" :label-width="formLabelWidth" prop="icon">
              <el-input v-model="addForm.icon"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="enterSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  // import UploadImage from '@/components/repository/UploadImage'
  import axios from 'axios'
  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Repository extends Vue {
    columns = [
      {
        title: '序号',
        key: 'index',
        width: 60
      },
      {
        title: '类别名称',
        key: 'name'
      },
      {
        title: '打开次数',
        key: 'readTimes'
      },
      {
        title: '图标',
        key: 'icon'
      }
    ]
    repositoryData = []
    loading= false
    pagination= {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options = {
      border: true
    }
    rowHandle = {
      edit: {
        text: '编辑',
        type: 'text',
        class: 'repository-edit'
      },

      custom: [
        {
          text: '列表',
          type: 'text',
          emit: 'custom-emit-list',
          class: 'repository-list'
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

    addTemplate = {
      name: {
        title: '类别名称',
        value: ''
      },
      icon: {
        title: '图标',
        value: ''
      }
    }

    editTemplate = {
      name: {
        title: '类别名称',
        value: ''
      },
      icon: {
        title: '图标',
        value: ''
      }
    }

    dialogFormVisible = false
    formLabelWidth = '80px'

    beforeMount () {
      this.getData()
    }
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getData()
    }
    async getData () {
      let params = {
        name: '',
        pageNum: this.pagination.currentPage,
        pageSize: 15
      }
      let data = await axios.get(`/api/supervise/repositoryTypes`, {params: params})
      this.repositoryData = data.data.list
      console.log(this.repositoryData)
      this.repositoryData.forEach((item, index) => {
        item.index = (this.pagination.currentPage - 1) * this.pagination.pageSize + index + 1
        if (item.readTimes === null) {
          item.readTimes = 0
        }
      })
      this.pagination.total = data.data.total
    }

    handleDialogOpen ({ mode, row }) {
    }

    // 新增确定
    rules = {
      name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
      icon: [{ required: true, message: '请输入图标', trigger: 'blur' }]
    }
    addForm = {
      name: '',
      icon: ''
    }
    async enterSubmit () {
      const valid = this.$refs.addForm.validate()
      try {
        if (valid) {
          if (this.addForm.name === '' || this.addForm.icon === '') {
            return false
          }
          let params = {
            name: this.addForm.name,
            icon: this.addForm.icon,
            readTimes: 0
          }
          await axios.post(`/api/supervise/repositoryTypes`, params).then(res => {
            console.log(res)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getData()
          }).catch(error => {
            this.$message({
              message: error.message,
              type: 'warning'
            })
          })
        }
      } catch (e) {
      } finally {
      }
    }

    handleDialogCancel (done) {
      done()
    }

    async handleRowRemove ({ index, row }, done) {
      await axios.delete(`/api/supervise/repositoryTypes/${row.id}`, {params: {id: row.id}})
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    }

    async handleRowEdit ({ index, row }, done) {
      console.log(row)
      let getName = await axios.get(`/api/supervise/repositoryTypes/${row.id}/editCount`, {params: {name: row.name}})
      if (getName.data >= 1) {
        this.$message({
          message: '通用名已存在!',
          type: 'warning'
        })
        return false
      }
      await axios.put(`/api/supervise/repositoryTypes/${row.id}`, {name: row.name, icon: row.icon})
      this.getData()

      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    }

    // 列表
    viewList ({index, row}) {
      this.$router.push({
        path: '/business/repository/child',
        query: {
          id: row.id,
          name: row.name
        }
      })
    }
  }
</script>

<style lang="scss">
  .repository-wrap{
    padding: 0 10px;
    margin-bottom: 30px;

    .repository{
      min-height: 850px;
      background: #FFF;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title-add{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px solid #E9E9E9;
      }

      .list {
        padding: 0 15px;

        .el-table{
          th{
            background-color: #F4F4F4;
            color: #555;
          }
          &__body {
            td{
              padding: 6px 0;
            }
          }
        }
      }

      .cell{
        button:last-child:before{
          content: '|';
          color: #EEE;
          position: relative;
          left: -4px;
          top: -1px;
        }

        .repository-edit,
        .repository-list{
          float: left;
        }
      }
    }
  }
</style>
