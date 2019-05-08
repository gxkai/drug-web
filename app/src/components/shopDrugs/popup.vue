<template>
  <van-popup v-model="show1" position="bottom">
    <div class="wrapper">
      <header>
        <div class="left">
          <img v-lazy="getImgURL(item.logo || item.drugLogo, 'LARGE_LOGO')" />
        </div>
        <div class="center">
          <div class="line1">
            {{ `${item.name}` }}
          </div>
          <div class="line3">
            {{ `￥${item.price}` }}
          </div>
        </div>
        <div class="right">
          <van-icon name="cha-" color="#cccccc" @click.native="show1 = false" />
        </div>
      </header>
      <article>
        <div class="cell">
          <span>
            库存
          </span>
          <span>
            {{ item.stock }}
          </span>
        </div>
        <div class="cell">
          <span>
            购买数量
          </span>
          <new-stepper v-model="number" :min="1" :max="item.stock" />
        </div>
      </article>
      <footer @click="onConfirm">
        <span>
          确定
        </span>
      </footer>
    </div>
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
    item: {},
    show: {},
    type: {}
  },
  data() {
    return {
      number: 1,
      show1: this.show
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
  created() {
    console.log(this.item);
  },
  mounted() {},
  methods: {
    async onConfirm() {
      if (this.type === 0 || this.type === undefined) {
        const data = [
          {
            shopId: this.item.shopId,
            drugId: this.item.drugId,
            shopDrugId: this.item.id || this.item.shopDrugId,
            quantity: this.number
          }
        ];
        await this.$http.post('/api/app/carts', data);
        this.$toast('加入购物车成功');
        this.show1 = false;
      } else {
        let items = [];
        items.push({
          shopDrugId: this.item.id,
          quantity: this.number
        });
        let json = {
          shopId: this.item.shopId,
          items: items
        };
        const shopDrugOrderDTO = await this.$http.post(
          '/api/app/orders/shop/preClose',
          json
        );
        this.loadPageOrdersCreateFromShop(shopDrugOrderDTO);
      }
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.wrapper {
  padding: 10px 20px;
  position: relative;
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 20px;
    .left {
      img {
        height: 200px;
        width: 200px;
      }
    }
    .center {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      div {
        word-break: break-word;
      }
      .line1 {
        font-size: $size-small;
      }
      .line2 {
        font-size: $size-mini;
      }
      .line3 {
        font-size: $size-mini;
        color: $theme;
      }
    }
  }
  article {
    margin-top: 30px;
    .cell {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      span {
        color: $gray;
        &:nth-child(2) {
          font-size: $size-small;
        }
      }
    }
  }
  footer {
    margin-top: 40px;
    margin-bottom: 20px;
    background-color: $theme;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 76px;
    span {
      font-size: $size-small;
      color: white;
    }
  }
}
</style>
