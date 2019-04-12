<template>
  <footer>
    <div class="left">
      <van-icon name="qian-" color="#ef1010" size=".8rem"/>
    </div>
    <div class="right">
      <div class="line1">
              <span>
              {{`${quantity}件商品：共计`}}
            </span>
        <span>
              {{`￥${amount}`}}
            </span>
        <span>
              {{`医保报销￥${totalMedicaidPrice}`}}
            </span>
      </div>
      <div class="line2">
              <span>
                （实际医保报销金额，请以提交订单显示为准）
              </span>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    props: {
      quantity: {},
      amount: {},
      totalMedicaidPrice: {}
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  footer {
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: white;
    padding: 20px 10px;
    grid-column-gap: 10px;
    .right {
      .line1 {
        span {
          font-size: $size-mini;
          &:nth-child(1) {
            color: #010000;
          }
          &:nth-child(2) {
            color: #ff0011;
          }
          &:nth-child(3) {
            color: $gray-light;
          }
        }
      }
      .line2 {
        margin-top: 10px;
        span {
          font-size: 18px;
        }
      }
    }
  }
</style>
