<template>
  <div class="wrapper" @click="onClick">
    <div class="left">
      <new-image :url="getImgURL(item.fileId, 'LARGE_LOGO')" size="large" />
      <span v-show="item.medicaid">
        医保
      </span>
    </div>
    <div class="center">
      <div class="line line1">
        <span>
          {{ `${item.name}` }}
        </span>
      </div>
      <div class="line line2">
        <span>
          地址：
        </span>
        <span>
          {{ `${item.address}` }}
        </span>
      </div>
      <div class="line line3">
        <span>
          电话：
        </span>
        <span>
          {{ `${item.phone}` }}
        </span>
      </div>
      <div class="line line3" v-show="item.openTime && item.closeTime">
        <span>
          营业时间：
        </span>
        <span>
          {{ `${item.openTime}-${item.closeTime}` }}
        </span>
      </div>
      <div v-show="item.minAmount && item.maxAmount" class="line line4">
        <span>
          价格区间：
        </span>
        <span>
          <i>
            {{ `￥${item.minAmount}` }}
          </i>
          至
          <i>
            {{ `￥${item.maxAmount}` }}
          </i>
        </span>
      </div>
      <div
        v-show="item.minMedicaidAmount && item.maxMedicaidAmount"
        class="line line5"
      >
        <span>
          医保区间：
        </span>
        <span>
          <i>
            {{ `￥${item.minMedicaidAmount}` }}
          </i>
          至
          <i>
            {{ `￥${item.maxMedicaidAmount}` }}
          </i>
        </span>
      </div>
      <div class="line7">
        <span v-if="item.distribution === true" class="tag">
          可配送
        </span>
        <span class="tag">
          可自提
        </span>
        <span class="addr">
          距当前位置:{{ `${item.distance}km` }}
          <van-icon name="dingwei-" />
        </span>
        <!-- <div class="left">
          <span v-if="item.distribution === true">
            可配送
          </span>
          <span>
            可自提
          </span>
        </div>
        <div class="right">
          <span>
            距当前位置：
          </span>
          <span>
            {{ `${item.distance}km` }}
            <van-icon name="dingwei-" />
          </span>
        </div>-->
      </div>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
.wrapper {
  background-color: white;
  padding: 20px 40px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  .left {
    justify-self: center;
    position: relative;
    span {
      position: absolute;
      top: 0;
      width: 62px;
      height: 35px;
      background-color: #ff2905;
      font-size: 15px;
      color: #ffffff;
      text-align: center;
      border-radius: 22px;
      line-height: 35px;
    }
  }
  .center {
    display: grid;
    grid-row-gap: 10px;
    div {
      word-break: break-word;
    }
    .line:not(:first-child) {
      display: grid;
      grid-template-columns: auto 1fr;
      span {
        font-size: 20px;
        color: $gray-dark;
        i {
          font-size: 20px;
          color: #e74a45;
        }
      }
    }
    .line1 {
      span {
        font-size: $size-large !important;
        color: #000000;
      }
    }
    .line4 {
      span {
        i {
          display: inline-block;
          border-radius: 1px;
          border: solid 1px #dedede;
          font-size: 20px !important;
          color: #8d8d8d !important;
          padding: 0 5px;
        }
      }
    }
    .line5 {
      span {
        i {
          display: inline-block;
          border-radius: 1px;
          border: solid 1px #db1b1b;
          font-size: 20px !important;
          color: #e74a45 !important;
          padding: 0 5px;
        }
      }
    }
    .line7 {
      .tag {
        margin-left: 10px;
        padding: 5px 10px;
        background-color: #ffffff;
        border-radius: 7px;
        border: solid 1px $theme;
        font-size: 19px !important;
        color: $theme !important;
      }
      .addr {
        font-size: $size-least;
        color: $gray;
        margin-left: 10px;
      }
    }
  }
}
</style>
<script>
export default {
  name: '',
  mixins: [],
  props: {
    item: {
      default: {
        name: '百家惠大药房',
        address: '昆山市玉山镇朝阳西路203号',
        phone: '0512-57988150',
        minAmount: '11',
        maxAmount: '11',
        minMedicaidAmount: '11',
        maxMedicaidAmount: '11',
        fileId: '',
        distance: '11',
        shopDistance: '11',
        distribution: true
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClick() {
      this.$router.push({
        path: '/shops/view',
        query: { shopId: this.item.id }
      });
    }
  }
};
</script>
