<template>
  <new-layout>
    <template slot="center">
      <new-white-space />
      <div v-for="(item, index) in list" :key="index">
        <new-drug :item="item" />
        <div class="appraise-bar">
          <span>
            描述相符
          </span>
          <new-star :score.sync="item.score" size=".56rem" />
        </div>
        <div class="input-wrapper">
          <textarea placeholder="请输入您的评论" maxlength="200" />
        </div>
      </div>
      <new-white-space />
      <div class="title-bar">
        <span>
          店铺评分
        </span>
      </div>
      <div class="appraise-wrapper">
        <div class="appraise-bar">
          <span>
            配送速度
          </span>
          <new-star :score.sync="deliveryScore" size=".56rem" />
        </div>
        <div class="appraise-bar">
          <span>
            服务态度
          </span>
          <new-star :score.sync="serviceScore" size=".56rem" />
        </div>
        <div class="appraise-bar">
          <span>
            商品包装
          </span>
          <new-star :score.sync="describeScore" size=".56rem" />
        </div>
        <div class="appraise-bar">
          <span>
            描述相符
          </span>
          <new-star :score.sync="packageScore" size=".56rem" />
        </div>
      </div>
      <div class="submit-bar">
        <span @click="confirm">
          确认发布
        </span>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
.submit-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  span {
    width: 500px;
    height: 80px;
    background-color: #d7000e;
    border-radius: 25px;
    font-size: $size-large;
    color: white;
    text-align: center;
    line-height: 80px;
  }
}
.title-bar {
  padding: 10px 15px;
  background-color: white;
  span {
    font-size: $size-large;
  }
}
.input-wrapper {
  display: flex;
  justify-content: center;
  background-color: white;
  padding-bottom: 20px;
  textarea {
    width: 690px;
    height: 271px;
    background-color: #eeeeee;
    border-radius: 8px;
    opacity: 0.8;
    border: none;
    -webkit-appearance: none;
    padding: 25px 26px;
    font-size: $size-small;
    &::placeholder {
      color: $gray-light;
    }
  }
}
.appraise-wrapper {
  background-color: white;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.appraise-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 15px;
  span {
    font-size: $size-small;
  }
}
</style>
<script>
export default {
  name: 'MyAppraise',
  components: {},
  data() {
    return {
      orderId: this.$route.query.orderId,
      list: [],
      deliveryScore: 5,
      serviceScore: 5,
      describeScore: 5,
      packageScore: 5,
      shopId: '',
      drugs: [],
      order: {}
    };
  },
  watch: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      this.list = await this.$http.get(`/api/app/orders/${this.orderId}/appraise`);
      this.list.map(e => {
        e.score = 5;
        e.content = '';
      });
      console.log(this.list);
      if (this.list && this.list.length > 0) {
        this.shopId = this.list[0].shopId;
      }
      this.order = await this.$http.get(`/api/app/orders/${this.orderId}`);
    },
    async confirm() {
      this.list.forEach(e => {
        let data = {
          orderItemId: e.orderItemId,
          drugId: e.drugId,
          shopDrugId: e.shopDrugId,
          score: e.score,
          content: e.content
        };
        this.drugs.push(data);
      });
      let data = {
        accountId: this.account.id,
        orderId: this.orderId,
        shopId: this.shopId,
        deliveryScore: this.deliveryScore,
        describeScore: this.describeScore,
        packageScore: this.packageScore,
        serviceScore: this.serviceScore,
        drugs: this.drugs
      };
      await this.$http.post('/api/app/drugAppraises', data);
      this.$toast('评价成功');
      this.$router.replace('/orders');
    }
  }
};
</script>
