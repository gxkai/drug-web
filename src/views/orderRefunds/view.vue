<template>
  <div class="container">
    <new-header title="退款详情">
      <router-link tag="i" to="/orderRefunds" class="icon-font ic-arrow-right" slot="left"></router-link>
    </new-header>
    <div class="refunds-header">
      <span class="refunds-header-state">{{list.state}}</span>
      <span class="refunds-header-time">{{formatDate(list.lastModifiedDate)}}</span>
    </div>

    <div class="refunds-price">
      <div class="refunds-price-sum">
        <span>退款总金额</span>
        <span style="color:#FF0000;">￥{{list.price}}</span>
      </div>
      <div class="refunds-price-residue">
        <span>退回余额</span>
        <span style="color:#FF0000;">￥{{list.price}}</span>
      </div>
    </div>

    <div class="refunds-info">
      <div class="refunds-info-title">
        <span>退款信息</span>
        <img src="../../assets/image/order/down.png"/>
      </div>
      <router-link tag="div" class="refunds-info-detail" v-for="drug in list.drugs" :key="drug.id" :to="{path:'/shopDrugSpecs',query:{id:drug.id}}">
        <div class="refunds-info-detail-img">
          <div class="refunds-info-detail-chufeiImg" v-if="drug.isOtc === false">
            <img src="../../assets/image/chu.png"/>
          </div>
          <div class="refunds-info-detail-chufeiImg" v-else>
            <img src="../../assets/image/fei.png"/>
          </div>
          <div class="refunds-info-detail-drugImg">
            <img :src="drug.drugLogo"/>
          </div>
        </div>
        <div class="refunds-info-detail-message">
          <span class="refunds-info-detail-message-name">{{drug.name}}</span>
          <span class="refunds-info-detail-message-size">
            <p style="font-size: 18px;color:#999999;">规格:{{drug.spec}}</p>
            <p style="font-size:24px; color:#666666;">x{{drug.quantity}}</p>
          </span>
        </div>
      </router-link>
      </div>

    <div class="refunds-footer">
      <span>退回原因：{{list.reason}}</span>
      <span>退回金额：￥{{list.price}}</span>
      <span>申请时间：{{formatDate(list.createdDate)}}</span>
      <span>退款订单号：{{list.number}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderRefundDetails',
    data() {
      return {
        id: '',
        list: [],
        count: '',
        formatDate: this.timeConvert2
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.$http.get('/orderRefunds/' + this.id)
        .then(res => {
          if (res.data !== '') {
            res.data.drugs.forEach(item => {
              item.drugLogo = '/files/' + item.fileId + '/image?resolution=LARGE_LOGO';
            });
            this.list = res.data;
            this.list.state = this.transform(this.list.state);
          }
        });
    },
    methods: {
      transform(state) {
        switch (state) {
          case 'REFUNDING':
            return '退款中';
          case 'REFUND_COMPLETE':
            return '退款完成';
          case 'CLOSES':
            return '订单关闭';
        }
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .container {
    width: 720px;
    height: 100vh;
  }

  .refunds-header {
    width: 720px;
    height: 100px;
    background: rgba(19, 193, 254, 1);
  }

  .refunds-header-state {
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    display: block;
    margin-left: 28px;

  }

  .refunds-header-time {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    display: block;
    margin-left: 28px;
  }

  .refunds-price {
    width: 720px;
    height: 140px;
    background: rgba(238, 238, 238, 1);
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    padding: 19px 26px 19px 24px;
  }

  .refunds-price-sum {
    justify-content: space-between;
    display: flex;
    margin-bottom: 43px;
  }

  .refunds-price-residue {
    justify-content: space-between;
    display: flex;
  }

  .refunds-info {
    width: 680px;
    margin: auto;
    margin-top: 37px;
    background: rgba(238, 238, 238, 1);
  }

  .refunds-info-title {
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    display: flex;
    justify-content: space-between;
  }

  .refunds-info-detail {
    width: 680px;
    height: 188px;
    background: rgba(238, 238, 238, 1);
    margin-top: 21px;
    display: flex;
  }

  .refunds-info-detail-img {
    width: 167px;
    height: 167px;
  }

  .refunds-info-detail-chufeiImg {
    width: 42px;
    height: 25px;
    display: flex;
    left: 0;
    top: 0;
  }

  .refunds-info-detail-drugImg {
    width: 132px;
    height: 130px;
    display: block;
    margin-left: 19px;
  }

  .refunds-info-detail-message {
    margin-top: 34px;
  }

  .refunds-info-detail-message span {
    display: flex;
  }

  .refunds-info-detail-message-name {
    width: 413px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .refunds-info-detail-message-size {
    width: 500px;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .refunds-footer {
    margin-top: 17px;
    padding-left: 25px;
  }

  .refunds-footer span {
    display: flex;
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
  }
</style>
