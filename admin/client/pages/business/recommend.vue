<template>
  <div class="recommend-wrap">
    <div class="recommend">
      <bread-crumb :path="$route.path"/>

      <div class="filter">
        <el-row :gutter="20" class="filter-top">
          <el-col :span="8">
            <span class="tit">药店名称：</span>
            <el-input
              placeholder="请输入"
              v-model="pharmacyValue"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="8">
            <span class="tit">药品名称：</span>
            <el-input
              placeholder="请输入"
              v-model="drugValue"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="8" class="produce-col">
            <span class="tit">生产厂商：</span>
            <el-select v-model="produceValue" clearable filterable placeholder="请选择">
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
            <el-select v-model="produceValue" clearable filterable placeholder="请选择">
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
        <d2-crud
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @view-emit="viewDetail"
          @more-emit="moreEvent"/>
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
              <el-input v-model="viewData.num" readonly placeholder="请输入"></el-input>
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
          <el-button @click="failDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="failDialogVisible = false">确 定</el-button>
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
    dateValue = ''

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

    columns= [
      {
        title: '序号',
        key: 'num'
      },
      {
        title: '药店名称',
        key: 'pharmacyName'
      },
      {
        title: '药品规格',
        key: 'drugSpec'
      },
      {
        title: '生产厂商',
        key: 'produce'
      },
      {
        title: '销量',
        key: 'salesNum'
      },
      {
        title: '销售价',
        key: 'salesPrice'
      },
      {
        title: '申请日期',
        key: 'applyDate'
      },
      {
        title: '展示开始时间',
        key: 'showStartTime'
      },
      {
        title: '展示结束时间',
        key: 'showEndTime'
      },
      {
        title: '当前状态',
        key: 'status'
      }
    ];

    data= [
      {
        num: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        salesNum: '10',
        salesPrice: '100',
        applyDate: '1',
        showStartTime: '1',
        showEndTime: '1',
        status: '通过'
      }
    ];
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    };
    options= {
      border: true
    };
    rowHandle= {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'view-emit'
        },
        {
          text: '更多',
          type: 'text',
          emit: 'more-emit'
        }
      ]
    };

    viewDialogVisible = false;
    isClickModal = false
    viewData = {};

    viewDetail ({index, row}) {
      this.viewDialogVisible = true
      this.viewData.num = row.num
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

    failReason = '';
    failDialogVisible = false;
    moreEvent ({index, row}) {
      this.failDialogVisible = true
    }

    mounted () {

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
        margin: 0 10px;
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
      }

      .cell{
        button:last-child:before{
          content: '|';
          color: #EEE;
          position: relative;
          left: -4px;
          top: -1px;
        }
      }
    }
  }
</style>
