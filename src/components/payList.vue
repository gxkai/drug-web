<template>
  <div>
    <div class="content1" v-for="(item,index) in list" :key="index">
      <div class="title1">
        <i class="iconfont ic-yaodian"></i>
        <span>{{item.shopName}}</span>
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
      pay(item) {
        this.$http.get('/orders/' + item.id + '/pay')
          .then(res => {
            this.$storage.set('orderId', item.id);
            const div = document.createElement('div');
            div.innerHTML = res.data;
            document.body.appendChild(div);
            document.forms[0].submit();
          }).catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .content1 {
    height:291px;
    background:rgba(255,255,255,1);
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
    padding-left: 68px;
    padding-top: 20px;
  }
  .content1 .child1 div {
    margin-bottom: 4px;
  }
  .child1 .line1 span:nth-child(1),.child1 .line2 span:nth-child(1),.child1 .line3 span:nth-child(1) {
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(0,0,0,1);
  }
  .child1 .line1 span:nth-child(2) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(19,193,254,1);
    margin-left: 10px;
  }
  .child1 .line2 span:nth-child(2) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(19,193,254,1);
    margin-left: 60px;
  }
  .child1 .line3 span:nth-child(2) {
    font-size:24px;
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
