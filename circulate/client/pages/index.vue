<template>
  <div>
    <div class="top-content">
      <div class="left">
        <div class="avatar">
          <img :src="avatar">
        </div>
        <div class="info">
          <p>早安，某某某，祝你开心每一天！</p>
          <p>{{ userInfo.name }}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{{ userInfo.shopName }}</p>
        </div>
      </div>
      <div class="right">
        <div class="order">
          <p>待处理订单数</p>
          <h3>56</h3>
        </div>
        <div class="amount">
          <p>待帐金额</p>
          <h3>2,223</h3>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="container1">
        <div class="wrapper wrapper1">
          <div class="top">
            <p>
              <span>访问量</span>
              <i class="icon-tishi"></i>
            </p>
            <p>8,846</p>
            <chart-views></chart-views>
          </div>
          <div class="bottom">
            日访问量
            <span>12,423</span>
          </div>
        </div>
        <div class="wrapper wrapper2">
          <div class="top">
            <p>
              <span>订单转化率</span>
              <i class="icon-tishi"></i>
            </p>
            <p>6,560</p>
            <chart-order-conversion></chart-order-conversion>
          </div>
          <div class="bottom">
            转换率
            <span>60%</span>
          </div>
        </div>
        <div class="wrapper wrapper3">
          <div class="top">
            <p>
              <span>订单完成率</span>
              <i class="icon-tishi"></i>
            </p>
            <p>78%</p>
            <chart-completion-rate></chart-completion-rate>
          </div>
          <div class="bottom">
            <span class="week">
              周同比
              <span>12％</span>
            </span>
            <span class="day">
              日环比
              <span>11％</span>
            </span>
          </div>
        </div>
        <div class="wrapper wrapper4">
          <div class="top">
            <p>
              <span>进行中订单数</span>
              <i class="icon-tishi"></i>
            </p>
            <p>6,560</p>
            <chart-progress></chart-progress>
          </div>
          <div class="bottom">
            未完成率
            <span>60%</span>
          </div>
        </div>
      </div>
      <div class="container2">
        <div class="wrapper1">
          <el-row>
            <el-col>
              <div class="columnar">
                <div class="unit">
                  <span>今日</span>
                  <span>本周</span>
                  <span>本月</span>
                  <span>全年</span>
                </div>
                <el-tabs v-model="trendTabActiveName">
                  <el-tab-pane label="转化量" name="conversion">
                    <chart-conversion v-if="trendTabActiveName === 'conversion'"></chart-conversion>
                  </el-tab-pane>
                  <el-tab-pane label="访问量" name="access">
                    <chart-access v-if="trendTabActiveName === 'access'"></chart-access>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="wrapper2">
          <el-card class="sale-hot" style="height: 100%">
            <div slot="header" class="hot-header">
              <el-date-picker
                v-model="hotDateValue"
                type="daterange"
                size="small"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 300px;">
              </el-date-picker>
              <el-button class="search-btn" type="primary" size="small" @click="searchHotDrugs">搜索</el-button>
            </div>
            <el-row>
              <el-col>
                <div class="hot-list">
                  <h3>店内热销排行</h3>
                  <div
                    class="wrapper"
                    v-for="(item, index) in hotList"
                    :key="index"
                  >
                    <div class="item item1">
                      <span :class="[index < 3 ? 'top' : 'bottom']">
                        {{ index + 1 }}
                      </span>
                    </div>
                    <div class="item item2">
                      <span class="ellipsis">
                        {{ item.name }}
                      </span>
                    </div>
                    <div class="item item3">
                      <span>
                        {{ item.count }}
                      </span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
      <div class="container3">
        <div class="wrapper1">
          <el-card style="height: 100%">
            <div slot="header">
              <h3>药品占比</h3>
            </div>
            <el-tabs v-model="proTabActiveName" type="card">
              <el-tab-pane label="所有渠道" name="allChannels">
                <el-row>
                  <el-col>
                    <chart-channel v-if="proTabActiveName === 'allChannels'"></chart-channel>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="处方" name="prescription">
                <el-row>
                  <el-col>
                    <chart-prescription v-if="proTabActiveName === 'prescription'"></chart-prescription>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="自购药" name="purchase">
                <el-row>
                  <el-col>
                    <chart-purchase v-if="proTabActiveName === 'purchase'"></chart-purchase>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
        <div class="wrapper2">
          <el-card class="sale-hot" style="height: 100%">
            <div slot="header">
              <h3>搜索</h3>
            </div>
            <el-row>
              <el-col>
                <div class="charts">
                  <div class="item item1">
                    <p>搜索用户数</p>
                    <p>
                      <span>8,846</span>
                      <span>17.1%</span>
                    </p>
                    <chart-user-number></chart-user-number>
                  </div>
                  <div class="item item1">
                    <p>人均搜索次数</p>
                    <p>
                      <span>2.7</span>
                      <span>26.2%</span>
                    </p>
                    <chart-average></chart-average>
                  </div>
                </div>

                <el-table
                  :data="searchList"
                  style="width: 100%"
                >
                  <el-table-column
                    type="index"
                    label="排名"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="keyword"
                    label="搜索关键词"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="accountNum"
                    label="用户数"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="increase"
                    label="周涨幅"
                    align="center"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <div class="increase-value">
                        <span>{{ scope.row.increase }}</span>
                        <i class="icon-shangyi"></i>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Views from '@/components/charts/views'
  import orderConversion from '@/components/charts/orderConversion'
  import CompletionRate from '@/components/charts/completionRate'
  import Progress from '@/components/charts/progress'
  import Conversion from '@/components/charts/conversion'
  import Access from '@/components/charts/access'
  import Channel from '@/components/charts/channel'
  import Prescription from '@/components/charts/prescription'
  import Purchase from '@/components/charts/purchase'
  import UserNumber from '@/components/charts/search/userNumber'
  import Average from '@/components/charts/search/average'
  import Component from 'class-component'
  import {getUser} from '@/mixins'

  @Component({
    components: {
      'chart-views': Views,
      'chart-order-conversion': orderConversion,
      'chart-completion-rate': CompletionRate,
      'chart-progress': Progress,
      'chart-conversion': Conversion,
      'chart-access': Access,
      'chart-channel': Channel,
      'chart-prescription': Prescription,
      'chart-purchase': Purchase,
      'chart-user-number': UserNumber,
      'chart-average': Average
    }
  })

  export default class Home {
    avatar = require('@/assets/img/avatar.jpg') // 头像
    hotDateValue = '' // 热销日期
    trendTabActiveName = 'conversion'
    hotList = [
      {
        name: '999感冒灵',
        count: 323234
      },
      {
        name: '999感冒灵',
        count: 323234
      },
      {
        name: '999感冒灵',
        count: 323234
      },
      {
        name: '999感冒灵',
        count: 323234
      },
      {
        name: '999感冒灵',
        count: 323234
      },
      {
        name: '999感冒灵',
        count: 323234
      },
      {
        name: '999感冒灵',
        count: 323234
      },
      {
        name: '999感冒灵',
        count: 323234
      },
      {
        name: '999感冒灵',
        count: 323234
      },
      {
        name: '999感冒灵',
        count: 323234
      }
    ]
    proTabActiveName = 'allChannels'
    userInfo = {}

    // 搜索数据
    searchList = [
      {
        keyword: '感冒',
        accountNum: 2234,
        increase: '128%'
      },
      {
        keyword: '胃疼',
        accountNum: 2234,
        increase: '3%'
      },
      {
        keyword: '消炎',
        accountNum: 2234,
        increase: '58%'
      },
      {
        keyword: '拉肚子',
        accountNum: 2234,
        increase: '6%'
      },
      {
        keyword: '菊花茶',
        accountNum: 2234,
        increase: '2%'
      }
    ]

    // 搜索热销药品
    searchHotDrugs () {

    }

    async beforeMount () {
      // let {data: accounts} = await axios.get(`/api/shop/accounts`, {params: {pageNum: 1, pageSize: 15}})
      // console.log(accounts)
    }

    async created () {
      this.userInfo = await getUser()
      console.log(this.userInfo)
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .top-content{
    height: 100px;
    padding: 0px 20px;
    margin-bottom: 20px;
    background: #FFF;
    display: flex;

    .left{
      flex: 2;
      display: flex;
      align-items: center;

      .avatar{
        padding-right: 20px;

        img{
          width: 50px;
        }
      }

      .info{
        p:first-child{
          font-size: 18px;
        }
        p:last-child{
          font-size: 14px;
          color: #9e9e9e;
        }
      }
    }

    .right{
      flex: 1;
      display: flex;
      align-items: center;
      text-align: center;

      p, h3{
        margin: 0;
      }

      p{
        color: #9e9e9e;
        font-size: 15px;
        padding-bottom: 10px;
      }

      h3{
        font-size: 30px;
        font-weight: 500;
      }

      .order{
        position: relative;
        padding-right: 30px;
        margin-right: 30px;

        &:after{
          content: '';
          width: 1px;
          height: 50px;
          background: #DDD;
          position: absolute;
          top: 5px;
          right: 0;
        }
      }
    }
  }

  .main-content{
    padding: 15px 15px 30px;
    .container1{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 30px;

      .wrapper{
        padding: 5px 20px 10px;
        background: #FFF;

        img{
          width: 100%;
        }

        .top{
          p{
            &:first-child{
              display: flex;
              justify-content: space-between;
              font-size: 15px;
              color: #929292;
            }
            &:nth-child(2){
              font-size: 25px;
              font-weight: 500;
              margin-top: 0;
              margin-bottom: 10px;
            }
          }
        }

        .bottom{
          font-size: 14px;
          color: #5a5a5a;
          padding-top: 10px;
          border-top: 1px solid #e9e9e9;

          span{
            padding-left: 30px;
          }
        }
        &3{
          .bottom{
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            span{
              &.week{
                padding-left: 0;
              }

              &.day{
                padding-left: 5px;
              }

              span{
                padding-left: 20px;
                position: relative;

                &:before{
                  content: '';
                  border: 6px solid transparent;
                  position: absolute;
                  left: 5px;
                }
              }

              &:first-child{
                span:before{
                  border-bottom-color: #8fd96b;
                }
              }

              &:last-child{
                span:before{
                  border-top-color: #f5222d;
                  top: 6px;
                }
              }
            }
          }
        }
      }
    }

    .container2{
      display: grid;
      grid-template-columns: 65% 35%;
      background: #FFF;
      margin-top: 20px;
      padding-bottom: 15px;

      .columnar{
        position: relative;
        .unit{
          position: absolute;
          top: 20px;
          right: 50px;
          z-index: 1;
          width: 180px;
          display: flex;
          justify-content: space-between;
          font-size: 15px;
        }
      }

      .sale-hot{
        border: none;
        border-radius: 0;
        box-shadow: none;

        .hot-header{
          display: flex;

          .search-btn{
            margin-left: 20px;
          }
        }

        .hot-list{
          display: grid;
          grid-row-gap: 15px;

          h3{
            font-size: 18px;
            margin-top: 21px;
          }

          .wrapper {
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
            grid-gap: 10px;

            .item {
              display: flex;
              overflow: hidden;
              align-items: center;
              font-size: 15px;
            }
            .item1 {
              span {
                width: 22px;
                height: 22px;
                line-height: 22px;
                font-size: 13px;
                text-align: center;
                border-radius: 50%;
              }
              .top {
                background-color: rgb(43, 61, 79);
                color: #FFF;
              }
              .bottom {
                background-color: rgb(238, 240, 244);
                color: #000;
              }
            }
          }
        }
      }
    }

    .container3{
      display: grid;
      grid-template-columns: 50% 50%;
      margin-top: 20px;
      background: #FFF;
      h3{
        margin: 0;
        font-size: 18px;
      }

      img{
        width: 100%;
      }

      .el-card{
        box-shadow: none;
        border: none;
      }

      .wrapper1{
        padding-right: 20px;
      }
      .wrapper2{
        padding-left: 20px;
        .charts{
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-column-gap: 100px;
          padding-bottom: 10px;

          .item{
            p{
              &:first-child{
                font-size: 15px;
                color: #929292;
              }

              &:nth-child(2){
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                align-items: center;
                span{
                  &:first-child{
                    font-size: 25px;
                    font-weight: 500;
                    color: #5a5a5a;
                  }
                  &:last-child{
                    font-size: 15px;
                    color: #929292;
                  }
                }
              }
            }
          }
        }

        .increase-value{
          display: flex;
          align-items: baseline;

          span{
            flex: 1;
            text-align: right;
          }
          i{
            flex: .5;
            text-align: left;
            color: #52d291;
            font-weight: 600;
          }
        }
      }
    }
  }

  /deep/.container2{
    .columnar{
      .el-tabs{
        &__nav-scroll{
          height: 60px;
          line-height: 60px;
          padding-left: 20px;
        }
        &__content{
          margin: 0 20px;
        }
        &__item{
          font-size: 16px;
        }
        &__nav-wrap::after{
          background: #e8e8e8;
        }
      }
    }

    .sale-hot{
      .el-card{
        &__header{
          padding: 13px 20px;
          border-bottom: 2px solid #E8E8E8;
        }
      }
    }
  }

  /deep/.container3{
    .wrapper1{
      .el-tabs{
        &__header{
          border-bottom: none;
          margin-bottom: 30px;
        }

        &__nav{
          border: none;
          border-radius: 4px
        }

        &__item{
          border: 1px solid #e4e7ed;

          &:first-child{
            border-radius: 4px 0 0 4px;
            border-right-color: transparent;
          }

          &:last-child{
            border-radius: 0 4px 4px 0;
            border-left-color: transparent;
          }

          &.is-active{
            border-color: #409EFF;
          }
        }
      }
    }

    .wrapper2{
      .el-table{
        .has-gutter{
          th{
            padding: 10px 0;
            color: #333;
            background: #f4f4f4;
          }
        }
      }
    }
  }
</style>
