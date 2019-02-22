<template>
  <new-layout class="drugAppraises">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div class="drugAppraises--item"
               v-for="item in list"
               :key="item.id"
          >
            <div class="drugAppraises--item--title">
              <div class="drugAppraises--item--title__left">
                <img v-lazy="getImgURL(account.fileId,'LARGE_LOGO')">
                <span>{{account.username|asterisk}}</span>
                <van-rate  v-model="item.score" color="red"  readonly/>
              </div>
              <div class="drugAppraises--item--title__right">
                {{dateConvert(item.createdDate)}}
              </div>
            </div>
            <div class="drugAppraises--item--content">
              {{item.content}}
            </div>
            <div class="drugAppraises--item--drug">
              <img
              class="drugAppraises--item--drug--left"
              v-lazy="getImgURL(item.fileId,'LARGE_LOGO')"
              >
              <div
              class="drugAppraises--item--drug__right"
              >
                <div
                class="drugAppraises--item--drug__right--name"
                >
                  {{`药品名称:${item.name}`}}
                </div>
                <div
                class="drugAppraises--item--drug__right--spec"
                >
                  {{`规格:${item.spec}`}}
                </div>
              </div>
            </div>
          </div>
          <new-no-data v-if="finished"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  /deep/.van-rate__item {
    width: 30px!important;
  }
</style>
<style scoped type="text/scss" lang="scss">
  .drugAppraises {
    &--item {
      background-color: white;
      margin-top: 20px;
      padding: 20px;
      &--title {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__left{
          display: flex;
          align-items: center;
          img {
            width: 100px;
            height: 100px;
          }
          span {
            font-size:28px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(102,102,102,1);
            margin: 0 20px;
          }
        }
        &__right {
          font-size:18px;
          font-family:HiraginoSansGB-W3;
          font-weight:normal;
          color:rgba(102,102,102,1);
        }
      }
      &--content {
        padding: 20px 0;
        font-size:22px;
        font-family:HiraginoSansGB-W3;
        font-weight:normal;
        color:rgba(51,51,51,1);
      }
      &--drug {
        padding: 20px;
        display: flex;
        align-items: center;
        background:rgba(238,238,238,1);
        &--left {
          width: 100px;
          height: 100px;
        }
        &__right {
          display: flex;
          flex-flow: column;
          justify-content: center;
          margin-left: 40px;
          &--name {
            font-size:20px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(0,0,0,1);
          }
          &--spec {
            font-size:20px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(102,102,102,1);
          }
        }
      }
    }
  }
</style>
<script>
  import {getAccount} from '@/storage';

  export default {
    name: 'myAppraise',
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        account: getAccount()
      };
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onRefresh() {
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      async onLoad() {
        this.pageNum++;
        const params = {
          'pageNum': this.pageNum,
          'pageSize': this.pageSize
        };
        const data = await this.$http.get('/drugAppraises/mine', params);
        this.isLoading = false;
        this.loading = false;
        this.list = this.list.concat(data.list);
        console.log(this.list);
        if (data.list.length === 0) {
          this.finished = true;
        }
      }
    }
  };
</script>
