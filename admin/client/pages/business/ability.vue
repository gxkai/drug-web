<template>
  <div class="ability-wrap">
    <div class="ability">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>功能区管理</h3>
        <el-button type="primary" @click="addRow" style="background: #169bd5;">新增</el-button>
      </div>

      <div class="list">
        <d2-crud
          ref = 'd2Crud'
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @view-emit="viewEvent"

          add-title="我的新增"
          :add-template="addTemplate"
          @row-add="handleRowAdd"

          @row-remove="handleRowRemove"

          edit-title="我的修改"
          :edit-template="editTemplate"
          @row-edit="handleRowEdit"

          :form-options="formOptions"
          @dialog-cancel="handleDialogCancel"/>
      </div>

      <!-- 查看模态框 -->
      <el-dialog
        title="查看"
        :visible.sync="viewDialogVisible"
        width="30%"
        :close-on-click-modal = 'isClickModal'>
        <div class="main">
          <el-form :model="viewData" label-width="100px">
            <el-form-item label="序号">
              <el-input v-model="viewData.num" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="模块">
              <el-input v-model="viewData.module" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="viewData.sort" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="链接地址">
              <el-input v-model="viewData.url" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-input v-model="viewData.image" readonly placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="viewDialogVisible = false" type="primary">关 闭</el-button>
        </div>
      </el-dialog>
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
  export default class Advert extends Vue {
    columns= [
      {
        title: '序号',
        key: 'num'
      },
      {
        title: '模块',
        key: 'module'
      },
      {
        title: '排序',
        key: 'sort'
      },
      {
        title: '链接地址',
        key: 'url'
      },
      {
        title: '图片',
        key: 'image'
      }
    ];
    data= [
      {
        num: '1',
        module: '我的处方',
        sort: '1',
        url: 'https：//.........',
        image: ''
      },
      {
        num: '2',
        module: 'xxxx',
        sort: '2',
        url: 'https：//.........',
        image: ''
      }
    ];
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    };
    options= {
      border: true
    };
    rowHandle= {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'view-emit'
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
    };

    formOptions = {
      labelWidth: '120px',
      labelPosition: 'left',
      saveLoading: false
    }

    addTemplate = {
      num: {
        title: '序号',
        value: ''
      },
      module: {
        title: '模块',
        value: ''
      },
      sort: {
        title: '排序',
        value: ''
      },
      url: {
        title: '链接地址',
        value: ''
      },
      image: {
        title: '图片',
        value: ''
      }
    };

    editTemplate = {
      num: {
        title: '序号',
        value: ''
      },
      module: {
        title: '模块',
        value: ''
      },
      sort: {
        title: '排序',
        value: ''
      },
      url: {
        title: '链接地址',
        value: ''
      },
      image: {
        title: '图片',
        value: ''
      }
    };

    // 普通的新增
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    }

    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        })

        // done可以传入一个对象来修改提交的某个字段
        done({
          address: '我是通过done事件传入的数据！'
        })
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

    handleRowRemove ({ index, row }, done) {
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

    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })

        // done可以传入一个对象来修改提交的某个字段
        done({
          address: '我是通过done事件传入的数据！'
        })
        this.formOptions.saveLoading = false
      }, 300)
    }

    mounted () {
    }

    viewDialogVisible = false;
    isClickModal = false;
    viewData = {};

    // num: '1',
    // module: '1',
    // sort: '1',
    // url: '1',
    // image: '1'
    viewEvent ({index, row}) {
      this.viewDialogVisible = true
      this.viewData.num = row.num
      this.viewData.module = row.module
      this.viewData.sort = row.sort
      this.viewData.url = row.url
      this.viewData.image = row.image
    }
  }
</script>

<style lang="scss">
  .ability-wrap{
    padding: 20px;

    .ability{
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;
      }

      .list {
        padding: 0 30px;

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
        button:not(:last-child):before{
          content: '|';
          color: #EEE;
          position: relative;
          left: -4px;
          top: -1px;
        }

        button:last-child{
          float: left;
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
  }
</style>
