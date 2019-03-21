<template>
  <div class="faq-wrap">
    <div class="faq">
      <bread-crumb :path="$route.path"/>
      <div class="title-add">
        <el-row>
          <el-col :span="12">
            <h4>常见问题</h4>
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
          :data="faqList"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"

          add-title="我的新增"
          :add-template="addTemplate"
          @row-add="handleRowAdd"

          @row-remove="handleRowRemove"

          edit-title="我的修改"
          :edit-template="editTemplate"
          @row-edit="editFaq"

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
  import axios from 'axios'
  import moment from 'moment'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Faq extends Vue {
    columns = [
      {
        title: '序号',
        key: 'id'
      },
      {
        title: '常见问题标题',
        key: 'question'
      },
      {
        title: '阅读次数',
        key: 'readNum'
      },
      {
        title: '回复',
        key: 'answer'
      },
      {
        title: '更新时间',
        key: 'lastModifiedDate'
      }
    ];
    faqList = [];
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 15,
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
      labelWidth: '120px',
      labelPosition: 'left',
      saveLoading: false
    }

    editTemplate = {
      id: {
        title: '序号',
        value: ''
      },
      question: {
        title: '常见问题标题',
        value: ''
      },
      readNum: {
        title: '阅读次数',
        value: ''
      },
      answer: {
        title: '回复',
        value: ''
      },
      lastModifiedDate: {
        title: '更新时间',
        value: ''
      }
    };

    addTemplate = {
      serialNumber: {
        title: '序号',
        value: ''
      },
      faqTitle: {
        title: '常见问题标题',
        value: ''
      },
      readNum: {
        title: '阅读次数',
        value: ''
      },
      replyContent: {
        title: '回复',
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

    async editFaq ({row}, done) {
      this.formOptions.saveLoading = true
      let params = {
        id: row.id,
        question: row.question,
        answer: row.answer,
        lastModifiedDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      }
      let editRes = await axios.put(`/api/supervise/faqs/${row.id}`, params)

      console.log(editRes)
    }

    async getFaqs () {
      let {data: faq} = await axios.get(`/api/supervise/faqs`)
      console.log(faq)

      this.faqList = faq.list
      this.pagination.total = faq.total
      this.faqList.forEach(item => {
        item.lastModifiedDate = moment(item.lastModifiedDate).format('YYYY-MM-DD hh:mm:ss')
      })
    }

    mounted () {
      this.getFaqs()
    }
  }
</script>

<style lang="scss">
  .faq-wrap{
    padding: 20px;
    .faq{
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
      }
    }
  }

</style>
