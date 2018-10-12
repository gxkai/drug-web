<template>
  <new-layout class="point"
  centerColor="white"
  >
    <div slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="point-title">
        <div class="point-title-point"
             @click="$router.push('/points/pointRecord')"
        >
          <div>
            <i class="iconfont ic-jifen"></i>
          </div>
          <div>
            <span>剩余积分</span>
            <span>{{point}}</span>
          </div>
        </div>
        <div class="point-title-record">
          <div>
            <i class="iconfont ic-jifen01 text-EC6941"></i>
          </div>
          <div @click.stop="$router.push('/points/exchangeRecord')">
            <span>兑换记录></span>
          </div>
        </div>
      </div>
      <div class="point-goods-title">
        <div></div>
        <div>兑换商品</div>
        <div></div>
      </div>
    </div>
    <div class="point-goods"
    slot="center"
    >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad">

            <div class="point-goods-list">
              <new-coupon-item v-for="(item, index) in list" :key="index" :item="item"></new-coupon-item>
            </div>
            <new-no-data v-if="finished"></new-no-data>
          </van-list>
        </van-pull-refresh>
    </div>
  </new-layout>
</template>
<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        point: 0
      };
    },
    created() {
      this.$http.get('/accounts')
        .then(res => {
          this.point = res.data.point;
        })
        .catch(err => {
          this.exception(err);
        });
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
      onLoad() {
        this.pageNum++;
        this.$http.get('/coupons', {
          params: {
            'pageNum': this.pageNum,
            'pageSize': this.pageSize
          }
        })
          .then(res => {
            this.isLoading = false;
            this.loading = false;
            this.list = this.list.concat(res.data.list);
            console.log(this.list);
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
  .point {
    width: 720px;
    &-title {
      width: 100%;
      height: 120px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      > div {
        width: 360px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &-point {
        border-right: 1px solid black;
        > div:nth-child(1) {
          .ic-jifen {
            color: rgba(19, 193, 254, 1);
            font-size: 50px;
          }
        }
        > div:nth-child(2) {
          margin-left: 30px;
          font-size: 24px;
          font-family: HiraginoSansGB-W3;
          > span:nth-child(1) {
            color: rgba(51, 51, 51, 1);
            font-size: 30px;
          }
          > span:nth-child(2) {
            color: #EC6941;
            font-size: 30px;
          }
        }
      }
      &-record {
        > div:nth-child(1) {
          .ic-jifen01 {
            color: #EC6941;
            font-size: 50px;
          }
        }
        > div:nth-child(2) {
          margin-left: 30px;
          font-family: HiraginoSansGB-W3;
          color: rgba(51, 51, 51, 1);
          & > span {
            font-size: 30px;
          }
        }
      }
    }
    &-goods {
      &-title {
        width: 100%;
        height: 120px;
        background-color: #f8f8f8;
        display: flex;
        justify-content: center;
        align-items: center;
        > div {
          &:nth-child(1), &:nth-child(3) {
            width: 117px;
            height: 2px;
            background: rgba(191, 191, 191, 1);
          }
          &:nth-child(2) {
            font-size: 30px;
            font-family: MicrosoftYaHei;
            color: rgba(0, 0, 0, 1);
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      }
      &-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
</style>
