<template>
  <div>
    <new-layout>
      <template slot="top">
      </template>
      <template slot="center">
        <new-white-space/>
        <ADDRESS :item="item" v-for="(item, index) in innerRanges" :key="index" @click.native="onAddress(item)"/>
        <new-white-space/>
        <header>
          以下地址超出配送范围
        </header>
        <ADDRESS :item="item" v-for="(item, index) in overRanges" :key="index" style="opacity: 0.5"/>
      </template>
      <template slot="bottom">
        <new-submit-button name="管理地址" @click.native="loadPageAddresses"/>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  header {
    text-align: center;
    font-size: $size-small;
    padding: 10px;
    background-color: white;
  }
</style>
<script>
  import ADDRESS from '@/components/address';
  export default {
    name: 'addresses',
    components: {
      ADDRESS
    },
    data() {
      return {
        list: [],
        shopId: this.$route.query.shopId,
        address: this.$route.params.address,
        innerRanges: [],
        overRanges: []
      };
    },
    created() {
    },
    computed: {},
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initData();
      });
    },
    beforeRouteLeave(to, from, next) {
      to.params.address = this.address;
      next();
    },
    methods: {
      async initData() {
        this.list = await this.$http.get(`/api/addresses/order?shopId=${this.shopId}`);
        this.innerRanges = this.list.filter(e => !e.overRange);
        console.log(this.innerRanges);
        this.overRanges = this.list.filter(e => e.overRange);
        console.log(this.overRanges);
      },
      onAddress(address) {
        this.address = address;
        this.$router.go(-1);
      },
      tip() {
        this.$dialog.confirm({
          title: '超出配送范围',
          message: '改地址与商家距离过远，需回首页重新选择商家',
          confirmButtonText: '重选商家'
        }).then(() => {
          // on confirm
          this.$router.replace('/home');
        }).catch(() => {
          // on cancel
        });
      }
    }
  };
</script>
