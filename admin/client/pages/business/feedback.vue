<template>
  <div class="feedback-wrap">
    <div class="feedback">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>用户反馈</h3>
      </div>

      <div class="list">
        <d2-crud
          :columns="columns"
          :data="feedbackList"
          :loading="loading"
          :pagination="pagination"
          @pagination-current-change="paginationCurrentChange"
          :options="options"
          :rowHandle="rowHandle"
          @view-emit = 'viewEvent'
          @feedback-emit="feedBackDialog"
          @view-image-emit = 'viewImage'/>
      </div>

      <!-- 回复模态框 -->
      <el-dialog
        title="回复"
        :visible.sync="isShowFeedBackDialog"
        width="30%"
        :close-on-click-modal='isClickModal'>
        <div class="feedCon">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入回复内容"
            v-model="feedbackData">
          </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowFeedBackDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 查看模态框 -->
      <el-dialog
        title="查看"
        :visible.sync="isShowViewDialog"
        width="30%"
        :close-on-click-modal = 'isClickModal'>
        <div class="main">
          <el-form :model="viewData" label-width="100px">
            <el-form-item label="序号">
              <el-input v-model="viewData.id" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="viewData.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="提交时间">
              <el-input v-model="viewData.createdDate" readonly></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input v-model="viewData.content" readonly></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="viewData.processed" readonly></el-input>
            </el-form-item>
            <el-form-item label="处理人">
              <el-input v-model="viewData.adminName" readonly></el-input>
            </el-form-item>
            <el-form-item label="回复内容">
              <el-input v-model="viewData.remark" readonly></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowViewDialog = false" type="primary">关 闭</el-button>
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
  import moment from 'moment'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Feedback extends Vue {
    feedbackData = ''
    fbID = ''
    columns= [
      {
        title: '序号',
        key: 'id',
        width: '120'
      },
      {
        title: '用户名',
        key: 'name',
        width: '120'
      },
      {
        title: '提交时间',
        key: 'createdDate',
        width: '200'
      },
      {
        title: '内容',
        key: 'content',
        width: '320'
      },
      {
        title: '状态',
        key: 'processed',
        width: '120'
      },
      {
        title: '处理人',
        key: 'adminName',
        width: '120'
      },
      {
        title: '回复内容',
        key: 'remark',
        width: '320'
      }
    ];

    feedbackList = [];

    loading = false;

    pagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    };

    options = {
      border: true
    };

    rowHandle = {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'view-emit'
        },
        {
          text: '回复',
          type: 'text',
          emit: 'feedback-emit'
        },
        {
          text: '图片',
          type: 'text',
          emit: 'view-image-emit',
          class: 'viewImg-btn'
        }
      ]
    }

    viewData = {}
    isClickModal = false
    isShowViewDialog = false
    viewEvent ({index, row}) {
      this.isShowViewDialog = true
      this.viewData.id = row.id
      this.viewData.name = row.name
      this.viewData.createdDate = row.createdDate
      this.viewData.content = row.content
      this.viewData.processed = row.processed
      this.viewData.adminName = row.adminName
      this.viewData.remark = row.remark
    }

    // 模态框参数
    isShowFeedBackDialog = false; // 模态框开启状态
    feedBackDialog ({row}) {
      this.isShowFeedBackDialog = true
      console.log(row.id)
      this.fbID = row.id
    }

    // 回复
    async confirm () {
      let params = {
        adminId: '2',
        processed: true,
        remark: this.feedbackData
      }
      let fbRes = await axios.post(`/api/supervise/feedbacks/${this.fbID}`, {params})
      console.log(fbRes)
    }

    viewImage ({index, row}) {

    }

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getFeedbacks()
    }

    async getFeedbacks () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }

      let {data: feedbacks} = await axios.get(`/api/supervise/feedbacks`, {params})
      console.log(feedbacks)

      this.feedbackList = feedbacks.list
      this.pagination.total = feedbacks.total

      this.feedbackList.forEach(item => {
        item.createdDate = moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')
        // item.processed = item.processed ? '已处理' : '未处理'
      })
    }

    mounted () {
      this.getFeedbacks()
    }
  }
</script>

<style lang="scss">
  .feedback-wrap{
    padding: 20px;

    .feedCon{
      textarea{
        border: none;
        outline: none;
        resize: none;
        font-size: 15px;
        color: #949494;
      }
    }

    .feedback{
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
        button:nth-child(2):before{
          content: '|';
          color: #EEE;
          position: relative;
          left: -4px;
          top: -1px;
        }

        .hide{
          display: none;
        }
      }
    }
  }

</style>
