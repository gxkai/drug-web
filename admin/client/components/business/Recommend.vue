<template>
  <div class="recommend-wrap">
    <div class="recommend">
      <bread-crumb :path="$route.path"/>

      <div class="filter">
        <el-row :gutter="20" class="filter-top">
          <el-col :span="8">
            <span class="tit">药店名称：</span>
            <el-input
              size="small"
              placeholder="请输入"
              v-model="pharmacyValue"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="8">
            <span class="tit">药品名称：</span>
            <el-input
              size="small"
              placeholder="请输入"
              v-model="drugValue"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="8" class="produce-col">
            <span class="tit">生产厂商：</span>
            <el-select size="small" v-model="produceValue" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in produceList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="filter-bottom">
          <el-col :span="8" class="status-col">
            <span class="tit">当前状态：</span>
            <el-select size="small" v-model="curState" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span class="tit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间：</span>
            <el-date-picker
              size="small"
              v-model="dateValue"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="7" class="action-col">
            <el-button type="primary" size="small">搜索</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="list">
        <el-table
          :data="perPageData"
          border
          style="width: 100%">
          <el-table-column
            width="50px"
            prop="id"
            label="序号">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="drugName"
            label="药品名称">
          </el-table-column>
          <el-table-column
            prop="specName"
            label="药品规格">
          </el-table-column>
          <el-table-column
            prop="originName"
            label="生产厂商">
          </el-table-column>
          <el-table-column
            prop="sales"
            label="销量">
          </el-table-column>
          <el-table-column
            prop="price"
            label="销售价">
          </el-table-column>
          <el-table-column
            prop="applyDate"
            label="申请日期">
          </el-table-column>
          <el-table-column
            prop="startDate"
            label="展示开始时间">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="展示结束时间">
          </el-table-column>
          <el-table-column
            prop="applyState"
            label="当前状态">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="viewDetail(scope.$index,scope.row)" type="text" size="small">查看</el-button>

              <el-dropdown trigger="click" v-if="scope.row.showMore">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" size="small" @click="passAction(scope.$index, scope.row)">通过</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" size="small" @click="failPass(scope.$index, scope.row)">不通过</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button type="text" size="small" @click="obtained(scope.$index, scope.row)" v-if="scope.row.showDown">下架</el-button>
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

      <!-- 查看模态框 -->
      <el-dialog
        title="查看"
        :visible.sync="viewDialogVisible"
        width="30%"
        :close-on-click-modal = 'isClickModal'>
        <div class="main">
          <el-form :model="viewData" label-width="100px">
            <el-form-item label="序号">
              <el-input v-model="viewData.serialNumber" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="药品名称">
              <el-input v-model="viewData.pharmacyName" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="药品规格">
              <el-input v-model="viewData.drugSpec" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="生产厂商">
              <el-input v-model="viewData.produce" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="销量">
              <el-input v-model="viewData.salesNum" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="销售价">
              <el-input v-model="viewData.salesPrice" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="申请日期">
              <el-input v-model="viewData.applyDate" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="展示开始时间">
              <el-input v-model="viewData.showStartTime" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="展示结束时间">
              <el-input v-model="viewData.showEndTime" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="当前状态">
              <el-input v-model="viewData.status" readonly placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="viewDialogVisible = false" type="primary">关 闭</el-button>
        </div>
      </el-dialog>

      <!--通过原因-->
      <el-dialog
        title="通过原因"
        :visible.sync="passDialogVisible"
        width="30%"
        :close-on-click-modal='isClickModal'>
        <div class="reason">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入通过原因"
            v-model="passReason">
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="passCancel">取 消</el-button>
          <el-button type="primary" @click="passConfirm">确 定</el-button>
        </span>
      </el-dialog>

      <!--不通过原因-->
      <el-dialog
        title="不通过原因"
        :visible.sync="failDialogVisible"
        width="30%"
        :close-on-click-modal='isClickModal'>
        <div class="reason">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入不通过原因"
            v-model="failReason">
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="failCancel">取 消</el-button>
          <el-button type="primary" @click="failConfirm">确 定</el-button>
        </span>
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
  export default class Recommend extends Vue {
    pharmacyValue = ''
    produceValue = ''
    drugValue = ''
    dateValue = ''
    curState = ''

    produceList = [
      {
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }
    ]

    stateList = [
      {
        value: '不通过',
        label: '不通过'
      },
      {
        value: '活动中',
        label: '活动中'
      },
      {
        value: '待审核',
        label: '待审核'
      }
    ]

    currentPageNum = 1 // 当前页
    pageNum = 15 // 每页显示条数

    tableData = [] // 所有列表数据
    perPageData = [] // 存储每页显示的数据

    // 下架
    obtained (index, row) {

    }

    // 查看
    viewDialogVisible = false
    isClickModal = false
    viewData = {}

    viewDetail (index, row) {
      console.log(index)
      console.log(row)
      this.viewDialogVisible = true
      this.viewData.serialNumber = index + 1
      this.viewData.pharmacyName = row.drugName
      this.viewData.drugSpec = row.specName
      this.viewData.produce = row.originName
      this.viewData.salesNum = row.sales
      this.viewData.salesPrice = row.price
      this.viewData.applyDate = row.applyDate
      this.viewData.showStartTime = row.startDate
      this.viewData.showEndTime = row.endDate
      this.viewData.status = row.applyState
    }

    // 通过原因
    passReason = ''
    passDialogVisible = false
    passAction (index, row) {
      this.passDialogVisible = true
    }
    passCancel () {
      this.passDialogVisible = false
      this.passReason = ''
    }
    passConfirm () {
      this.passDialogVisible = false
      this.passReason = ''
    }

    // 不通过原因
    failReason = ''
    failDialogVisible = false
    failPass (index, row) {
      this.failDialogVisible = true
    }

    failCancel () {
      this.failReason = ''
      this.failDialogVisible = false
    }

    failConfirm () {
      this.failReason = ''
      this.failDialogVisible = false
    }

    handleCurrentChange (page) {
      this.currentPageNum = page
      this.setStatus()
    }

    async setStatus () {
      let params = {
        drugName: '',
        shopId: '',
        start: '',
        pageNum: this.currentPageNum,
        pageSize: this.pageNum
      }
      let getData = await axios.get(`/api/supervise/drugRecommendApplies`, {params: params})
      console.log(getData)
      this.tableData = getData.data.list
      this.perPageData = this.tableData
      this.perPageData = this.perPageData.slice((this.currentPageNum - 1) * this.pageNum, this.currentPageNum * this.pageNum)

      this.perPageData.forEach((item, index) => {
        // 时间戳
        item.applyDate = moment(item.applyDate).format('YYYY-MM-DD HH:mm:ss')
        item.startDate = moment(item.startDate).format('YYYY-MM-DD HH:mm:ss')
        item.endDate = moment(item.endDate).format('YYYY-MM-DD HH:mm:ss')
        // 当前状态
        if (item.applyState === 'SUCCESS') {
          item.applyState = '活动中'
          this.perPageData[index].showDown = true
        }
        if (item.applyState === 'PENDING') {
          item.applyState = '待审核'
          this.perPageData[index].showMore = true
        }
        if (item.applyState === 'FAIL') {
          item.applyState = '不通过'
          // this.perPageData[index].showMore = true
        }
      })
    }
    mounted () {
      this.setStatus()
    }
  }
</script>

<style lang="scss">
  .recommend-wrap{
    padding: 20px;

    .recommend{
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

      textarea{
        border: none;
        outline: none;
        resize: none;
        font-size: 15px;
        color: #949494;
      }

      .filter{
        padding: 0 20px 30px;
        margin: 0 10px 20px;
        text-align: center;
        border-bottom: 1px solid #E9E9E9;

        span.tit{
          font-size: 15px;
        }

        .action-col{
          text-align: right;
          line-height: 40px;
        }

        &-top{
          margin: 20px 0;
        }

        .el-input,.el-select,.el-date-editor{
          width: 80%;
        }

        .produce-col .el-input,
        .status-col .el-input{
          width: 100%;
        }
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


        button:last-child{
          &:before{
            content: '|';
            color: #EEE;
            position: relative;
            left: -4px;
            top: -1px;
          }
        }

        button:first-child{
          margin-right: 8px;

          &:before{
            display: none;
          }
      }

        .el-button+.el-button{
          margin-left: 0;
        }

        .el-dropdown{
          font-size: 12px;
          color: #409eff;

          &:before{
            content: '|';
            color: #EEE;
            position: relative;
            left: -4px;
            top: -1px;
          }



          &-link{
            cursor: pointer;
          }

          .el-icon--right{
            margin-left: 0;
            color: #409eff;
          }
        }

        .show{
          display: inline-block !important;
        }
      }
    }
  }

  .el-dropdown-menu__item{
    .el-button--text{
      color: #606266;
    }
  }
</style>
