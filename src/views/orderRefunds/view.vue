<template>
  <div class="f_body">
    <new-header :title="退款详情">
      <router-link tag="i" to="/orderRefunds" class="iconfont ic-arrow-right" slot="left"></router-link>
    </new-header>

    <div class="refund-title is-flex flex-column">
      <span>{{transform(list.state)}}</span>
      <span>{{formatDate(list.lastModifiedDate)}}</span>
    </div>

    <div>
      <div>
        <span>退款总金额</span>
        <span>￥{{list.price}}</span>
      </div>
      <div>
        <span>退回余额</span>
        <span>￥{{list.price}}</span>
      </div>
    </div>
    <div>
      <div>
        <span>退款信息</span>
        <i class="iconfont ic-xiajiantou"></i>
      </div>
      <!--<router-link tag="div" v-for="drug in list.drugs" :key="drug.id" :to="{path:'/shopDrugSpecs',query:{id:drug.id}}">-->
        <!--<div>-->
          <!--<div v-if="drug.isOtc === false">-->
            <!--<img src="static/img/chu.png" class="prescription">-->
          <!--</div>-->
          <!--<div v-else >-->
            <!--<img src="static/img/fei.png" class="prescription">-->
          <!--</div>-->
          <!--<img :src="drug.drugLogo"/>-->
        <!--</div>-->
        <!--<div>-->
          <!--<span >{{drug.name}}</span>-->
          <!--<span >规格:{{drug.spec}}</span>-->
        <!--</div>-->
        <!--<div>-->
          <!--<span>x{{drug.quantity}}</span>-->
        <!--</div>-->
      <!--</router-link>-->
    <!---->

      <new-drug></new-drug>
    </div>
    <div class="is-flex flex-column ">
      <span>退回原因：{{list.reason}}</span>
      <span>退回金额：￥{{list.price}}</span>
      <span>申请时间：{{formatDate(list.createdDate)}}</span>
      <span>退款编号：{{list.number}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderRefundDetails',
    data() {
      return {
        list: {
          state: 'REFUND_COMPLETE',
          lastModifiedDate: '2017-10-31 23:07',
          price: '69.00',
          reason: '不想要了',
          createdDate: '2017-10-31 23:07',
          number: '9879464331678354654',
          drugs: {
            isOtc: true,
            drugLogo: 1,
            name: '药品名称',
            spec: '12/盒',
            quantity: '12'
          }
        },
        count: '',
        formatDate: this.timeConvert
      };
    },
    created() {
      this.$http.get('/orderRefunds/' + this.$route.query.id)
        .then(res => {
          res.data.drugs.forEach(item => {
            item.drugLogo = '/files/' + item.fileId + '/image?resolution=LARGE_LOGO';
          });
          this.list = res.data;
          this.list.state = this.transform(this.list.state);
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
  .is-flex{
    display: flex !important;
  }
  .flex-row{
    flex-direction: row;
  }
  .flex-column{
    flex-direction: column;
  }
  .flex-sa{
    justify-content: space-around;
  }
  .flex-sb{
    justify-content: space-between;
  }
  .flex-item{
    align-items: center;
  }
  .refund-title{
    width:720px;
    height:100px;
    background:rgba(19,193,254,1);
    color: white;
  }
</style>
