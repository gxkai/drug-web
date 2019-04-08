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
              <el-select v-model="orderType" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span>订单状态：</span>
              <el-select v-model="orderState" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in stateList"
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
              <el-select v-model="shopNameValue" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in shopNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="8">
              <span>用户信息：</span>
              <el-select v-model="userValue" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in userList"
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
                :clearable="isClearAble"
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
                订单编号：{{ item.number }}，下单时间：{{ item.createdDate }}，<span>备注：{{ item.accountRemark }}</span>
              </p>
            </div>
            <div class="item item3">
              <table>
                <tr class="tits">
                  <td></td>
                  <td>药品名称</td>
                  <td>单价</td>
                  <td>件数</td>
                  <td>12位条形码</td>
                </tr>
                <tr class="item-info" v-for="item2 in item.orderItemDrugInfoDTOList" :key="item2.drugId">
                  <td>
                    <img class="drug-icon" :src="item2.srcUrl">
                  </td>
                  <td class="text-over">{{ item2.drugName }}</td>
                  <td>{{ item2.price }}</td>
                  <td>{{ item2.quantity }}</td>
                  <td>{{ item2.barCode }}</td>
                </tr>
              </table>
            </div>

            <div class="item item4 item-bg">
              <span>备货门店</span>
            </div>
            <div class="item item5 item-bg">
              <span>用户信息</span>
            </div>
            <div class="item item6 item-bg">
              <span>提货方式</span>
            </div>
            <div class="item item7 item-bg">
              <span>提货人信息</span>
            </div>
            <div class="item item8 item-bg">
              <span>订单类型</span>
            </div>
            <div class="item item9">
              <span class="text-over">{{ item.shopName }}</span>
            </div>
            <div class="item item10">
              <span>{{ item.buyerName }}</span>
            </div>
            <div class="item item11">
              <span>{{ item.deliveryType }}</span>
            </div>
            <div class="item item12">
              <p>姓名：{{ item.consignee }}</p>
              <p>电话：{{ item.buyerPhone }}</p>
              <p class="text-over">地址：{{ item.address }}</p>
            </div>
            <div class="item item13">
              <span>{{$t(item.type)}}</span>
            </div>
          </div>

          <div class="wrapper wrapper2">
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
              <span>{{item.medicaid}}</span>
            </div>
            <div class="item item6">
              <p>{{item.totalAmount}}</p>
              <p>(含医保: {{item.medicaidAmount}} )</p>
              <p>{{item.totalAmount}}</p>
            </div>
            <div class="item item7">
              <span>{{item.state}}</span>
            </div>
            <div class="item item8">
              <el-button type="text" size="medium" @click="viewDetail(index, item.id)">查看详情</el-button>
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
  import axios from 'axios'
  import moment from 'moment'
  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Order extends Vue {
    isClearAble = false
    orderID = ''
    orderType = ''
    typeList = [
      {
        value: '处方',
        label: '处方'
      }
    ]
    orderState = ''
    stateList = [
      {
        value: '状态2',
        label: '状态2'
      }
    ]
    shopNameValue = ''
    shopNameList = [
      {
        value: '选项1',
        label: '黄金糕'
      }
    ]
    userValue = ''
    userList = [
      {
        value: '选项1',
        label: '黄金糕'
      }
    ]
    dateValue = ''

    // 分页
    currentPageNum = 1
    pageNum = 15

    // 所有订单列表数据
    orderListData = []

    perPageData = [] // 存储每页显示的数据

    beforeMount () {
      this.getOrderList()
      this.messageNotice()
    }
    async getOrderList () {
      let params = {
        pageNum: this.currentPageNum,
        pageSize: this.pageNum
      }
      let orderData = await axios.get(`/api/supervise/orders`, {params: params})
      this.orderListData = orderData.data.list
      this.perPageData = this.orderListData
      this.perPageData = this.perPageData.slice((this.currentPageNum - 1) * this.pageNum, this.currentPageNum * this.pageNum)
      // console.log(this.orderListData)
      this.perPageData.forEach((item) => {
        // console.log(item)
        item.createdDate = moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')
        // 获取药品图片
        item.orderItemDrugInfoDTOList.forEach(e => {
          axios.get(`/api/supervise/files/${e.fileId}`, {params: {local: '', resolution: ''}}).then(res => {
            item.orderItemDrugInfoDTOList.map(i => {
              this.$set(i, 'srcUrl', res.data.replace('redirect:', ''))
              return i
            })
          })
        })
        // 转换
        if (item.deliveryType === 'SELF') {
          item.deliveryType = '自提'
        } else {
          item.deliveryType = '配送'
        }
        if (item.medicaid.toString() === 'false') {
          item.medicaid = '否'
        } else {
          item.medicaid = '是'
        }
      })
    }

    handleCurrentChange (page) {
      this.currentPageNum = page
      this.sliceData()
    }

    // 查看详情
    viewDetail (index, id) {
      this.$router.push({
        path: '/order/order/detail',
        query: {
          id: id
        }
      })
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
          grid-template-columns: 65% 35%;

          p{
            margin: 0;
            padding: 5px 0;
          }

          .wrapper {
            display: grid;
            grid-template-rows: 50px 70px auto;
            grid-template-columns: repeat(8, 1fr);
            background: #FFF;

            .text-over{
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100px;
            }

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
                  width: 50px;
                  height: 50px;
                }
              }
            }
          }

          .wrapper1 {
            .item{
              &1{
                grid-area: 1 / 1 / 1 / 5;
              }

              &2{
                grid-column: 1 / 10;
                border-bottom: $tableBorder;
              }

              &3{
                grid-area: 3 / 1 / 3 / 5;
                justify-content: normal;

                td{
                  width: 25%;
                  text-align: center;
                  &:first-child{
                    width: 15%;
                  }
                }

                .tits{
                  display: flex;
                  justify-content: space-between;
                  text-align: right;

                  td{
                    font-weight: 600;
                  }
                }
                .item-info{
                  display: flex;
                  flex-flow: nowrap;
                  align-items: center;
                  padding: 10px 0;
                  .drug-icon{
                  }
                  .drug-info{
                    flex: 2;
                  }
                }
              }

              &4{
                grid-area: 1 / 5 / 1 / 5;
              }

              &5{
                grid-area: 1 / 6 / 2 / 6;
              }

              &6{
                grid-area: 1 / 7 / 2 / 7;
              }

              &7{
                grid-area: 1 / 8 / 1 / 8;
              }

              &8{
                grid-area: 1 / 9 / 1 / 9;
                border-bottom: $tableBorder;
              }

              &9{
                grid-area: 3 / 5 / 3 / 5;
              }

              &10{
                grid-area: 3 / 6 / 3 / 6;
              }

              &11{
                grid-area: 3 / 7 / 3 / 7;
              }

              &12{
                grid-area: 3 / 8 / 3 / 8;
              }

              &13{
                grid-area: 3 / 9 / 3 / 9;
              }

              &3, &9, &10, &11, &12{
                border-right: $tableBorder;
              }

              &1, &4, &5, &6, &7{
                border-right: $tableBorder;
                border-bottom: $tableBorder;
              }
            }
          }

          .wrapper2 {
            display: grid;
            grid-template-rows: 50px auto;
            grid-template-columns: repeat(4, 1fr);

            .item1{
              grid-area: 1/1/2/2;
            }
            .item2{
              grid-area: 1/2/2/3;
            }
            .item3{
              grid-area: 1/3/2/4;
            }
            .item4{
              grid-area: 1/4/2/5;
            }

            .item1, .item2, .item3, .item4{
              border:{
                bottom: $tableBorder;
                right: $tableBorder;
              }
            }

            .item5, .item6, .item7, .item8{
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
