<template>
  <div>
    <div class="content1">
      <div class="title1">
        <div><i class="iconfont ic-yaodian"></i></div>
         <span class="text-l-30">{{hospitalName}}</span>
      </div>
      <new-line></new-line>
      <div class="child1">
        <div class="line1 elps">
          <span>订单编号</span>
          <span>{{order.number}}</span>
        </div>
        <div class="line2 elps">
          <span>件数</span>
          <span>{{order.quantity}}</span>
        </div>
        <div class="line3 elps">
          <span>取药号</span>
          <span>{{order.takeNumber}}</span>
        </div>
        <div class="line4 elps">
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
    width: 100%;
    padding: 25px 40px;
  }
  .content1 .child1 div {
    margin-bottom: 13px;
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
    margin-left: 30px;
  }
  .child1 .line4 span {
    font-size: 30px;
  }
  .child1 .line4 span:nth-child(2){
    margin-left: 10px;
  }
  .iconfont {
    font-size: 50px;
  }
</style>
