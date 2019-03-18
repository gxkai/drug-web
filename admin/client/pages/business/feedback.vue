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
          :data="data"
          :loading="loading"
          :pagination="pagination"
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
        :close-on-click-modal = 'isClickModal'>
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
          <el-button type="primary" @click="isShowFeedBackDialog = false">确 定</el-button>
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
              <el-input v-model="viewData.num" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="viewData.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="提交时间">
              <el-input v-model="viewData.submitTime" readonly></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input v-model="viewData.content" readonly></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="viewData.status" readonly></el-input>
            </el-form-item>
            <el-form-item label="处理人">
              <el-input v-model="viewData.processer" readonly></el-input>
            </el-form-item>
            <el-form-item label="回复内容">
              <el-input v-model="viewData.replyContent" readonly></el-input>
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

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Feedback extends Vue {
    feedbackData = ''
    columns= [
      {
        title: '序号',
        key: 'num',
        width: '120'
      },
      {
        title: '用户名',
        key: 'name',
        width: '120'
      },
      {
        title: '提交时间',
        key: 'submitTime',
        width: '200'
      },
      {
        title: '内容',
        key: 'content',
        width: '320'
      },
      {
        title: '状态',
        key: 'status',
        width: '120'
      },
      {
        title: '处理人',
        key: 'processer',
        width: '120'
      },
      {
        title: '回复内容',
        key: 'replyContent',
        width: '320'
      }
    ];

    data = [
      {
        num: '1',
        name: '1',
        submitTime: '1',
        content: 'fffff',
        status: '1',
        processer: '2',
        replyContent: '2'
      },
      {
        num: '1',
        name: '1',
        submitTime: '1',
        content: 'img',
        status: '1',
        processer: '2',
        replyContent: '2'
      }
    ];

    loading = false;

    pagination = {
      currentPage: 1,
      pageSize: 5,
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
      this.viewData.num = row.num
      this.viewData.name = row.name
      this.viewData.submitTime = row.submitTime
      this.viewData.content = row.content
      this.viewData.status = row.status
      this.viewData.processer = row.processer
      this.viewData.replyContent = row.replyContent
    }

    // 模态框参数
    isShowFeedBackDialog = false; // 模态框开启状态
    feedBackDialog ({index, row}) {
      this.isShowFeedBackDialog = true
    }

    viewImage ({index, row}) {

    }

    mounted () {
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
