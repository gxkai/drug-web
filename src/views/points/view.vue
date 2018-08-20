<template>
  <div class="points-container">
    <new-header :title="headTitle">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>
    <div class="exchange-shop">
      <img v-lazy="getImgURL(exchangeGoods.fileId,'SMALL_LOGO')" class="coupon-bg1"/>
    </div>
   <div class="exchange-info">
      <div class="exchange-info-title">
        <p class="height-24"></p>
        <p class="fz30 exchange-p1">{{exchangeGoods.name}}</p>
        <p class="text-red exchange-p2 fz20">{{exchangeGoods.point}}金币</p>
        <input type="text" v-model="point" class="d-none"/>
      </div>
      <div class="width-percent-96 m-auto exchange-line">
      </div>
      <div class="exchange-date">
        <span class="d-inline-block fl effective-date"><i class="iconfont ic-riqi1"></i>兑换日期</span>
        <span class="d-inline-block fr">{{formatDate(exchangeGoods.createdDate)}}</span>
      </div>
    </div>
 <div class="exchange-content bg-white width-percent-100 bg-white">
      <div class="width-percent-96 m-auto couponshop-detail">
        <p class="exchange-content-p">商品详情</p>
        <div class="fz20">
          {{exchangeGoods.content}}
        </div>
        <div class="fz20">
          兑换流程
        </div>
        <div class="fz20">
          1、兑换后在我的积分兑换流程里获得【兑换码】并复制；
          2、点击立即购买-填写收件信息-下一步“使用优惠“输入兑换码完成付款。
        </div>
        <div class="fz20">
          注意事项
        </div>
        <div class="fz20">
          <ul>
            <li>
              1、每位用户福利专享，可多次兑换；
            </li>
            <li>
              2、每个订单每张券只能使用一次；
            </li>
            <li>
              3、运费描述：全国包邮（港澳台）除外；
            </li>
            <li>
              4、新疆、西藏、内蒙古偏远地区无法到达；
            </li>
            <li>
              5、商家客服电话：400-601-5563；
            </li>
            <li>
              6、券码使用有效日期：收到优惠码之日起至2018.7.7
            </li>
          </ul>
        </div>
      </div>
    </div>


    <div  v-if="ticket">
      <div class="bg-FA5E38 exchange-btn" @click="change1()">
        马上兑换
      </div>
    </div>

    <div v-if="goods">
      <div class="bg-FA5E38 exchange-btn" @click="change()" v-if="record">
        马上兑换
      </div>
      <div id="whole" v-show="show"></div>
      <transition v-show="show" name="slide-fade">
        <div class="collect-info bg-white" v-show="show">
          <div class="receiver">
             <span class="d-inline-block recept">
              收货信息
            </span>
            <span class="d-inline-block">
                 <i class="iconfont ic-guanbi2 text-13C1FE" @click="close()"></i>
            </span>
          </div>
          <div class="width-percent-100">
            <ul class="consignee width-percent-98 m-auto">
              <li>
                <i>收货人</i>
                <input type="text" placeholder="请输入收货人姓名" v-model="consignee"/>
              </li>
              <li>
                <i>手机号码</i>
                <input type="text" placeholder="请输入收货人号码" v-model="phone"/>
              </li>
              <li>
                <i>所在地区</i>
                <input type="text" value="江苏省昆山市" v-model="area" readonly placeholder="江苏省昆山市"/>
              </li>
              <li>
                <i>详细地址</i>
                <input type="text" placeholder="请输入街道门牌信息等" v-model="address"/>
              </li>
            </ul>
            <div class="sure-btn" @click="sureBtn()">确认</div>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  export default {
    name: 'newPayList',
    data() {
      return {
        formatDate: this.timeConvert,
        point: '',
        consignee: '',
        phone: '',
        area: '',
        address: '',
        headTitle: '',
        show: false,
        fileId: '',
        id: '',
        name: '',
        allPoint: '',
        exchangeGoods: [],
        record: true,
        goods: false,
        ticket: false
      };
    },
    methods: {
      change() {
        this.show = !this.show;
      },
      sureBtn() {
        this.show = !this.show;
        let ID = this.$route.query.id;
        this.$http.post('/couponRecords/article', {
          'couponId': ID,
          'consignee': this.consignee,
          'phone': this.phone,
          'address': this.address
        })
          .then(res => {
            if (res.status === 200) {
              Toast('兑换成功');
              this.$router.push('/points');
            }
          })
          .catch(err => {
            this.exception(err);
          });
      },
      close() {
        this.show = !this.show;
      },
      change1() {
        this.sureBtn();
      }
    },
    created() {
      // 这边是从兑换记录里面带过来，没有提交按钮的，OK
      let record = this.$route.query.type;
      this.headTitle = this.$route.query.title;
      /* if (record === 'record') {
        this.record = false;
      };
*/
      // 这边是判断优惠券还是物品 若优惠券 则没有地址，若物品，则有地址
      if (record === 'goods') {
        this.goods = true;
      };
      if (record === 'ticket') {
        this.ticket = true;
      };

      let id = this.$route.query.id;
      this.$http.get('/couponRecords/' + id + '/article')
        .then(res => {
          this.exchangeGoods = res.data;
          this.allPoint = res.data.point;
        });
    }
  };
</script>

<style scoped>
  .points-container {
    width: 720px;
    background: #f5f5f5;
  }

  .exchange-shop {
    width: 720px;
    height: 300px;
    background: rgba(255, 255, 255, 1);
  }

  .exchange-info {
    width: 720px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    margin-top: 15px;
  }

  .fz30 {
    font-size: 30px;
  }

  .fz20 {
    font-size: 20px;
  }

  .exchange-p1 {
    margin: 0px 0px 19px 29px;
  }

  .exchange-p2 {
    margin: 0px 0px 19px 29px;
  }

  .effective-date {
    margin: 0px 0px 19px 29px;
  }

  .exchange-date {
    font-size: 24px;
    margin-top: 20px;
  }

  .ic-riqi1 {
    margin-right: 30px;
  }

  .exchange-date span:nth-child(2) {
    margin: 0px 17px 19px 29px;
  }

  .height-24 {
    width: 720px;
    height: 24px;
  }

  .exchange-line {
    margin-top: 26px !important;
    height: 2px;
    border-bottom: 1px solid #f5f5f5;
  }

  .exchange-content {
    margin-top: 15px;
  }

  .exchange-content-p {
    font-size: 24px;
    padding-top: 19px;
    font-weight: bold;
  }

  .exchange-btn {
    width: 347px;
    height: 53px;
    background: rgba(250, 94, 56, 1);
    border-radius: 27px;
    color: white;
    margin-left: 187px;
    font-size: 24px;
    text-align: center;
    line-height: 53px;
    margin-top: 46px;
    margin-bottom: 34px;
  }

  .recept {
    margin-left: 302px;
    font-size: 30px;
  }

  .ic-guanbi2 {
    margin-left: 254px;
    font-size: 30px;
  }

  .collect-info {
    position: fixed;
    bottom: 0px;
    z-index: 999;
    width: 720px;
    height: 643px;
  }

  .consignee {
  }

  .consignee li {
    width: 100%;
    height: 79px;
    border-bottom: 1px solid #f5f5f5;
    line-height: 79px;
  }

  i {
    font-style: normal;
  }

  .sure-btn {
    width: 720px;
    height: 96px;
    background: rgba(19, 193, 254, 1);
    font-size: 36px;
    line-height: 96px;
    text-align: center;
    color: white;
    bottom: 0px;
    position: absolute;
    bottom: 0px;
  }

  .consignee li i {
    width: 180px;
    display: inline-block;
  }

  iuput:focus {
    outline: none;
  }

  .receiver {
    margin: 23px 0 60px 0px;
  }

  .consignee li input {
    border: none;
  }

  /*定义进入过渡的结束状态*/
  .slide-fade-enter-active {
    transition: all 0.5s ease;

  }

  /*进入过渡的开始状*/
  .slide-fade-enter {
    bottom: -643px !important;
  }
  .coupon-bg1{
    width: 270px;
    height: 270px;
    margin-left: 225px;
  }
</style>
