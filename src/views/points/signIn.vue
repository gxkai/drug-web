<template>
  <div class="points-container">
    <new-header title="每日签到" class="new-hewder">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>
    <new-header></new-header>
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
          <span class="fz20 fr">查看更多 <i class="iconfont ic-youjiantou"></i></span>
        </div>
      </div>
      <div class="signin-gift">
        <ul>
          <li
            :style="{backgroundImage: 'url(' + require('../../assets/image/coupon/wallet.png') +')',backgroundSize:'100%'}"
            v-for="(item,index) in couPunList" v-if="index<3">
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
        points: '',
        couPunList: [],
        demoEvents: [],
        arr: [],
        continuityDays: ''
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
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var today = y + '/' + m + '/' + d;
        var num = 0;// 声明计数变量;
        this.$http.get('/pointRecords/signIn?month=' + m + '&year=' + y)
          .then(res => {
            let arr = res.data;
            arr.pop();
            let newArr = arr.map(val => {
              let json = {};
              json.date = val.split('-').join('/');
              return json;
            });
            var le = newArr.length;
            if (le !== 0) {
              if (new Date(today) - new Date(newArr[le - 1].date) === 86400000) {
                num = 2;
                for (var i = le; i > 0; i--) {
                  if (new Date(newArr[i - 1]).date - new Date(newArr[i - 2]).date === 86400000) {
                    num++;
                  } else {
                    this.continuityDays = num + 1;
                    break;
                  }
                }
              }
            } else {
              this.continuityDays = '1';
            }
          });
      }
    },
    created() {
      let point = this.$route.query.points;
      this.points = point;
      this.show = !this.show;
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
        });
      this.$http.get('/coupons?pageNum=1&pageSize=3')
        .then(res => {
          this.couPunList = res.data.list;
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
