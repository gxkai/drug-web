<template>
  <div class="points-container">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="position-relative">
      <img src="../../assets/image/coupon/signin-bg.png" class="sign-bg"/>
      <div class="points-info">
        <p class="all-points">{{$store.getters.account.point}}积分</p>
        <p class="has-signed width-percent-100">&nbsp;已签到</p>
        <p class="text-center text-13C1FE continuity width-percent-100">&nbsp;&nbsp;连续{{continuityDays}}天</p>
        <p class="text-center has-signed2 text-white width-percent-100">今日已签到，获得{{points}}积分</p>
      </div>
    </div>
    <div class="bg-white">
      <div class="width-percent-96 m-auto">
        <div class="change-point">
          <i class="iconfont ic-liwu-copy text-13C1FE"></i>
          <span class="fz28">积分兑换</span>
          <span class="fz20 fr"
          @click="$router.push('/points')">查看更多 <i class="iconfont ic-youjiantou"></i></span>
        </div>
      </div>
      <div class="signin-gift">
        <ul>
          <li
            :style="{backgroundImage: 'url(' + require('../../assets/image/coupon/wallet.png') +')',backgroundSize:'100%'}"
            v-for="(item,index) in coupons" v-if="index<3"
          @click="linkToPointView(item.id)">
            {{item.point}}积分兑换
          </li>
        </ul>
      </div>
      <vue-event-calendar :events="demoEvents">
        <template slot-scope="props">
          <div v-for="(event, index) in props.showEvents" class="event-item">
            <!-- 这里拿到的是传入的单个event所有数据 -->
            {{event}}
          </div>
        </template>
      </vue-event-calendar>
      <div id="whole" v-show="show"></div>
      <div class="signin-points" v-show="show">
        <div class="width-percent-100 text-right">
          <i class="iconfont ic-guanbi" @click="closed()"></i>
        </div>
        <div>
          <img :src="require('../../assets/image/coupon/golen.png')" class="golden"/>
        </div>
        <div class="text-center scccsess">签到成功</div>
        <div class="text-center controduction">恭喜你获得</div>
        <div class="text-center five-points">{{points}}积分</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        headTitle: '多力葵花籽油',
        show: false,
        points: 0,
        coupons: [],
        demoEvents: [],
        arr: [],
        continuityDays: 0
      };
    },
    methods: {
      monthChange(month) {
      },
      dayChange(day) {
      },
      closed() {
        this.show = !this.show;
      },
      time(date) {
        return new Date(date);
      },
      continuousDate() {
        let date = new Date();
        let y = date.getFullYear();
        let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        console.log(this.arr);
        console.log(y + '-' + m + '-' + d);
        let arr = this.arr.map(e => Date.parse(new Date(e))).sort((a, b) => b - a);
        console.log(arr);
        let today = Date.parse(new Date(y + '-' + m + '-' + d));
        console.log(today);
        for (let i = 0; i < arr.length; i++) {
          console.log(i, arr[i]);
          if (i === 0) {
            if (today === arr[i]) {
              this.continuityDays++;
            }
          } else {
            if (arr[i - 1] - arr[i] === 86400000) {
              this.continuityDays++;
            }
          }
        }
      },
      getPoints() {
        this.$http.get('/pointRecords/signInPoint').then(res => {
          this.points = res.data;
        }).then(error => {
          this.exception(error);
        });
      }
    },
    created() {
      this.$http.post('/pointRecords/signIn').then(res => {
        this.getPoints();
        this.show = !this.show;
      }).catch(error => {
        this.getPoints();
        this.exception(error);
      });
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      this.$http.get('/pointRecords/signIn?month=' + month + '&year=' + year)
        .then(res => {
          let arr = res.data;
          this.arr = res.data;
          let newArr = arr.map(val => {
            let json = {};
            json.date = val.split('-').join('/');
            json.title = '';
            return json;
          });
          this.demoEvents = newArr;
          this.continuousDate();
        })
        .catch(err => {
          this.exception(err);
        });
      this.$http.get('/coupons?pageNum=1&pageSize=3')
        .then(res => {
          this.coupons = res.data.list;
          console.log(res.data.list);
        })
        .catch(err => {
          this.exception(err);
        });
    }
  };
</script>

<style scoped>
  .points-container {
    width: 720px;
    background: #f5f5f5;
  }

  .sign-bg {
    width: 720px;
    height: 371px;
  }

  .all-points {
    width: 130px;
    height: 27px;
    text-align: left;
    font-size: 30px;
  }

  .points-info {
    position: absolute;
    top: 23px;
    left: 0px;
    width: 720px;
  }

  .all-points {
    color: white;
    top: 23px;
    margin-left: 22px;
  }

  .has-signed {
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    color: #13C1FE;
    margin-top: 30px;
  }

  .has-signed2 {
    margin-top: 99px;
    font-size: 29px;
  }

  .continuity {
    font-size: 29px;
    margin-top: 20px;
  }

  .fz28 {
    font-size: 28px;
  }

  .fz20 {
    font-size: 20px;
  }

  .change-point {
    height: 76px;
    line-height: 76px;
  }

  .ic-liwu-copy {
    font-size: 24px;
  }

  .signin-gift ul li {
    width: 228px;
    height: 146px;
    color: white;
    font-size: 25px;
    text-align: center;
    line-height: 146px;
    margin-left: 10px;
    float: left;
  }

  .signin-points {
    position: absolute;
    width: 400px;
    height: 452px;
    background: rgba(255, 255, 255, 1);
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -226px;
    z-index: 999;
  }

  .golden {
    width: 154px;
    height: 105px;
    margin-top: 67px;
    margin-left: 123px;
  }

  .scccsess {
    font-size: 31px;
    color: #333333;
    margin-top: 37px;
  }

  .controduction {
    font-size: 18px;
    color: #333333;
    margin-top: 22px;
  }

  .five-points {
    font-size: 31px;
    color: #FF0000;
    margin-top: 19px;
  }

  .ic-guanbi {
    margin-top: 18px;
    margin-right: 14px;
    color: #999999;
  }

  .__vev_calendar-wrapper {
    font-size: 14px;
  }

  .__vev_calendar-wrapper .cal-wrapper {
    font-size: 14px;
  }

  .__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item .date-num {
    font-size: 14px !important;
  }

  .new-hewder {
    position: fixed;
  }

  .__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item.event {
    background: red;
  }

  .__vev_calendar-wrapper .events-wrapper {
    display: none !important;
  }

  h2.date {
    background: white !important;
  }

  .events-wrapper {
    display: none;
  }

  .__vev_calendar-wrapper .cal-wrapper .cal-body .weeks {
    font-size: 14px !important;
  }
</style>
