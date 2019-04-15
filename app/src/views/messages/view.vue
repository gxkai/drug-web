<template>
  <div>
    <new-layout>
      <template slot="center">
        <new-white-space />
        <div class="wrapper">
          <div class="line line1">
            <span>
              {{ `${item.title}` }}
            </span>
          </div>
          <div class="line line2">
            <span>
              {{ item.content }}
            </span>
          </div>
          <div class="line line3">
            <span>
              {{ item.createdDate | dateFmt('YYYY-MM-DD hh:mm:ss') }}
            </span>
          </div>
        </div>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
.wrapper {
  display: grid;
  background-color: white;
  padding: 10px 15px;
  grid-row-gap: 10px;
  .line1 {
    span {
    }
  }
  .line2 {
    span {
      font-size: $size-mini;
      color: $gray;
    }
  }
  .line3 {
    justify-self: right;
    span {
      font-size: $size-mini;
    }
  }
}
</style>
<script>
export default {
  name: '',
  mixins: [],
  data() {
    return {
      messageId: this.$route.query.messageId,
      item: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      this.item = await this.$http.get(`/api/messages/${this.messageId}`);
      this.$http.put(`/api/messages/read?messageId=${this.messageId}`);
    }
  }
};
</script>
