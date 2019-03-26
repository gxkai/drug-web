<template>
  <div class="chat-wrap">
    <div class="chat">
      <bread-crumb :path="$route.path"/>

      <div class="title">
        <h3>药师管理</h3>
      </div>

      <div class="list">
        <el-table
          :data="perPageData"
          border
          style="width: 100%">
          <el-table-column
            prop="serialNumber"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="pharmacistName"
            label="药师名">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="lastLoginTime"
            label="最后一次登录时间">
          </el-table-column>
          <el-table-column
            prop="consultingNumber"
            label="咨询次数">
          </el-table-column>
          <el-table-column
            prop="score"
            label="评分">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="viewChat(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="disableAction(scope.row)" type="text" size="small" v-if="scope.row.showStop">停用</el-button>
              <el-button @click="enableAction(scope.row)" type="text" size="small" v-if="scope.row.showStart">启用</el-button>
              <el-button @click="resetPwd(scope.row)" type="text" size="small">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPageNum"
            :page-size="pageNum"
            layout="prev, pager, next, jumper, total"
            :total="tableData.length">
          </el-pagination>
        </div>
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
  export default class Chat extends Vue {
    currentPageNum = 1; // 当前页
    pageNum = 2; // 每页显示条数

    // 所有列表数据
    tableData = [
      {
        serialNumber: '1',
        username: '王明',
        pharmacistName: '王凯',
        role: '药师',
        status: '启用',
        lastLoginTime: '2019-03-14 21:10:45',
        consultingNumber: '10',
        score: '5.0'
      },
      {
        serialNumber: '2',
        username: '王明',
        pharmacistName: '王凯',
        role: '药师',
        status: '停用',
        lastLoginTime: '2019-03-14 21:10:45',
        consultingNumber: '10',
        score: '5.0'
      },
      {
        serialNumber: '3',
        username: '王明',
        pharmacistName: '王凯',
        role: '药师',
        status: '停用',
        lastLoginTime: '2019-03-14 21:10:45',
        consultingNumber: '10',
        score: '5.0'
      },
      {
        serialNumber: '4',
        username: '王明',
        pharmacistName: '王凯',
        role: '药师',
        status: '启用',
        lastLoginTime: '2019-03-14 21:10:45',
        consultingNumber: '10',
        score: '5.0'
      },
      {
        serialNumber: '5',
        username: '王明',
        pharmacistName: '王凯',
        role: '药师',
        status: '启用',
        lastLoginTime: '2019-03-14 21:10:45',
        consultingNumber: '10',
        score: '5.0'
      },
      {
        serialNumber: '6',
        username: '王明',
        pharmacistName: '王凯',
        role: '药师',
        status: '停用',
        lastLoginTime: '2019-03-14 21:10:45',
        consultingNumber: '10',
        score: '5.0'
      }
    ];
    perPageData = []; // 存储每页显示的数据

    // 查看聊天
    viewChat (row) {
      this.$router.push('/business/chat/list')
    }

    disableAction (row) {

    }

    enableAction (row) {

    }

    resetPwd (row) {

    }

    handleCurrentChange (page) {
      this.currentPageNum = page
      this.setStatus()
    }

    setStatus () {
      this.perPageData = this.tableData
      this.perPageData = this.perPageData.slice((this.currentPageNum - 1) * this.pageNum, this.currentPageNum * this.pageNum)

      this.perPageData.forEach((item, index) => {
        if (item.status === '启用') {
          this.perPageData[index].showStop = true
        }

        if (item.status === '停用') {
          this.perPageData[index].showStart = true
        }
      })
    }

    mounted () {
      this.setStatus()
    }
  }
</script>

<style lang="scss">
  .chat-wrap{
    padding: 20px;

    .chat{
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
        margin: 0 10px 20px;
        border-bottom: 1px solid #E9E9E9;

        h3{
          margin-bottom: 10px;
        }
      }

      textarea{
        border: none;
        outline: none;
        resize: none;
        font-size: 15px;
        color: #949494;
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

        .pagination{
          margin: 30px 0;
          .el-pagination__total{
            float: right;
          }
        }
      }

      .cell{
        .el-button+.el-button{
          &:before{
            content: '|';
            color: #EEE;
            position: relative;
            left: -6px;
            top: -1px;
          }
        }
      }
    }
  }
</style>
