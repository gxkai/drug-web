<template>
  <div class="type-wrap">
    <div class="repository__type">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>分类1</h3>
        <el-button size="small" type="primary" @click="$router.go(-1)">返回</el-button>
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

          edit-title="我的修改"
          :edit-template="editTemplate"
          @row-edit="handleRowEdit"

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
  export default class RepositoryCategoryList extends Vue {
    columns = [
      {
        title: '序号',
        key: 'serialNumber'
        // width: '80'
      },
      {
        title: '标题',
        key: 'title'
        // width: '250'
      },
      {
        title: '来源',
        key: 'origin'
        // width: '250'
      },
      {
        title: '打开次数',
        key: 'openNum'
        // width: '80'
      },
      {
        title: '内容',
        key: 'content'
        // width: '400'
      },
      {
        title: '是否置顶',
        key: 'isToTop'
        // width: '80'
      },
      {
        title: '更新时间',
        key: 'updateTime'
        // width: '200'
      }
    ];
    data = [
      {
        serialNumber: '1',
        title: '城市',
        origin: '百度百科',
        openNum: '20',
        content: '艰苦奋斗',
        isToTop: '是',
        updateTime: '2019-03-13 13:25:35'
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
      labelWidth: '80px',
      labelPosition: 'left',
      saveLoading: false
    }

    editTemplate = {
      serialNumber: {
        title: '序号',
        value: ''
      },
      title: {
        title: '标题',
        value: ''
      },
      origin: {
        title: '来源',
        value: ''
      },
      openNum: {
        title: '打开次数',
        value: ''
      },
      content: {
        title: '内容',
        value: ''
      },
      isToTop: {
        title: '是否置顶',
        value: ''
      },
      updateTime: {
        title: '更新时间',
        value: ''
      }
    };

    handleDialogOpen ({ mode }) {
      // this.$message({
      //   message: '打开模态框，模式为：' + mode,
      //   type: 'success'
      // })
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
  }
</script>

<style lang="scss">
  .type-wrap{
    padding: 20px;
    .repository__type{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

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
        }
      }

      .cell{
        button:last-child:before{
          content: '|';
          color: #EEE;
          position: relative;
          left: -6px;
          top: -1px;
        }
      }
    }
  }

</style>
