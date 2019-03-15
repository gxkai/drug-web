<template>
  <div class="repository-wrap">
    <div class="repository">
      <bread-crumb :path="$route.path"/>
      <div class="title-add">
        <el-row>
          <el-col :span="12">
            <h4>知识库</h4>
          </el-col>
          <el-col :span="12" class="add-col">
            <el-button type="primary" @click="addRow" style="background: #169bd5;">新增</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="list">
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @custom-emit-list="viewList"

          edit-title="我的修改"
          :edit-template="editTemplate"

          add-title="我的新增"
          :add-template="addTemplate"
          @row-add="handleRowAdd"
          @row-remove="handleRowRemove"

          :form-options="formOptions"
          @dialog-open="handleDialogOpen"
          @dialog-cancel="handleDialogCancel"
        />
      </div>
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
  export default class Repository extends Vue {
    columns = [
      {
        title: '序号',
        key: 'serialNumber'
        // width: '200'
      },
      {
        title: '类别名称',
        key: 'categoryName'
        // width: '250'
      },
      {
        title: '打开次数',
        key: 'openNum'
        // width: '200'
      },
      {
        title: '图片',
        key: 'imageUrl'
        // width: '450'
      }
    ];
    data = [
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      },
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      },
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      },
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      },
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      },
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      },
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      },
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      },
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      },
      {
        serialNumber: '1',
        categoryName: '1',
        openNum: '100',
        imageUrl: ''
      }
    ];
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: this.data.length
    };
    options= {
      border: true
    };
    rowHandle= {
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
    };

    formOptions = {
      labelWidth: '80px',
      labelPosition: 'left',
      saveLoading: false
    }

    addTemplate = {
      serialNumber: {
        title: '序号',
        value: ''
      },
      categoryName: {
        title: '类别名称',
        value: ''
      },
      openNum: {
        title: '打开次数',
        value: ''
      },
      imageUrl: {
        title: '图片',
        value: ''
      }
    };

    editTemplate = {
      serialNumber: {
        title: '序号',
        value: ''
      },
      categoryName: {
        title: '类别名称',
        value: ''
      },
      openNum: {
        title: '打开次数',
        value: ''
      },
      imageUrl: {
        title: '图片',
        value: ''
      }
    };

    handleDialogOpen ({ mode }) {
      // this.$message({
      //   message: '打开模态框，模式为：' + mode,
      //   type: 'success'
      // })
    }

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

    // 列表
    viewList ({index, row}) {
      this.$router.push('/business/repository/repositoryCategoryList')
    }
  }
</script>

<style lang="scss">
  .repository-wrap{
    padding: 20px;

    .repository{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title-add{
        padding: 0 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;

        .add-col{
          text-align: right;
          line-height: 60px;
        }
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
