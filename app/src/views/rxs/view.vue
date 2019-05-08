<template>
  <div>
    <new-layout>
      <template slot="center">
        <info-wrapper :rx="rx" />
        <rp-wrapper :list="rx.list" />
      </template>
      <template slot="bottom">
        <new-submit-button
          v-show="!hideButton"
          :background-color="rx.state === 'ENABLED' ? '#d7000e' : '#999999'"
          name="购买"
          @click="submit"
        />
      </template>
    </new-layout>
  </div>
</template>
<style type="text/scss" lang="scss" scoped></style>
<script>
import infoWrapper from '@/components/rxs/infoWrapper';
import rpWrapper from '@/components/rxs/rpWrapper';
export default {
  components: {
    infoWrapper,
    rpWrapper
  },
  data() {
    return {
      rxId: this.$route.query.rxId,
      state: '',
      rx: [],
      hideButton: this.$route.query.hideButton || false
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      this.rx = await this.$http.get('/api/app/rxs/' + this.rxId);
      console.log(this.rx);
    },
    submit() {
      if (this.rx.state === 'ENABLED') {
        this.loadPageRxsShops(this.rxId, this.rx.hospitalId);
      } else {
        this.$toast('处方单已失效');
      }
    }
  }
};
</script>
