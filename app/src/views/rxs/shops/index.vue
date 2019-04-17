<template>
  <new-layout>
    <template slot="top">
      <new-search-bar
        v-model="keyword"
        :placeholder="placeholder"
        @search="search"
      />
      <new-filter-bar
        :filters="filters"
        :active.sync="active"
        @click.native="onFilterBar"
      />
    </template>
    <template slot="center">
      <new-white-space />
      <new-hospital v-if="hospital !== null" :item="hospital" />
      <div v-for="(item, index) in rxShops" :key="index">
        <new-white-space />
        <new-shop :item="item" @click.native="clickItem(item)" disabled/>
      </div>
      <new-end v-if="rxShops.length === 0" name="没有符合条件的药店" />
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss"></style>
<script>
export default {
  data() {
    return {
      active: 0,
      rxId: this.$route.query.rxId,
      rxShops: [],
      rxShops_: [],
      hospitalId: this.$route.query.hospitalId,
      hospital: null,
      placeholder: '\ue643搜索药店',
      keyword: '',
      filters: ['价格最低', '距离最近', '好评优先']
    };
  },
  computed: {},
  watch: {
    keyword(n) {
      if (n.trim() === '') {
        this.rxShops = this._.cloneDeep(this.rxShops_);
      }
    }
  },
  created() {
    this.initData();
  },
  methods: {
    onFilterBar() {
      switch (this.active) {
        case 1:
          this.rxShops = this.rxShops.sort((a, b) => a.distance - b.distance);
          break;
        case 2:
          this.rxShops = this.rxShops.sort((a, b) => a.score - b.score);
          break;
        default:
          this.rxShops = this.rxShops.sort((a, b) => a.minAmount - b.minAmount);
          break;
      }
    },
    initData() {
      this.getRxShops();
      this.getHospital();
    },
    search(e) {
      this.rxShops = this._.cloneDeep(this.rxShops_);
      if (this.keyword !== '') {
        this.rxShops = this.rxShops.filter(s => s.name.includes(this.keyword));
      }
    },
    async getRxShops() {
      this.rxShops_ = await this.$http.get(
        `/api/rxs/${this.rxId}/shops?lng=${this.currentAddress.lng}&lat=${
          this.currentAddress.lat
        }`
      );
      this.rxShops = this._.cloneDeep(this.rxShops_);
    },
    async getHospital() {
      this.hospital = await this.$http.get(
        `/api/rxs/${this.rxId}/hospital?lng=${this.currentAddress.lng}&lat=${
          this.currentAddress.lat
        }`
      );
    },
    clickItem(item) {
      this.loadPageRxsShopsDrugs(this.rxId, item);
    }
  }
};
</script>
