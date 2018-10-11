<template>
  <div class="exchange_record">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      id="header"
    />
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :style="contentStyle"
      >
      <new-coupon-record-item v-for="(item,index) in list" :key="index" :item="item"></new-coupon-record-item>
      <new-no-data v-show="finished === true"></new-no-data>
      </van-list>
 </div>
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
        pageSize: 15,
        contentStyle: {
          height: 0,
          overflow: 'auto'
        }
      };
    },
    created() {
    },
    mounted() {
      this.contentStyle.height = (document.documentElement.clientHeight - document.getElementById('header').clientHeight) + 'px';
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
  .exchange_record {
    width: 720px;
    background-color: #f5f5f5;
  }
</style>
