<template>
  <new-layout class="repositories-view">
    <van-nav-bar
      :title="info.title"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push('/messageTypes')"
      slot="top"
    >
      <van-icon name="chat" slot="right"/>
    </van-nav-bar>
    <div slot="center">
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
    </div>
  </new-layout>
</template>
<style type="text/less" lang="less">
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
        font-size: 30px;
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
        repositoryTypeId: this.$route.query.repositoryTypeId,
        pageNum: Number(this.$route.query.pageNum)
      };
    },
    created() {
      this.$http.get('/repositories/' + this.id)
        .then(res => {
          this.info = res.data;
          console.log(res.data);
        }).catch(err => {
          this.exception(err);
        });
    },
    methods: {}
  };
</script>
