<template>
  <div class="drug-wrapper">
    <div class="left">
      <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')" />
    </div>
    <div class="right">
      <div class="line1">
        <span>名称：</span>
        <span>{{ item.name }}</span>
      </div>
      <div class="line1">
        <span>用量：</span>
        <span>{{ item.dosage }}</span>
      </div>
      <div class="line1">
        <span>厂商：</span>
        <span>{{ item.originName }}</span>
      </div>
      <div class="line2">
        <span>{{ `￥${item.price}` }}</span>
        <span>{{ `(医保报销金额￥${item.medicaidPrice})` }}</span>
      </div>
    </div>
  </div>
</template>

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
  methods: {}
};
</script>

<style scoped type="text/scss" lang="scss">
.drug-wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  background-color: white;
  padding: 10px 15px;
  align-items: center;
  .left {
    img {
      width: 230px;
      height: 190px;
    }
  }
  .right {
    display: grid;
    grid-row-gap: 10px;
    .line1 {
      display: grid;
      grid-template-columns: auto 1fr;
      span {
        word-break: break-word;
        font-size: $size-mini;
      }
    }
    .line2 {
      span {
        &:nth-child(1) {
          font-size: $size-mini;
          color: #ff0000;
        }
        &:nth-child(2) {
          font-size: 18px;
          color: $gray;
        }
      }
    }
  }
}
</style>
