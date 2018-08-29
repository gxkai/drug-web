<template>
  <div>
    <div class="content1" v-for="(item,index) in list" :key="index">
      <div class="title1">
        <div>
          <i class="iconfont ic-yaodian"></i>
        </div>
        <span class="text-l-30">{{item.shopName}}</span>
      </div>
      <new-line></new-line>
      <div class="child1">
        <div class="line1">
          <span>订单编号</span>
          <span>{{item.number}}</span>
        </div>
        <div class="line2">
          <span>数量</span>
          <span>{{item.quantity}}</span>
        </div>
        <div class="line3">
          <span>金额</span>
          <span>￥{{item.price}}</span>
        </div>
        <div class="line4">
          <button @click.stop="pay(item,index)">付款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'newPayList',
    props: {
      list: {
        type: Array,
        default: null
      }
    },
    methods: {
      pay(item, index) {
        this.$http.get('/orders/' + item.id + '/pay')
          .then(res => {
            // this.$storage.set('orderId', item.id);
            // const div = document.createElement('div');
            // div.innerHTML = res.data;
            // document.body.appendChild(div);
            // document.forms[0].submit();
            this.list.splice(index, 1);
            if (this.list.length === 0) {
              this.$router.push('/pay/alipay');
            }
          }).catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .content1 {
    background:rgba(255,255,255,1);
    padding: 10px 0 0 10px;
    margin-bottom: 10px;
  }
  .content1 .title1 {
    font-size:30px;
    font-family:HiraginoSansGB-W3;
    color:rgba(69,69,69,1);
    display: flex;
    align-items: center;
  }
  .content1 .child1 {
    padding: 20px
  }
  .content1 .child1 div {
    margin-bottom: 15px;
  }
  .child1 .line1 span:nth-child(1),.child1 .line2 span:nth-child(1),.child1 .line3 span:nth-child(1) {
    font-size:30px;
    font-family:HiraginoSansGB-W3;
    color:rgba(0,0,0,1);
  }
  .child1 .line1 span:nth-child(2) {
    font-size:30px;
    font-family:HiraginoSansGB-W3;
    color:rgba(19,193,254,1);
    margin-left: 10px;
  }
  .child1 .line2 span:nth-child(2) {
    font-size:30px;
    font-family:HiraginoSansGB-W3;
    color:rgba(19,193,254,1);
    margin-left: 60px;
  }
  .child1 .line3 span:nth-child(2) {
    font-size:30px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,0,0,1);
    margin-left: 60px;
  }

  .child1 .line4 {
    display: flex;
    justify-content: flex-end;
  }

  .child1 .line4 button {
    width:120px;
    height:46px;
    background:rgba(19,193,254,1);
    outline: none;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    margin-right: 20px;
    border: 0;
  }

  .iconfont {
    font-size: 50px;
  }
</style>
