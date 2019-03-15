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
          @view-emit="viewEvent"
          @more-emit="moreEvent"/>
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
  export default class Recommend extends Vue {
    pharmacyValue = '';
    produceValue = '';
    drugValue = '';

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
        title: '销量/销售价',
        key: 'sales'
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
        sales: '1',
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
    mounted () {
    }
    viewEvent ({index, row}) {
      this.$message.success(index.toString())
    }
    moreEvent ({index, row}) {
      this.$message.success(index.toString())
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
        }

        &-top{
          margin: 20px 0;
        }

        .el-input,.el-select,.el-date-editor{
          width: 60%;
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
