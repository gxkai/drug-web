<template>
  <div class="record-wrap">
    <div class="record-list">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>交易记录</h3>
      </div>
      <div class="record-search">
        <div class="item item1">
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编号：
            <el-input
              size="small"
              style="width: 260px;"
              placeholder="请输入编号"
              v-model="orderNumber">
            </el-input>
          </div>
          <div>
            药品名称：
            <el-input
              size="small"
              style="width: 260px;"
              placeholder="请输入药品名称"
              v-model="drugNameValue">
            </el-input>
          </div>
          <div>
            当前状态：
            <el-select size="small" v-model="orderStateValue" style="width: 260px;" placeholder="订单状态">
              <el-option
                v-for="item in orderStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="item item2">
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间：
            <el-date-picker
              size="small"
              style="width: 260px;"
              :clearable="isClearable"
              v-model="orderDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div></div>
          <div class="action-btns">
            <el-button type="primary" size="small" @click="searchOrder">搜 索</el-button>
            <el-button size="small" @click="clearCondition">清 空</el-button>
          </div>
        </div>
      </div>
      <div class="trans-list">
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="recordList"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @emit-view="viewRecord"
          @row-remove="removeRecord"
          class="drug-table"
        />
      </div>
    </div>

    <!--查看-->
    <el-dialog
      title="查看"
      :visible.sync="viewDialogVisible"
      width="30%">
      <el-form ref="viewForm" :model="viewData" label-width="120px">
        <el-form-item label="序号">
          <el-input v-model="viewData.index" readonly></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="viewData.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model="viewData.drugName" readonly></el-input>
        </el-form-item>
        <el-form-item label="订单编号/退单号">
          <el-input v-model="viewData.orderRebateNumber" readonly></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="viewData.orderState" readonly></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="viewData.amount" readonly></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
  export default class Record extends Vue {
    viewDialogVisible = false
    isClearable = false
    viewData = {}
    orderNumber = ''
    orderDate = ''
    drugNameValue = ''
    orderStateValue = ''
    // 订单状态
    orderStateOptions = [
      {
        label: '待处理',
        value: '待处理'
      },
      {
        label: '成功',
        value: '成功'
      },
      {
        label: '失败',
        value: '失败'
      }
    ]

    recordList = [
      {
        index: '1',
        createDate: '2019-04-13 13:33:30',
        drugName: '复方氨酚葡锌片',
        orderRebateNumber: '20190412100215',
        amount: '1000',
        orderState: '待入账'
      },
      {
        index: '3',
        createDate: '2019-04-12 13:33:30',
        drugName: '复方氨酚葡锌片',
        orderRebateNumber: '20190412100216',
        amount: '2000',
        orderState: '成功'
      },
      {
        index: '2',
        createDate: '2019-04-11 13:33:30',
        drugName: '复方氨酚葡锌片',
        orderRebateNumber: '20190412100217',
        amount: '3000',
        orderState: '失败'
      }
    ]
    columns= [
      {
        title: '序号',
        key: 'index'
      },
      {
        title: '时间',
        key: 'createDate'
      },
      {
        title: '药品名称',
        key: 'drugName'
      },
      {
        title: '订单编号/退单号',
        key: 'orderRebateNumber'
      },
      {
        title: '状态',
        key: 'orderState'
      },
      {
        title: '金额',
        key: 'amount'
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

    rowHandle = {
      // remove: {
      //   text: '删除',
      //   type: 'text',
      //   emit: 'emit-remove'
      // },
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'emit-view'
        }
      ]
    }

    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.initData()
    }

    viewRecord ({row}) {
      this.viewDialogVisible = true
      this.viewData = row
    }

    removeRecord ({index, row}, done) {
      console.log(row)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      done()
    }

    clearCondition () {
      this.orderNumber = ''
      this.orderDate = ''
      this.drugNameValue = ''
      this.orderStateValue = ''
    }

    searchOrder () {}

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
  .record{
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
    }

    &-search{
      margin: 15px;
      padding: 15px 30px 15px 0;
      font-size: 15px;
      background: #f4f4f4;

      .item{
        display: flex;
        align-items: center;
        justify-content: space-between;

        &1{
          padding-bottom: 20px;

          div{
            &:first-child{
              text-align: left;
            }
            &:nth-child(2){
              text-align: center;
            }
            &:last-child{
              text-align: right;
            }
          }
        }

        div{
          flex: 1;
        }

        .action-btns{
          text-align: right;
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
