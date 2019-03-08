<template>
  <new-layout class="repositories-view">
    <template slot="top">
      <van-nav-bar
        :title="info.title"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="repositories-view--title bgwhite"
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
      <div class="repositories-view--content bgwhite" v-html="info.content">
      </div>
      <div  class="repositories-view--content--bottom">-----&nbsp;&nbsp;我是有底线的&nbsp;&nbsp;-----</div>
    </template>
  </new-layout>
</template>
<style type="text/scss" lang="scss">
  .bgwhite{
    background: white!important;
  }
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
      &--bottom{
        font-size: 20px;
        text-align: center;
        color: #bbbbbb;
        margin-top: 50px;
        margin-bottom: 50px;
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
        id: this.$route.params.id
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
