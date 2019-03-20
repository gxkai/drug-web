<template>
  <div class="order-wrap">
    <div class="order">
      <bread-crumb :path="$route.path"/>

      <div class="filter">
        <el-row :gutter="20">
          <el-col :span="24" class="filter-top">
            <el-col :span="8">
              <span>订单编号：</span>
              <el-input v-model="orderID" placeholder="请输入"></el-input>
            </el-col>
            <el-col :span="8">
              <span>订单类型：</span>
              <el-select v-model="value2" clearable filterable placeholder="请选择">
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
              <el-select v-model="value3" clearable filterable placeholder="请选择">
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
              <el-select v-model="value1" clearable filterable placeholder="请选择">
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
              <el-select v-model="value1" clearable filterable placeholder="请选择">
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

      <div class="order-list">
        <div class="container" v-for="(item, index) in perPageData" :key="index">
          <div class="wrapper wrapper1">
            <div class="item item1 item-bg">
              <span>商品信息</span>
            </div>
            <div class="item item2">
              <p>
                订单编号：{{ item.orderID }}
              </p>
              <p>
                下单时间：{{ item.orderTime }}
              </p>
            </div>
            <div class="item item3">
              <div class="item-info">
                <img src="../../../assets/img/hospital/img1.png" alt="">
                <p>
                  药品名称：{{ item.drugInfo.name }}
                </p>
                <p>
                  <span>单价：{{ item.drugInfo.price }}</span>
                  <span>，件数：{{ item.drugInfo.quantity }}</span>
                </p>
                <p>12位条形码：{{ item.drugInfo.barCode }}</p>
              </div>
            </div>
          </div>

          <div class="wrapper wrapper2">
            <div class="item item1 item-bg">
              <span>备货门店</span>
            </div>
            <div class="item item2 item-bg">
              <span>用户信息</span>
            </div>
            <div class="item item3 item-bg">
              <span>提货方式</span>
            </div>
            <div class="item item4 item-bg">
              <span>提货人信息</span>
            </div>
            <div class="item item5 item-bg">
              <span>订单类型</span>
            </div>
            <div class="item item6">
              <span>备注：{{ item.remark }}</span>
            </div>
            <div class="item item7">
              <span>{{ item.stockStore }}</span>
            </div>
            <div class="item item8">
              <span>{{ item.username }}</span>
            </div>
            <div class="item item9">
              <span>{{ item.deliveryMode }}</span>
            </div>
            <div class="item item10">
              <p>姓名：{{ item.shipperInfo.userName }}</p>
              <p>电话：{{ item.shipperInfo.phoneNumber }}</p>
              <p>地址：{{ item.shipperInfo.address }}</p>
            </div>
            <div class="item item11">
              <span>{{ item.orderType }}</span>
            </div>
          </div>

          <div class="wrapper wrapper3">
            <div class="item item1 item-bg">
              <span>是否医保结算</span>
            </div>
            <div class="item item2 item-bg">
              <span>订单金额</span>
            </div>
            <div class="item item3 item-bg">
              <span>当前状态</span>
            </div>
            <div class="item item4 item-bg">
              <span>操作</span>
            </div>
            <div class="item item5">
              <span>{{ item.isMedicalInsuranceSettle }}</span>
            </div>
            <div class="item item6">
              <p>{{ item.orderAmount.amount }}</p>
              <p>{{ item.orderAmount.msPrice }}</p>
              <p>{{ item.orderAmount.payMode }}</p>
            </div>
            <div class="item item7">
              <span>{{ item.status }}</span>
            </div>
            <div class="item item8">
              <el-button type="text" size="medium" @click="viewDetail(index, item.orderID)">查看详情</el-button>
              <el-button type="text" size="medium" @click="finishedAdjust(index)">调剂完成</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPageNum"
          :page-size="pageNum"
          layout="prev, pager, next, jumper, total"
          :total="orderListData.length">
        </el-pagination>
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
    orderID = '';
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

    currentPageNum = 1; // 当前页
    pageNum = 5; // 每页显示条数

    // 所有订单列表数据
    orderListData = [
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      },
      {
        orderID: '201902250000050',
        orderTime: '2019-03-18 09:26:35',
        drugInfo: {
          name: '感冒灵颗粒',
          price: 20,
          quantity: 5,
          barCode: '123456789123'
        },
        remark: '请配送到xxx',
        stockStore: '百家惠大药房',
        userName: '老王',
        deliveryMode: '自提', // 自提/配送
        shipperInfo: {
          userName: '老王',
          phoneNumber: '18616533247',
          address: '江苏省 苏州市 昆山市 海创大厦C 22F'
        },
        orderType: '处方', // 处方/自购
        isMedicalInsuranceSettle: '是', // 是/否
        orderAmount: {
          amount: 100,
          msPrice: '(含医保: 90)',
          payMode: '医保支付'
        },
        status: '调剂中'
      }
    ];

    perPageData = []; // 存储每页显示的数据

    sliceData () {
      this.perPageData = this.orderListData
      this.perPageData = this.perPageData.slice((this.currentPageNum - 1) * this.pageNum, this.currentPageNum * this.pageNum)
    }

    handleCurrentChange (page) {
      this.currentPageNum = page
      this.sliceData()
    }

    // 查看详情
    viewDetail (index, orderID) {
      this.$router.push('/order/order/detail')
    }

    // 调剂完成
    finishedAdjust (index) {

    }

    messageNotice () {
      this.$notify.info({
        message: '您有一笔新订单，请及时确认！',
        position: 'bottom-right',
        customClass: 'notice-msg'
      })
    }

    mounted () {
      this.sliceData()
      this.messageNotice()
    }
  }
</script>

<style lang="scss">
  $tableBorder: 1px solid #EBEEF5;

  .order-wrap{
    padding: 20px;

    .order{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .filter{
        margin: 20px 15px;
        padding-bottom: 20px;
        border-bottom: 1px solid #E9E9E9;

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

        .el-select{
          .el-input{
            width: 100%;
          }
        }
      }

      &-list{
        .container {
          font-size: 15px;
          margin: 30px 15px 0;
          display: grid;
          background: #EBEEF5;
          border: $tableBorder;
          grid-column-gap: 1px;
          grid-template-columns: 20% 1fr 30%;

          p{
            margin: 10px 0 0;
          }

          .wrapper {
            display: grid;
            grid-template-rows: 50px 90px 190px;
            background: #FFF;

            .item{
              display: flex;
              flex-flow: column;
              justify-content: center;
              padding: 10px;

              &-bg{
                color: #555;
                font-weight: bold;
                background-color: #F4F4F4;
              }

              &-info{
                img{
                  width: 100px;
                }
              }
            }
          }

          .wrapper1 {
            .item1{
              /*align-items: center;*/
            }
            .item1,.item2 {
              border-bottom: $tableBorder;
            }
          }

          .wrapper2 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 50% 1fr;

            .item{
              /*align-items: center;*/
            }

            .item1{
              grid-area: 1/1/2/2;
              border:{
                bottom: $tableBorder;
                right: $tableBorder;
              }
            }
            .item2{
              grid-area: 1/2/2/3;
              border:{
                bottom: $tableBorder;
                right: $tableBorder;
              }
            }
            .item3{
              grid-area: 1/3/2/4;
              border:{
                bottom: $tableBorder;
                right: $tableBorder;
              }
            }
            .item4{
              grid-area: 1/4/2/5;
              border:{
                bottom: $tableBorder;
                right: $tableBorder;
              }
            }
            .item5{
              grid-area: 1/5/2/6;
              border:{
                bottom: $tableBorder;
                right: $tableBorder;
              }
            }
            .item6{
              grid-area: 2/1/3/6;
              border-bottom: $tableBorder;
            }
            .item7, .item8, .item9, .item10{
              border-right: $tableBorder;
            }

            /*.item{*/
            /*&:nth-child(5){*/
            /*align-items: start;*/
            /*}*/
            /*&:nth-child(8){*/
            /*align-items: start;*/
            /*}*/
            /*}*/
          }

          .wrapper3 {
            display: grid;
            grid-template-rows: 50px 280px;
            grid-template-columns: repeat(4, 1fr);

            /*.item{*/
            /*align-items: center;*/
            /*}*/

            .item1{
              grid-area: 1/1/2/2;
              border:{
                bottom: $tableBorder;
                right: $tableBorder;
              }
            }
            .item2{
              grid-area: 1/2/2/3;
              border:{
                bottom: $tableBorder;
                right: $tableBorder;
              }
            }
            .item3{
              grid-area: 1/3/2/4;
              border:{
                bottom: $tableBorder;
                right: $tableBorder;
              }
            }
            .item4{
              grid-area: 1/4/2/5;
              border-bottom: $tableBorder;
            }

            .item5, .item6, .item7{
              border-right: $tableBorder;
            }

            .el-button+.el-button {
              margin-left: 0;
            }
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
  }

  /*消息提醒样式*/
  .el-notification .el-icon-info{
    color: #FFBF00;
  }

  .el-notification__content{
    margin-top: 3px;
  }
</style>
