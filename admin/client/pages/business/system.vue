<template>
  <div class="system-wrap">
    <div class="system">
      <bread-crumb :path="$route.path"/>
      <div class="filter">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input
              placeholder="用户名称"
              v-model="nameValue"
              clearable>
            </el-input>

            <el-button size="small" type="primary" @click="searchMsg">搜索</el-button>
            <el-button size="small" @click="nameValue = ''">清空</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="list">
        <d2-crud
          :columns="columns"
          :data="msgList"
          :loading="loading"
          :pagination="pagination"
          @pagination-current-change="paginationCurrentChange"
          :options="options"
          :rowHandle="rowHandle"
          @row-remove="removeMsg"
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

  export default class System extends Vue {
    nameValue = '';

    columns= [
      {
        title: '消息类型',
        key: 'type'
      },
      {
        title: '标题',
        key: 'title'
      },
      {
        title: '创建时间',
        key: 'createdDate'
      }
    ];

    msgList = [];

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
      remove: {
        text: '删除',
        type: 'text',
        confirm: true
      }
    };

    searchMsg () {

    }

    async removeMsg ({row}, done) {
      let delRes = await axios.delete(`/api/supervise/messages/${row.id}`)
      console.log(delRes)

      if (delRes) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
        this.getMessage()
      }
    }

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getMessage()
    }

    async getMessage () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      let {data: message} = await axios.get('/api/supervise/messages', {params})

      this.msgList = message.list
      this.msgList.forEach(e => {
        e.createdDate = moment(e.createdDate).format('YYYY-MM-DD HH:mm:ss')
      })
      this.pagination.total = message.total
    }

    mounted () {
      this.getMessage()
    }
  }
</script>

<style lang="scss">
  .system-wrap{
    padding: 20px;

    .system{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .filter{
        padding: 15px 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;

        .el-input{
          width: 50%;
          margin-right: 20px;
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
    }
  }

</style>
