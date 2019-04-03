<template>
  <div class="type-wrap">
    <div class="repository__type">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>{{ this.$route.query.name }}</h3>
        <el-button size="small" type="primary" @click="$router.go(-1)">返回</el-button>
      </div>

      <div class="list">
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="childData"
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
  // import DataTime from '@/components/repository/DataTime'
  import axios from 'axios'
  import moment from 'moment'
  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class RepositoryCategoryList extends Vue {
    columns = [
      {
        title: '序号',
        key: 'index',
        width: 50
      },
      {
        title: '标题',
        key: 'title'
      },
      {
        title: '来源',
        key: 'source'
      },
      {
        title: '打开次数',
        key: 'readTimes'
      },
      {
        title: '内容',
        key: 'content',
        showOverflowTooltip: true,
        minWidth: 200,
        className: 'columnsContent'
        // formatter (row, column, cellValue, index) {
        //   console.log(row)
        //   console.log(cellValue)
        // }
      },
      {
        title: '是否置顶',
        key: 'home'
      },
      {
        title: '更新时间',
        key: 'lastModifiedDate'
      }
    ]
    childData = []
    loading = false
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
        type: 'text'
      },
      remove: {
        text: '删除',
        type: 'text',
        confirm: true
      }
    }

    formOptions = {
      labelWidth: '80px',
      labelPosition: 'left',
      saveLoading: false
    }

    editTemplate = {
      title: {
        title: '标题',
        value: ''
      },
      source: {
        title: '来源',
        value: ''
      },
      content: {
        title: '内容',
        value: '',
        component: {
          name: 'el-input',
          type: 'textarea',
          rows: 8
        }
      },
      home: {
        title: '是否置顶',
        value: '',
        component: {
          name: 'el-select',
          options: [
            {
              value: '是',
              label: '是'
            },
            {
              value: '否',
              label: '否'
            }
          ]
        }
      }
    }

    repalceHtml (str) {
      let s1 = str.replace(/<\/?.+?>/g, '')
      let s2 = s1.replace(/ /g, '')// 去html
      let s3 = s2.replace(/&nbsp;/ig, '') // &nbsp;转为空格
      // let s4 = s3.replace(/\s*/g, '')// 去空格;
      return s3
    }

    beforeMount () {
      this.getData()
    }

    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getData()
    }
    async getData () {
      let id = this.$route.query.id
      let params = {
        repositoryTypeId: id,
        title: '',
        pageNum: this.pagination.currentPage,
        pageSize: 15
      }
      let data = await axios.get(`/api/supervise/repositories`, {params: params})
      this.childData = data.data.list
      this.childData.forEach((item, index) => {
        item.index = index + 1
        item.content = this.repalceHtml(item.content)
        item.lastModifiedDate = moment(item.lastModifiedDate).format('YYYY-MM-DD HH:mm:ss')
        if (item.home.toString() === 'true') {
          item.home = '是'
        } else {
          item.home = '否'
        }
      })
      this.pagination.total = data.data.total
      console.log(this.childData)
    }

    handleDialogOpen ({ mode }) {
    }

    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    }

    async handleRowRemove ({ index, row }, done) {
      await axios.post(`/api/supervise/repositories/${row.id}`)
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
      if (row.home === '是') {
        row.home = true
      } else {
        row.home = false
      }
      let repository = {
        title: row.title,
        source: row.source,
        home: row.home,
        content: row.content,
        repositoryTypeId: row.repositoryTypeId
      }
      await axios.put(`/api/supervise/repositories/${row.id}`, repository)
      this.getData()
      this.formOptions.saveLoading = true
      setTimeout(() => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    }
  }
</script>

<style lang="scss">
  .el-tooltip__popper.is-dark{
    width: 60% !important;
  }
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
          td.columnsContent{
            /*border: 1px solid red;*/
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
