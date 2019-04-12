<template>
  <div class="account-wrap">
    <div class="account-list">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>我的账户</h3>
      </div>
      <div class="income">
        <div>
          <strong>七天收入（截至今日0点）：</strong>
          10000元
        </div>
        <div>
          <strong>待结算：</strong>
          10000元
        </div>
        <div>
          <strong>帐户余额：</strong>
          10000元
        </div>
      </div>
      <div class="transaction-record">
        <div class="title">
          <h4>近期交易记录</h4>
          <el-button type="primary" size="small" @click="$router.push('/system/myAccount/record')">更多</el-button>
        </div>
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="recordList"
          :pagination="pagination"
          :options="options"
          class="drug-table"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  // import axios from 'axios'
  // import moment from 'moment'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Account extends Vue {
    recordList = [
      {
        index: '1',
        createDate: '2019-04-13 13:33:30',
        amount: '1000',
        orderState: '待入账',
        accountBalance: '5000',
        remarkDesc: '待入账'
      },
      {
        index: '2',
        createDate: '2019-04-12 12:30:30',
        amount: '2000',
        orderState: '成功',
        accountBalance: '3000',
        remarkDesc: '已处理'
      },
      {
        index: '3',
        createDate: '2019-04-10 09:10:15',
        amount: '500',
        orderState: '失败',
        accountBalance: '2000',
        remarkDesc: '失败'
      }
    ]

    columns= [
      {
        title: '序号',
        key: 'index'
      },
      {
        title: '日期',
        key: 'createDate'
      },
      {
        title: '金额',
        key: 'amount'
      },
      {
        title: '状态',
        key: 'orderState'
      },
      {
        title: '账户余额',
        key: 'accountBalance'
      },
      {
        title: '备注/说明',
        key: 'remarkDesc'
      }
    ]

    pagination= {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }

    options= {
      border: true
    }

    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.initData()
    }

    async initData () {
      // let params = {
      //   pageNum: this.pagination.currentPage,
      //   pageSize: this.pagination.pageSize
      // }
      // let data = await axios.get(`/api/shop/accounts`, {params})
      // console.log(data)
    }

    beforeMount () {
      this.initData()
    }
  }
</script>

<style scoped lang="scss">
  .account{
    &-wrap{
      padding: 0 10px;
      margin-bottom: 30px;
    }

    &-list{
      min-height: 850px;
      padding: 10px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e9e9e9;
        padding: 0 15px;
      }

      .income{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px 15px 20px;
        margin-bottom: 20px;

        div{
          flex: 1;
        }
      }
    }
  }

  /deep/.drug-table{
    margin-top: 15px;
    .d2-crud-body{
      padding: 0  15px !important;
      .el-table{
        th{
          background-color: #F4F4F4 !important;
          color: #555 !important;
        }
        td{
          .cell{
            /deep/.el-button+.el-button{
              margin-left: 5px;
              &::before{
                content: '|';
                padding-right: 5px;
                color: #eee;
              }
            }
          }
        }
      }
    }
  }
</style>
