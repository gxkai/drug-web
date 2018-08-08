<template>
  <div>
    <div class="content1">
      <div class="title1">
        <div><i class="iconfont ic-yaodian"></i></div>
         <span>{{hospitalName}}</span>
      </div>
      <new-line></new-line>
      <div class="child1">
        <div class="line1">
          <span>订单编号</span>
          <span>{{order.number}}</span>
        </div>
        <div class="line2">
          <span>件数</span>
          <span>{{order.quantity}}</span>
        </div>
        <div class="line3">
          <span>取药号</span>
          <span>{{order.takeNumber}}</span>
        </div>
        <div class="line4">
          <span>取药地址</span>
          <span>{{order.address}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'newTakeList',
    props: {
      order: {
        require: true
      },
      hospitalName: {
        type: String,
        require: true
      }
    },
    methods: {
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
    margin-left: 30px;
  }
  .child1 .line4 span:nth-child(2){
    margin-left: 10px;
  }
  .iconfont {
    font-size: 50px;
  }
</style>
