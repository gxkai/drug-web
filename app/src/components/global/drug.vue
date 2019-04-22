<template>
  <div
    class="wrapper"
    @click="
      disabled === undefined
        ? loadPageShopDrugs(item.shopDrugId || item.id)
        : ''
    "
  >
    <div class="left">
      <new-image
        :url="getImgURL(item.fileId || item.logo)"
        :rx="!item.otc"
        size="small"
      />
    </div>
    <div class="right">
      <div class="line line1">
        <span>
          {{ item.name || item.drugName || info.name }}
        </span>
        <!--<span>-->
        <!--使用方法-->
        <!--</span>-->
      </div>
      <div class="line line2">
        <span>
          {{
            item.spec || item.specName
              ? `规格：${item.spec || item.specName}`
              : ''
          }}
        </span>
      </div>
      <div class="line line2">
        <span>
          {{ item.sfda ? `国药准字：${item.sfda}` : '' }}
        </span>
      </div>
      <div class="line line2">
        <span>
          {{ item.sales >=0 ? `销量：${item.sales}` : '' }}
        </span>
      </div>
      <div class="line line2">
        <span>
          {{ item.form ? `剂型：${item.form}` : '' }}
        </span>
      </div>
      <div class="line line2">
        <span>
          {{ item.origin ? `生产企业：${item.origin}` : '' }}
        </span>
      </div>
      <div class="line line3">
        <span>
          {{ item.price ? `￥${item.price}` : '' }}
        </span>
        <span>
          {{ item.quantity ? `x${item.quantity}` : '' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    item: {},
    info: {},
    disabled: {}
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped type="text/scss" lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 20px;
  background-color: white;
  padding: 10px 15px;
  .right {
    display: grid;
    align-content: space-evenly;
    .line {
      display: flex;
      justify-content: space-between;
      span {
        font-size: $size-small;
      }
    }
    .line1 {
      span {
        font-weight: 400;
        &:nth-child(2) {
          color: $theme;
        }
      }
    }
    .line2 {
      span {
        color: $gray-light;
      }
    }
    .line3 {
      span {
        font-weight: 400;
        &:nth-child(1) {
          color: $theme;
        }
        &:nth-child(2) {
          color: $gray-light;
        }
      }
    }
  }
}
</style>
