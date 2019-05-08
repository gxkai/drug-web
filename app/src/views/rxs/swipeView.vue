<template>
  <div>
    <new-layout>
      <template slot="center">
        <van-swipe @change="onChange">
          <van-swipe-item v-for="(rx,index) in rxs" :key="index" style="height: 100vh">
            <info-wrapper :rx="rx" />
            <rp-wrapper :list="rx.list" />
          </van-swipe-item>
        </van-swipe>
      </template>
    </new-layout>
  </div>
</template>

<script>
import infoWrapper from '@/components/rxs/infoWrapper';
import rpWrapper from '@/components/rxs/rpWrapper';
export default {
  components: {
    infoWrapper,
    rpWrapper
  },
  name: '',
  props: {},
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {
      rxIds: this.$route.params.rxIds,
      rxs: [],
      current: 0
    };
  },
  created() {
  },
  async mounted() {
    for (let index in this.rxIds) {
      let rxId = this.rxIds[index];
      console.log(rxId);
      let rx = await this.$http.get(`/api/app/rxs/${rxId}`);
      this.rxs.push(rx);
    }
    console.log(this.rxs);
  },
  methods: {
    onChange(index) {
      this.current = index;
    }
  }
};
</script>

<style scoped></style>
