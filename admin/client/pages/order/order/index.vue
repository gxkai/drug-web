<template>
  <div class="order-wrap">
    <div class="order">
      <bread-crumb :path="$route.path"/>

      <div class="filter">
        <el-row :gutter="20">
          <el-col :span="24" class="filter-top">
            <el-col :span="8">
              <span>订单编号：</span>
              <el-input v-model="input" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="8">
              <span>订单类型：</span>
              <el-select v-model="value2" filterable placeholder="请选择">
                <el-option
                  v-for="item in list2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span>订单状态：</span>
              <el-select v-model="value3" filterable placeholder="请选择">
                <el-option
                  v-for="item in list3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-col>

          <el-col :span="24" class="filter-bottom">
            <el-col :span="8">
              <span>药店名称：</span>
              <el-select v-model="value1" filterable placeholder="请选择">
                <el-option
                  v-for="item in list1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="8">
              <span>用户信息：</span>
              <el-select v-model="value1" filterable placeholder="请选择">
                <el-option
                  v-for="item in list1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间：</span>
              <el-date-picker
                v-model="dateValue"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
          </el-col>

          <el-col :span="23" class="action-col">
            <el-button size="medium" type="primary">搜索</el-button>
            <el-button size="medium">重置</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="list">
        <d2-crud
          :columns="columnData"
          :data="data"
          :options="optionData"
          :pagination="paginationData"/>
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
  export default class Order extends Vue {
    value1 = '';
    list1 = [
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

    value2 = '';
    list2 = [
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

    value3 = '';
    list3 = [
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

    dateValue = '';

    columnData = [
      {
        title: '商品信息',
        key: 'goodsInfo',
        children: [
          {
            title: '订单编号',
            key: 'orderID'
          },
          {
            title: '下单时间',
            key: 'orderTime'
          }
        ]
      },
      {
        title: '备货门店',
        key: 'stockStore'
      },
      {
        title: '用户信息',
        key: 'userInfo'
      },
      {
        title: '提货方式',
        key: 'deliveryMode'
      },
      {
        title: '提货人信息',
        key: 'shipperInfo'
      },
      {
        title: '订单类型',
        key: 'orderType'
      },
      {
        title: '是否医保结算',
        key: 'isMedicalSettle'
      },
      {
        title: '订单金额',
        key: 'orderAmount'
      },
      {
        title: '当前状态',
        key: 'currentState'
      }
    ];

    data = [
      {
        goodsInfo: '1',
        stockStore: '百家惠',
        userInfo: '1',
        deliveryMode: '1',
        shipperInfo: '1',
        orderType: '1',
        isMedicalSettle: '1',
        orderAmount: '1',
        currentState: '1'
      }
    ];

    paginationData = {
      currentPage: 1,
      pageSize: 3, // 每页显示数据条数
      total: this.data.length // 数据总条数
    };

    optionData = {
      border: true
    };
  }
</script>

<style lang="scss">

  .order-wrap{
    padding: 20px;

    .order{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title-add{
        padding: 0 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;

        .add-col{
          text-align: right;
          line-height: 60px;
        }
      }

      .filter{
        margin-bottom: 20px;

        .el-col-8{
          text-align: center;
        }

        .action-col{
          text-align: right;
          line-height: 40px;
        }

        &-bottom{
          margin: 20px 0;
        }

        .el-input,.el-select,.el-date-editor{
          width: 65%;
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

        .repository-edit,
        .repository-list{
          float: left;
        }
      }
    }
  }


</style>
