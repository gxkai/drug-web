<template>
  <div class="rec-container">
    <header>
      收货地址
    </header>
    <div
      v-for="item in addresses"
      :key="item.id"
      class="rec-wrapper hairline-bottom"
      @click="$emit('click-item', item)"
    >
      <div class="left">
        <van-icon name="dizhi-" color="#d7000e" />
      </div>
      <div class="right">
        <div class="line1">
          {{ item.room }}
        </div>
        <div class="line2">
          {{ item.address }}
        </div>
        <div class="line3">
          {{ `${item.consignee}    ${item.phone}` }}
        </div>
      </div>
    </div>
    <div class="add-wrapper" @click="loadPageAddressesEdit">
      <span>
        新增
      </span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  data() {
    return {
      addresses: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getAddresses();
  },
  mounted() {},
  methods: {
    async getAddresses() {
      this.addresses = await this.$http.get('/api/addresses');
      this.addresses.map(e => {
        e.name = e.address;
      });
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
@mixin padding {
  padding: 10px 26px;
}
@mixin padding-x {
  padding: 0 26px;
}
@mixin padding-y {
  padding: 10px 0;
}
@mixin header {
  font-size: $size-mini;
  color: $gray;
  @include padding-x;
  padding-top: 5px;
  background-color: white;
}
.rec-container {
  background-color: white;
  header {
    @include header;
  }
  .rec-wrapper {
    margin-top: 20px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    @include padding;
    .right {
      .line2,
      .line3 {
        margin-top: 15px;
        font-size: $size-mini;
        color: $gray;
      }
    }
  }
  .add-wrapper {
    padding: 20px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: $size-mini;
      color: $theme;
    }
  }
}
</style>
