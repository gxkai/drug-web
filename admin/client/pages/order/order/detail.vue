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
          <el-steps :active="1" align-center>
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
        </div>

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
    columnData = [
      {
        title: '商品信息',
        key: 'goodsInfo'
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

  .detail-wrap{
    padding: 20px;

    .detail{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;
      }

      .main-content{
        padding: 10px 20px;

        .base-info{
          .tit{
            width: 100px;
            padding: 12px;
            margin-bottom: 0;
            color: #FFF;
            text-align: center;
            background: #339933;
          }

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
              position: relative;

              ul{
                padding-left: 50px;
              }

              &:before{
                content: '';
                width: 2px;
                height: 100%;
                background: linear-gradient(#FFF, #1abc9c, #FFF);
                position: absolute;
                left: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
