<template>
  <!--<van-tabs v-model="active1">
    <van-tab title="到店自取">
      <div class="self-wrapper">
        <shop-cell :desc="shop.address" icon="location" title="自取地址:" />
        <shop-cell
          :desc="`${shop.openTime}-${shop.closeTime}`"
          icon="clock"
          title="营业时间:"
        />
        <shop-cell
          :desc="`${shop.phone}`"
          icon="dianhua-"
          title="电话:"
          @click.native="onPhone(shop.phone)"
        />
        <div class="location" @click="onLocation">
          <van-icon name="location" color="white" size="0.2166rem" />
          <span>
            查看地图
          </span>
        </div>
      </div>
    </van-tab>
    <van-tab title="药店配送" @click.native="onAddress(shop)">
      <div v-if="address === undefined" class="add-wrapper">
        <img src="@/assets/img/orders/create/add.png" />
        <div class="line">
          <span>
            +添加地址
          </span>
        </div>
      </div>
      <div v-else class="self-wrapper">
        <shop-cell :desc="address.consignee || ''" title="收货人:" icon="wo-" />
        <shop-cell
          :desc="address.phone || ''"
          title="收货电话:"
          icon="dianhua-"
        />
        <shop-cell
          :desc="`${address.address || ''}${address.room || ''}`"
          title="收货地址:"
          icon="location"
        />
      </div>
    </van-tab>
  </van-tabs>-->
  <div>
    <header>
      到店自取
    </header>
    <div class="self-wrapper">
      <shop-cell :desc="shop.address" icon="location" title="自取地址:" />
      <shop-cell
        :desc="`${shop.openTime}-${shop.closeTime}`"
        icon="clock"
        title="营业时间:"
      />
      <shop-cell
        :desc="`${shop.phone}`"
        icon="dianhua-"
        title="电话:"
        @click.native="onPhone(shop.phone)"
      />
      <div class="location" @click="onLocation">
        <van-icon name="location" color="white" size="0.2166rem" />
        <span>
            查看地图
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import shopCell from '@/components/orders/shopCell';
export default {
  name: '',
  components: {
    shopCell
  },
  mixins: [],
  model: {
    prop: 'active',
    event: 'active'
  },
  props: {
    shop: {},
    address: {},
    active: {}
  },
  data() {
    return {
      active1: this.active
    };
  },
  computed: {},
  watch: {
    active1(n) {
      this.$emit('active', n);
    },
    active(n) {
      this.active1 = n;
    },
    address(n) {
      this.$emit('address', n);
    }
  },
  created() {},
  mounted() {},
  methods: {
    onLocation() {
      this.loadPageIframe(
        this.jumpToBaidu(
          this.shop.name,
          this.shop.address,
          this.shop.lat,
          this.shop.lng
        ),
        '药店导航'
      );
    },
    onAddress(item) {
      if (!item.distribution) {
        this.$toast('本店不支持配送');
        return;
      }
      this.loadPageOrdersAddresses(item.id);
    },
    onPhone(phone) {
      window.location.href = `tel:${phone}`;
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
  header {
    background-color: white;
    padding: 10px 15px;
  }
.self-wrapper {
  background: white;
  position: relative;
  padding: 20px 15px;
  display: grid;
  grid-row-gap: 20px;
  .location {
    position: absolute;
    display: flex;
    align-items: center;
    width: 130px;
    height: 40px;
    justify-content: center;
    background-color: #ff0000;
    box-shadow: -2px 0px 2px 0px rgba(0, 0, 0, 0.18);
    border-radius: 15px;
    right: 20px;
    bottom: 30px;
    span {
      font-size: 18px;
      color: white;
    }
  }
}
.add-wrapper {
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  img {
    width: 165px;
    height: 101px;
  }
  .line {
    margin-top: 10px;
    span {
      font-size: $size-small;
    }
  }
}
</style>
