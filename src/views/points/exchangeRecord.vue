<template>
  <new-layout class="exchange_record">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      slot="top"
    />
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        slot="center"
      >
      <new-coupon-record-item v-for="(item,index) in list" :key="index" :item="item"></new-coupon-record-item>
      <new-no-data v-show="finished === true"></new-no-data>
      </van-list>
 </new-layout>
</template>

<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        loading: false,
        finished: false,
        list: [],
        pageNum: 0,
        pageSize: 15
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onLoad() {
        this.pageNum++;
        this.$http.get('/couponRecords/', {
          params: {
            'pageNum': this.pageNum,
            'pageSize': this.pageSize
          }
        })
          .then(res => {
            this.loading = false;
            this.list = this.list.concat(res.data.list);
            console.log(res.data.list);
            if (res.data.list.length === 0) {
              this.finished = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
</style>
