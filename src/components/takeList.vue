<template>
  <div class="take_drug">
    <div class="take_drug-header">
      <div>
        <i class="iconfont ic-yaodian"></i>
      </div>
      <div>{{order.hospital}}</div>
    </div>
    <div class="take_drug-content">
      <div class="take_drug-content-item">
        <span>订单编号&#58;</span>
        <span class="text-blue">{{order.number}}</span>
      </div>
      <div class="take_drug-content-item">
        <span>购买件数&#58;</span>
        <span>{{order.quantity}}</span>
      </div>
      <div class="take_drug-content-item">
        <span>取药号码&#58;</span>
        <span class="text-blue">{{order.takeNumber}}</span>
      </div>
      <div class="take_drug-content-item">
        <span>取药地址&#58;</span>
        <span>{{order.address}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'newTakeList',
    props: ['order'],
    methods: {
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .text-blue {
    color: #1AB6FD;
  }
  .take_drug {
    background-color: white;
    padding: 20px 0;
    &-header {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      div {
        font-size: 30px;
      }
      .iconfont {
        font-size: 50px;
      }
    }
    &-content {
      padding: 0 30px;
      span {
        font-size: 30px;
      }
      &-item {
        padding: 10px 0;
        span:nth-child(2) {
          margin-left: 30px;
        }
      }
    }
  }
</style>
