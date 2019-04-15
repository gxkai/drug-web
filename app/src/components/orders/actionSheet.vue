<template>
  <van-popup v-model="show1" position="bottom">
    <van-icon name="cha-" class="close-icon" @click="show1 = false" />
    <header>
      <span>
        请选择支付方式
      </span>
    </header>
    <div class="radio-wrapper hairline-bottom">
      <new-radio
        :radio="!isMedicarePay"
        @click="$emit('update:isMedicarePay', false)"
      />
      <span>自费</span>
    </div>
    <div class="pay-wrapper">
      <header>
        <span class="dot"></span>
        <span class="tip">
          支付提示
        </span>
      </header>
      <article>
        <div v-for="(item, index) in tips" :key="index" class="text">
          {{ item }}
        </div>
      </article>
    </div>
    <new-submit-button name="确认" @click="$emit('confirm')" />
  </van-popup>
</template>

<script>
export default {
  name: '',
  mixins: [],
  model: {
    prop: 'show',
    event: 'show'
  },
  props: {
    isMedicarePay: {},
    show: {}
  },
  data() {
    return {
      show1: this.show,
      tips: [
        '1、为保障您的权益，请您在签收货品时，严格按照《药事管理平台商品验收标准》对货品进行签收。',
        '2、根据《消费者权益保护法》第25条规定，消费者退货的商品应当完好。若商品拆开后，无质量问题，不得退换货。',
        '3、根据《药品经营质量管理规范》第173条规定，除药品质量原因外，药品一经售出，不得退换。因退货药品不可二次销售，若因您个人原因发生退货行为，买家承担药品费用的20%，商家承担药品费用的80%。'
      ]
    };
  },
  computed: {},
  watch: {
    show1(n) {
      this.$emit('show', n);
    },
    show(n) {
      this.show1 = n;
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped type="text/scss" lang="scss">
.close-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}
header {
  text-align: center;
  span {
    font-size: $size-large;
  }
  padding: 20px 0;
}
.radio-wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
  padding: 10px 30px;
}
.pay-wrapper {
  padding: 10px 15px;
  header {
    display: flex;
    align-items: center;
    padding-left: 15px;
    .dot {
      width: 15px;
      height: 15px;
      background-color: $theme;
      border-radius: 50%;
    }
    .tip {
      font-size: $size-small;
      margin-left: 10px;
    }
  }
  article {
    padding: 0 15px;
    .text {
      font-size: $size-small;
      color: $gray;
      line-height: 40px;
    }
  }
}
</style>
