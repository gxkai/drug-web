<template>
  <div class="f_body">
    <new-header :title="退款详情">
      <router-link tag="i" to="/orderRefunds" class="iconfont ic-arrow-right" slot="left"></router-link>
    </new-header>

    <div class="refund-title is-flex flex-column pl-20">
      <span>{{transform(list.state)}}</span>
      <span>{{formatDate(list.lastModifiedDate)}}</span>
    </div>

    <div class="is-flex flex-column lh-40 p-20">
      <div class="is-flex flex-row flex-sb">
        <span>退款总金额</span>
        <span class="text-red">￥{{list.price}}</span>
      </div>
      <div class="is-flex flex-row flex-sb mt-40">
        <span>退回余额</span>
        <span class="text-red">￥{{list.price}}</span>
      </div>
    </div>
    <div>
    <div class="is-flex flex-row flex-sb lh-40 p-20">
      <span>退款信息</span>
      <i class="iconfont ic-xiajiantou"></i>
    </div>

    <router-link tag="div" v-for="drug in list.drugs" :key="drug.id" :to="{path:'/shopDrugSpecs',query:{id:drug.id}}">
      <new-drug :drugName="drug.name" :isOtc="drug.isOtc" :fileId="drug.drugLogo" :spec="drug.spec" :quantity="drug.quantity"></new-drug>
    </router-link>

    </div>
    <div class="is-flex flex-column p-20 lh-40 text-555555">
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
  .flex-sb{
    justify-content: space-between;
  }

  .refund-title{
    width:720px;
    height:100px;
    background:rgba(19,193,254,1);
    color: white;
  }
  .p-20{
    padding: 20px !important;
  }
  .pl-20{
    padding-left: 20px !important;
  }
  .lh-40{
    line-height: 40px;
  }
  .mt-40{
    margin-top: 40px !important;
  }
  .text-555555{
    color: #555555;
  }

</style>
