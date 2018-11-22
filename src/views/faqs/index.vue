<template>
  <new-layout class="faqs">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
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
          <div class="faqs__content__item"
               v-for="(item,index) in list">
            <div class="faqs__content__item__question">
              {{index+1}}、{{ item.question }}
            </div>
            <div class="faqs__content__item__answer">
              {{ item.answer }}
            </div>
          </div>
          <new-no-data v-if="finished"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  .faqs {
    &__content {
      &__item {
        background-color: white;
        &:first-child {
          margin-top: 20px;
        }
        margin-bottom: 20px;
        &__question {
          font-size: 30px;
          padding: 20px;
        }
        &__answer {
          padding: 20px;
          font-size: 25px;
          color: #999999;
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'faqs',
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: []
      };
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
        const data = await this.$http.get('/faqs', params);
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
