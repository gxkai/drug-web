<template>
  <div class="feedback-wrap">
    <div class="feedback">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>评价管理</h3>
      </div>

      <div class="list">
        <d2-crud
          :columns="columns"
          :data="appraiseList"
          :options="options"
          :rowHandle="rowHandle"
          :pagination="pagination"
          @view-emit='viewEvent'
          @feedback-emit="feedBack"
          @pagination-current-change="paginationCurrentChange"/>
      </div>

      <!-- 回复模态框 -->
      <el-dialog
        title="回复"
        :visible.sync="isShowFeedBackDialog"
        width="30%"
        :close-on-click-modal='isClickModal'>
        <div class="user-con">
          <strong>用户评价：</strong>
          <el-input
            :rows="2"
            readonly
            type="textarea"
            placeholder="暂无"
            :value="userDesc">
          </el-input>
        </div>
        <div class="feedCon">
          <strong>回复：</strong>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入回复内容"
            v-model="feedbackData">
          </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowFeedBackDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmFeedBack">确 定</el-button>
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
            <el-form-item label="订单编号">
              <el-input v-model="viewData.number" readonly placeholder="暂无"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名">
              <el-input v-model="viewData.accountName" readonly placeholder="暂无"></el-input>
            </el-form-item>
            <el-form-item label="订单类型">
              <el-input v-model="viewData.orderType" readonly placeholder="暂无"></el-input>
            </el-form-item>
            <el-form-item label="配送/自取评分">
              <el-input v-model="viewData.deliveryScore" readonly placeholder="暂无"></el-input>
            </el-form-item>
            <el-form-item label="服务状态">
              <el-input v-model="viewData.serviceScore" readonly placeholder="暂无"></el-input>
            </el-form-item>
            <el-form-item label="描述相符">
              <el-input v-model="viewData.describeScore" readonly placeholder="暂无"></el-input>
            </el-form-item>
            <el-form-item label="包装评分">
              <el-input v-model="viewData.packageScore" readonly placeholder="暂无"></el-input>
            </el-form-item>
            <el-form-item label="评价时间">
              <el-input v-model="viewData.createdDate" readonly placeholder="暂无"></el-input>
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
  export default class Appraise extends Vue {
    appraiseList = []
    userDesc = ''
    feedbackData = ''
    columns= [
      {
        title: '订单编号',
        key: 'number'
      },
      {
        title: '用户姓名',
        key: 'accountName'
      },
      {
        title: '订单类型',
        key: 'orderType'
      },
      {
        title: '配送/自取评分',
        key: 'deliveryScore'
      },
      {
        title: '服务状态',
        key: 'serviceScore'
      },
      {
        title: '描述相符',
        key: 'describeScore'
      },
      {
        title: '包装评分',
        key: 'packageScore'
      },
      {
        title: '评价时间',
        key: 'createdDate'
      }
    ];
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
        }
      ]
    }

    viewData = {}
    isClickModal = false
    isShowViewDialog = false

    // 查看
    viewEvent ({row}) {
      this.isShowViewDialog = true
      this.viewData = row
    }

    // 模态框参数
    isShowFeedBackDialog = false; // 模态框开启状态
    feedBack ({row}) {
      this.isShowFeedBackDialog = true
      // console.log(row.id)
      this.userDesc = row.desc
    }

    // 回复
    async confirmFeedBack () {

    }

    viewImage ({index, row}) {

    }

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getFeedbacks()
    }

    typeList = [
      {
        value: 'SIMPLE',
        label: '普通订单'
      },
      {
        value: 'RX',
        label: '处方订单'
      },
      {
        value: 'HOSPITAL',
        label: '医院订单'
      }
    ]

    convertOrderType (type) {
      switch (type) {
        case 'SIMPLE':
          return '普通订单'

        case 'RX':
          return '处方订单'

        case 'HOSPITAL':
          return '医院订单'
      }
    }

    async getAppraise () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      let {data: appraiseData} = await axios.get(`/api/shop/order/appraise`, {params})
      console.log(appraiseData)
      this.pagination.total = appraiseData.total
      this.appraiseList = appraiseData.list

      this.appraiseList.forEach(item => {
        item.orderType = this.convertOrderType(item.type)
        item.createdDate = moment(item.createdDate).format('YY-MM-DD HH:ss:mm')
      })
    }

    beforeMount () {
      this.getAppraise()
    }
  }
</script>

<style lang="scss">
  .feedback-wrap{
    padding: 0 10px;
    margin-bottom: 30px;

    .user-con{
      textarea{
        outline: none;
        resize: none;
        margin-top: 10px;
      }
    }

    .feedCon{
      margin-top: 20px;
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
      padding: 10px;
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
        padding: 0 15px;
        border-bottom: 1px solid #E9E9E9;
      }

      .list {
        padding: 0 15px;

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
