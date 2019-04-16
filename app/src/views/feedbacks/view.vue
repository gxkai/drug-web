<template>
  <new-layout>
    <template slot="center">
      <new-white-space />
      <header class="hairline-bottom">
        我提交的
      </header>
      <textarea disabled :value="item.content"/>
      <new-white-space />
      <header class="hairline-bottom">
        回复我的
      </header>
      <textarea disabled :value="item.remark"/>
    </template>
  </new-layout>
</template>

<script>
export default {
  name: '',
  mixins: [],
  data() {
    return {
      item: {}
    };
  },
  computed: {},
  watch: {},
  async created() {
    this.item = await this.$http.get(`/api/feedbacks/${this.$route.query.id}`);
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped type="text/scss" lang="scss">
header {
  padding: 10px 15px;
  background: white;
}
textarea {
  width: 720px;
  min-height: 360px;
  background: rgba(255, 255, 255, 1);
  padding: 70px 20px 20px 20px;
  font-size: 30px;
  color: $gray;
}
</style>
