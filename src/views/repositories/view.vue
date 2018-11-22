<template>
  <new-layout class="repositories-view">
    <template slot="top">
      <van-nav-bar
        :title="info.title"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="$router.push('/messageTypes')"
      >
        <van-icon name="chat" slot="right"/>
      </van-nav-bar>
    </template>
    <template slot="center">
      <div class="repositories-view--title"
      >
      <span>
        来源
      </span>
        <span>
        {{info.source}}
      </span>
        <span
          class="ml-l-30"
        >
        发布时间
      </span>
        <span>
        {{dateConvert(info.createdDate)}}
      </span>
      </div>
      <div class="repositories-view--content" v-html="info.content">
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  .repositories-view {
    &--title {
      padding: 20px;
      span {
        font-size: 25px;
        color: #999999;
        font-family: HiraginoSansGB-W3;
        font-weight: normal;
      }
    }
    &--content {
      padding: 0 20px;
      * {
        font-size: 25px;
        font-family: HiraginoSansGB-W3;
        font-weight: normal;
      }
      p {
        img {
          width: 100%;
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'repositoriesView',
    data() {
      return {
        info: {
          content: '',
          createDate: '',
          id: '',
          title: ''
        },
        title: '',
        id: this.$route.query.id,
        repositoryTypeId: this.$route.query.repositoryTypeId
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.info = await this.$http.get('/repositories/' + this.id);
      }
    }
  };
</script>
