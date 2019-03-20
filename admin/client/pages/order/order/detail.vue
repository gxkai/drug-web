<template>
  <div class="detail-wrap">
    <div class="detail">
      <bread-crumb :path="$route.path"/>

      <div class="title">
        <h3>正在查看订单【201902250000050】的详细信息</h3>
        <el-button size="small" type="primary" @click="$router.go(-1)">返回</el-button>
      </div>

      <div class="main-content">
        <!--订单进度条-->
        <div class="step-bar">
          <el-steps :active="2" align-center>
            <el-step title="待付款" description="2018.03.04 12：30"></el-step>
            <el-step title="已付款" description="2018.03.04 12：30  "></el-step>
            <el-step title="调剂完成" description="2018.03.04 12：30"></el-step>
            <el-step title="待取货/待送达" description="2018.03.04 12：30"></el-step>
            <el-step title="待评价" description="2018.03.04 12：30"></el-step>
            <el-step title="完成" description="2018.03.04 12：30"></el-step>
            <el-step title="退款中" description="2018.03.04 12：30"></el-step>
            <el-step title="退款完成" description="2018.03.04 12：30"></el-step>
          </el-steps>
        </div>

        <!--订单基本信息-->
        <div class="base-info">
          <h5 class="tit">订单基本信息</h5>

          <div class="info-con">
            <div class="left-info">
              <ul>
                <li>
                  <h4>商品总价：4567.89</h4>
                </li>
                <li>
                  <h4>订单总价：4567.89</h4>
                </li>
                <li>
                  <p>商品成本：0.00</p>
                </li>
                <li>
                  <p>付费方式：农商行</p>
                </li>
                <li>
                  <p>医保扣除：0.00</p>
                </li>
                <li>
                  <p>上线付款：100.00</p>
                </li>
                <li>
                  <p>折扣扣除：0.00</p>
                </li>
              </ul>
            </div>
            <div class="right-info">
              <ul>
                <li>
                  <p>收货人：张三丰</p>
                </li>
                <li>
                  <p>收货地址：江苏省 苏州市 昆山市 海创大厦C  22F</p>
                </li>
                <li>
                  <p>联系电话：13888888888 / 0512-55555555</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="remark">
            <span>备注：</span>
            <span>1111</span>
          </div>
        </div>

        <!--订单详情-->
        <div class="order-detail">
          <h5>订单详情：</h5>
          <d2-crud
            ref="orderDetailCrud"
            :columns="orderDetailColumns"
            :data="orderDetailData"
            :options="optionData"/>
          <div class="total">
            <span>合计</span>
            <span>大写金额：贰佰圆整</span>
            <span>小写金额：200.00</span>
          </div>
        </div>

        <!--跟踪记录-->
        <div class="track-record">
          <h5 class="tit">跟踪记录</h5>
          <d2-crud
            ref="trackCrud"
            :columns="trackColumns"
            :data="trackData"
            :loading="loading"
            :pagination="pagination"
            :options="optionData"/>
        </div>

        <!--如果是处方单购药，可以查看到处方单-->
        <div class="prescription-list">
          <h5 class="tit">查看处方单</h5>
          <div class="detail-con">
            <div class="form-info">
              <h4>处方单详情</h4>
              <el-form ref="formInfo" :model="formInfo" label-width="150px">
                <el-form-item label="No：">
                  <el-input v-model="formInfo.idNumber" readonly placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="处方日期：">
                  <el-date-picker
                    v-model="formInfo.rxDate"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="姓名：">
                  <el-input v-model="formInfo.name" readonly placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                  <el-input v-model="formInfo.sex" readonly placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="年龄：">
                  <el-input v-model="formInfo.age" readonly placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="单位地址：">
                  <el-input v-model="formInfo.address" readonly placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                  <el-input v-model="formInfo.telNumber" readonly placeholder="请输入"></el-input>
                </el-form-item><br>
                <el-form-item label="医院：">
                  <el-input v-model="formInfo.hospital" readonly placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="科室：">
                  <el-input v-model="formInfo.department" readonly placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="诊断：">
                  <el-input v-model="formInfo.diagnosis" readonly placeholder="请输入"></el-input>
                </el-form-item>
              </el-form>
            </div>

            <div class="rp-wrap">
              <h4>Rp</h4>
              <d2-crud
                :columns="rpColumns"
                :data="rpData"
                :options="optionData"/>
            </div>
          </div>
        </div>
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
    orderDetailColumns = [
      {
        title: '序号',
        key: 'serialNumber'
      },
      {
        title: '商品名称+规格',
        key: 'productNameSpec'
      },
      {
        title: '单价(元)',
        key: 'price'
      },
      {
        title: '数量',
        key: 'number'
      },
      {
        title: '金额(元)',
        key: 'amount'
      }
    ];
    orderDetailData = [
      {
        serialNumber: '1',
        productNameSpec: '川贝枇杷糖浆，180ml*1',
        price: '20',
        number: '10',
        amount: '200'
      },
      {
        serialNumber: '2',
        productNameSpec: '川贝枇杷糖浆，180ml*1',
        price: '20',
        number: '10',
        amount: '200'
      },
      {
        serialNumber: '3',
        productNameSpec: '川贝枇杷糖浆，180ml*1',
        price: '20',
        number: '10',
        amount: '200'
      }
    ];

    trackColumns = [
      {
        title: '处理时间',
        key: 'processTime'
      },
      {
        title: '处理信息',
        key: 'processInfo'
      },
      {
        title: '处理明细',
        key: 'processDetail'
      },
      {
        title: '操作人',
        key: 'operator'
      }
    ];

    trackData = [
      {
        processTime: '2019-03-19 10:00:45',
        processInfo: '客户1创建订单',
        processDetail: '创建订单',
        operator: '客户1'
      },
      {
        processTime: '2019-03-18 10:00:45',
        processInfo: '客户2创建订单',
        processDetail: '创建订单',
        operator: '客户2'
      }
    ];

    // 处方单详情
    formInfo = {
      idNumber: '',
      rxDate: '',
      name: '',
      sex: '',
      age: '',
      address: '',
      telNumber: '',
      hospital: '',
      department: '',
      diagnosis: ''
    };

    rpColumns = [
      {
        title: '组号',
        key: 'groupNumber'
      },
      {
        title: '药品名（规格）',
        key: 'drugNameSpec'
      },
      {
        title: '用量',
        key: 'dosage'
      },
      {
        title: '用量单位',
        key: 'dosageUnit'
      },
      {
        title: '频次',
        key: 'frequency'
      },
      {
        title: '天数',
        key: 'daysNumber'
      }
    ];

    rpData = [
      {
        groupNumber: '1',
        drugNameSpec: '感冒灵颗粒（15g*16袋）',
        dosage: '15g/次',
        dosageUnit: 'g',
        frequency: '3',
        daysNumber: '1'
      }
    ];

    optionData = {
      border: true
    };

    loading = false;
    pagination = {
      currentPage: 1,
      pageSize: 5,
      total: this.trackData.length
    };
  }
</script>

<style lang="scss">

  .detail-wrap{
    padding: 20px;

    h2, h3, h4, h5{
      margin: 0;
    }

    .detail{
      min-height: 850px;
      background: #FFF;
      padding-bottom: 20px;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .el-table{
        th{
          background-color: #F4F4F4;
          color: #555;
        }
      }

      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px 15px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;
      }

      .main-content{
        padding: 10px 20px;

        .step-bar{
          padding: 30px 0;

          .is-finish{
            color: #F00;
            border-color: #F00;
          }

          .is-process{
            color: #1abc9c;
            border-color: #1abc9c;
          }
        }

        .tit{
          width: 100px;
          padding: 12px;
          margin-top: 30px;
          color: #FFF;
          text-align: center;
          background: #339933;
        }

        .base-info{
          border-bottom: 2px dotted #1abca9;
          padding-bottom: 20px;

          .info-con{
            width: 80%;
            display: flex;

            ul{
              overflow: hidden;
              padding: 0;

              li{

                list-style: none;
                line-height: 30px;

                h4{
                  color: #1abc9c;
                  padding-bottom: 10px;
                }

                h4, p{
                  margin: 0;
                  font-size: 15px;
                }
              }
            }

            .left-info{
              flex: 1;
              li{
                float: left;
                width: 50%;
              }
            }

            .right-info{
              flex: 1;
              padding-top: 10px;
              position: relative;

              &:before{
                content: '';
                width: 2px;
                height: 100%;
                background: linear-gradient(#FFF, #1abc9c, #FFF);
                position: absolute;
                left: 0;
                top: 0;
              }

              ul{
                padding-left: 50px;
              }

              span{
                text-align: right;
              }
            }
          }

          .remark{
            font-size: 15px;
            line-height: 25px;

            span{
              display: inline-block;
              &:first-child{
                width: 50px;
              }

              &:last-child{
                width: 90%;
                border-bottom: 1px solid #000;
              }
            }
          }
        }

        .order-detail{
          width: 95%;

          h5{
            margin-top: 30px;
          }

          .total{
            width: 100%;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            border: 1px solid #ebeef5;

            span{
              font-size: 15px;
              text-align: right;

              &:nth-child(1){
                flex: 2.2;
              }

              &:nth-child(2){
                flex: 1;
              }

              &:nth-child(3){
                flex: 1;
                padding-right: 50px;
              }
            }
          }
        }

        .track-record{
          width: 95%;
        }

        .prescription-list{
          .form-info{
            padding: 20px 300px 0 0;

            h4{
              color: #6c6c6c;
              padding-bottom: 30px;
              padding-left: 20px;
            }

            .el-form{
              display: grid;

              .el-form-item {
                &:nth-child(2n-1){
                  grid-column: 1 / 3;
                }
                &:nth-child(2n){
                  grid-column: 3 / 5;
                }
              }
            }
          }

          .rp-wrap{
            width: 88%;
            margin: auto;
          }
        }
      }
    }
  }
</style>
