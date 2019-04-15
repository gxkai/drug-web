<template>
  <div class="wrapper" @click.native="toQyPayUrl">
    <div class="left">
      <new-image :url="getImgURL(item.fileId, 'LARGE_LOGO')" size="large" />
    </div>
    <div class="center ">
      <div class="line line1 ">
        <span>
          {{ `${item.name}` }}
        </span>
      </div>
      <div class="line line2 ">
        <span>
          地址：
        </span>
        <span>
          {{ `${item.address}` }}
        </span>
      </div>
      <div class="line line3 ">
        <span>
          电话：
        </span>
        <span>
          {{ `${item.phone}` }}
        </span>
      </div>
      <div class="line line4 ">
        <span>
          价格：
        </span>
        <span>
          <i>
            {{ `￥${item.amount}` }}
          </i>
        </span>
      </div>
      <div class="line line5 ">
        <span>
          距离位置：
        </span>
        <span>
          {{ `${item.distance}km` }}
        </span>
      </div>
    </div>
    <div class="right"></div>
    <img src="@/assets/img/components/hospitalTag.png" class="hospital-tag" />
  </div>
</template>
<style scoped type="text/scss" lang="scss">
.wrapper {
  .hospital-tag {
    position: absolute;
    width: 86px;
    right: 0;
  }
  position: relative;
  background-color: white;
  padding: 20px 40px;
  display: grid;
  grid-template-columns: auto 1fr 86px;
  grid-column-gap: 20px;
  .left {
    justify-self: center;
  }
  .center {
    display: grid;
    grid-row-gap: 10px;
    align-content: space-between;
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
    line1 {
      span {
        font-size: $size-large !important;
        color: #000000;
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
    item: {}
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async toQyPayUrl() {
      let url = await this.$http.get(`/api/hospitals/${this.item.id}/url`);
      this.loadPageIframe(url, '医院结算');
    }
  }
};
</script>
