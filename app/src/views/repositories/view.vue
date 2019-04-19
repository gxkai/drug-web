<template>
  <new-layout>
    <template slot="center">
      <header>
        <span>
          来源
        </span>
        <span>
          {{ info.source }}
        </span>
        <span>
          发布时间
        </span>
        <span>
          {{ info.createdDate | dateFmt('YYYY年MM月DD日') }}
        </span>
        <span>
          <van-icon name="yueduliang-" size=".4rem" />
        </span>
      </header>
      <article v-html="info.content"></article>
      <new-end/>
    </template>
  </new-layout>
</template>
<style type="text/scss" lang="scss">
header {
  background-color: white;
  padding: 10px 15px;
  span {
    font-size: $size-mini;
    color: $gray;
    margin-left: 10px;
  }
}
article {
  background-color: white;
  width: 100%;
  padding: 0 15px;
  img {
    width: 100%;
  }
}
</style>
<script>
export default {
  name: 'RepositoriesView',
  data() {
    return {
      info: {
        content: '',
        createDate: '',
        id: '',
        title: ''
      },
      title: '',
      id: this.$route.query.id
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.info = await this.$http.get(`/api/repositories/${this.id}`);
    }
  }
};
</script>
