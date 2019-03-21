<template>
  <div class="advert-wrap">
    <div class="advert">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>广告位管理</h3>
        <el-button type="primary" @click="addAdvert" style="background: #169bd5;">新增</el-button>
      </div>

      <div class="list">
        <d2-crud
          ref = 'd2Crud'
          :columns="columns"
          :data="advertsList"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @view-emit="viewEvent"

          add-title="我的新增"
          :add-template="addTemplate"
          @row-add="confirmAddAdvert"

          @row-remove="handleRowRemove"

          edit-title="我的修改"
          :edit-template="editTemplate"
          @row-edit="handleRowEdit"

          :form-options="formOptions"/>
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
  import axios from 'axios'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Advert extends Vue {
    columns= [
      {
        title: '序号',
        key: 'id'
      },
      {
        title: '模块',
        key: 'type'
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
        key: 'fileId'
      }
    ];

    advertsList = [];

    loading= false;
    pagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    };

    options = {
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
      id: {
        title: '序号',
        value: ''
      },
      type: {
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
      fileId: {
        title: '图片',
        value: ''
      }
    };

    editTemplate = {
      id: {
        title: '序号',
        value: ''
      },
      type: {
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
      fileId: {
        title: '图片',
        value: ''
      }
    };

    // 新增广告
    addAdvert () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    }

    async confirmAddAdvert (e, done) {
      this.formOptions.saveLoading = true
      console.log(e)
      let params = {
        advert: e
      }
      let addRes = await axios.post(`/api/supervise/adverts`, {params})
      console.log(addRes)

      done()
      // setTimeout(() => {
      //   this.$message({
      //     message: '保存成功',
      //     type: 'success'
      //   })
      //
      this.formOptions.saveLoading = false
      // }, 300)
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

    viewDialogVisible = false;
    isClickModal = false;
    viewData = {};

    viewEvent ({index, row}) {
      this.viewDialogVisible = true
      this.viewData.num = row.num
      this.viewData.module = row.module
      this.viewData.sort = row.sort
      this.viewData.url = row.url
      this.viewData.image = row.image
    }

    async beforeMount () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      let {data: adverts} = await axios.get(`/api/supervise/adverts`, {params})
      console.log(adverts)

      this.advertsList = adverts.list
      this.pagination.total = adverts.total
    }

    mounted () {
    }
  }
</script>

<style lang="scss">
  .advert-wrap{
    padding: 20px;

    .advert{
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
