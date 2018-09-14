<template>
  <div class="chats">
    <div class="header" ref="header">
      <new-header title="咨询列表">
        <div slot="left">
          <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
        </div>
        <div slot="right">
          <router-link tag="i" to="/messageTypes" class="iconfont ic-lingdang"></router-link>
        </div>
      </new-header>
    </div>
    <div class="chats-list"
         ref="list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0">
      <div class="chats-list-item"
           v-for="(item,index) in list"
           :key="index"
           @click="$router.push({path:'/chats/view',query:{chatId:item.id,shopId:item.shopId}})">
        <div class="chats-list-item-left">
          <img :src="getImgURL(item.fileId, 'LARGE_LOGO')">
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
      <new-no-data v-if="loadingComplete"></new-no-data>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        pageNum: 0,
        pageSize: 15,
        list: [],
        loading: true,
        loadingComplete: false
      };
    },
    created() {
      this.loadMore();
    },
    mounted() {
      this.$refs.list.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight) + 'px';
      this.$refs.list.style.overflow = 'auto';
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get('/chats?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize).then(res => {
          if (res.data.list.length > 0) {
            this.list = this.list.concat(res.data.list);
            this.loading = false;
          } else {
            this.loadingComplete = true;
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
        margin-bottom: 10px;
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
