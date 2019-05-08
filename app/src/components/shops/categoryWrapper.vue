<template>
  <div class="category-wrapper">
    <div
      v-for="(item, index) in drugTypes"
      :key="index"
      class="item"
      @click="clickItem(item)"
    >
      <span>
        {{ item.type }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    shopId: {}
  },
  data() {
    return {
      drugTypes: []
    };
  },
  computed: {},
  watch: {},
  async created() {},
  async mounted() {
    this.drugTypes = await this.$http.get(
      `/api/app/shops/${this.shopId}/drugTypes`
    );
    console.log(this.drugTypes);
  },
  methods: {
    clickItem(item) {
      this.loadPageShopsDrugs(this.shopId, item.id);
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.category-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px;
  .item {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    span {
      font-size: $size-mini;
    }
  }
}
</style>
