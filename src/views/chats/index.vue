<template>
  <new-layout class="chats">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      slot="top"
    />
    <div slot="center" class="pt-l-20">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          class="chats-list"
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <div class="chats-list-item"
               v-for="(item,index) in list"
               :key="index"
               @click="$router.push({path:'/chats/view',query:{chatId:item.id,shopId:item.shopId}})">
            <div class="chats-list-item-left">
              <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')">
              <div class="chats-list-item-left-text">
                <div>
                  {{item.shopName}}
                </div>
                <div>
                  {{timeConvert(item.lastModifiedDate)}}
                </div>
                <div>
                  {{item.message||'暂无'}}
                </div>
              </div>
            </div>
            <div class="chats-list-item-left-right">
              <i class="iconfont ic-youjiantou"></i>
            </div>
          </div>
          <new-no-data v-if="finished"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </div>
  </new-layout>
</template>

<script>
  export default {
    name: 'index',
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
      onLoad() {
        this.pageNum++;
        this.$axios.get('/chats/', {
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
  .chats {
    background-color: #f8f8f8;
    &-list {
      &-item {
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        margin-bottom: 20px;
        &-left {
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 200px;
            height: 200px;
          }
          &-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            & > div {
              width: 400px;
              padding: 10px 0 10px 30px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &:nth-child(1) {
                font-size: 30px;
              }
              &:nth-child(2) {
                font-size: 28px;
              }
              &:nth-child(3) {
                font-size: 25px;
              }
            }
          }
        }
        &-right {
          .iconfont {
            font-size: 50px;
          }
        }
      }
    }
  }
</style>
