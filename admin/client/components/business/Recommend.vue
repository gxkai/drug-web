<template>
  <div class="recommend-wrap">
    <div class="recommend">
      <bread-crumb :path="$route.path"/>

      <div class="filter">
        <el-row :gutter="20" class="filter-top">
          <el-col :span="8">
            <span class="tit">药店名称：</span>
            <el-input
              style="width: 250px"
              size="small"
              placeholder="请输入"
              v-model="pharmacyValue">
            </el-input>
          </el-col>
          <el-col :span="8">
            <span class="tit">药品名称：</span>
            <el-input
              size="small"
              style="width: 250px"
              placeholder="请输入"
              v-model="drugValue">
            </el-input>
          </el-col>
          <el-col :span="8" class="produce-col">
            <span class="tit">生产厂商：</span>
            <el-select v-model="produceValue" size="small" filterable placeholder="请选择" style="width: 250px">
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
            <el-select v-model="produceValue" size="small" filterable placeholder="请选择" style="width: 250px">
              <el-option
                v-for="item in produceList"
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
              :clearable="disClearable"
              style="width: 250px"
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="4" class="action-col">
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
            prop="serialNumber"
            label="序号">
          </el-table-column>
          <el-table-column
            width="200px"
            prop="pharmacyName"
            label="药店名称">
          </el-table-column>
          <el-table-column
            width="200px"
            prop="drugName"
            label="药品名称">
          </el-table-column>
          <el-table-column
            width="200px"
            prop="drugSpec"
            label="药品规格">
          </el-table-column>
          <el-table-column
            width="200px"
            prop="produce"
            label="生产厂商">
          </el-table-column>
          <el-table-column
            width="50px"
            prop="salesNum"
            label="销量">
          </el-table-column>
          <el-table-column
            width="80px"
            prop="salesPrice"
            label="销售价">
          </el-table-column>
          <el-table-column
            width="100px"
            prop="applyDate"
            label="申请日期">
          </el-table-column>
          <el-table-column
            width="170px"
            prop="showStartTime"
            label="展示开始时间">
          </el-table-column>
          <el-table-column
            width="170px"
            prop="showEndTime"
            label="展示结束时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="当前状态">
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <el-button @click="viewDetail(scope.row)" type="text">查看</el-button>

              <el-dropdown trigger="click" v-if="scope.row.showMore">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="passAction(scope.$index, scope.row)">通过</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="failPass(scope.$index, scope.row)">不通过</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button type="text" @click="obtained(scope.$index, scope.row)" v-if="scope.row.showDown">下架</el-button>
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
            <el-form-item label="药店名称">
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

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Recommend extends Vue {
    pharmacyValue = '';
    produceValue = '';
    drugValue = '';
    dateValue = '';
    disClearable = false;

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
    ];

    currentPageNum = 1; // 当前页
    pageNum = 5; // 每页显示条数

    tableData = [
      {
        serialNumber: '1',
        pharmacyName: '百家慧',
        drugName: '感冒灵',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '活动中'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '待审核'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '通过'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '活动中'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '待审核'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '通过'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '通过'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '通过'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '通过'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '通过'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '通过'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '通过'
      },
      {
        serialNumber: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '通过'
      },
      {
        serialNumber: '2',
        pharmacyName: '2',
        drugSpec: 'qqqqq',
        produce: '2',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '不通过'
      },
      {
        serialNumber: '3',
        pharmacyName: '3',
        drugSpec: '合格',
        produce: '3',
        salesNum: '20',
        salesPrice: '50',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '过期'
      },
      {
        serialNumber: '4',
        pharmacyName: '4',
        drugSpec: '待审核',
        produce: '2',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '待审核'
      },
      {
        serialNumber: '5',
        pharmacyName: '5',
        drugSpec: '活动中',
        produce: '5',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '2019-03-18',
        showStartTime: '2019-03-18 09:26:35',
        showEndTime: '2019-03-18 09:26:35',
        status: '活动中'
      }
    ]; // 所有列表数据
    perPageData = []; // 存储每页显示的数据

    // 下架
    obtained (index, row) {

    }

    // 查看
    viewDialogVisible = false;
    isClickModal = false
    viewData = {};

    viewDetail (row) {
      this.viewDialogVisible = true
      this.viewData.serialNumber = row.serialNumber
      this.viewData.pharmacyName = row.pharmacyName
      this.viewData.drugSpec = row.drugSpec
      this.viewData.produce = row.produce
      this.viewData.salesNum = row.salesNum
      this.viewData.salesPrice = row.salesPrice
      this.viewData.applyDate = row.applyDate
      this.viewData.showStartTime = row.showStartTime
      this.viewData.showEndTime = row.showEndTime
      this.viewData.status = row.status
    }

    // 通过原因
    passReason = '';
    passDialogVisible = false;
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
    failReason = '';
    failDialogVisible = false;
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

    setStatus () {
      this.perPageData = this.tableData
      this.perPageData = this.perPageData.slice((this.currentPageNum - 1) * this.pageNum, this.currentPageNum * this.pageNum)

      this.perPageData.forEach((item, index) => {
        if (item.status === '活动中') {
          this.perPageData[index].showDown = true
        }

        if (item.status === '待审核') {
          this.perPageData[index].showMore = true
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

        &-top{
          margin: 20px 0;
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
            font-size: 14px;
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

  .el-dropdown-menu {
    overflow: hidden;
    &__item {
      .el-button--text {
        color: #606266;
      }
    }
  }
</style>
