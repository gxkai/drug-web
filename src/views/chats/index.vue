<template>
  <div class="container">
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
    <div class="list"
         ref="list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0">
      <div class="item"
           v-for="(item,index) in list"
           :key="index"
           @click="$router.push({path:'/chats/view',query:{chatId:item.id,shopId:item.shopId}})">
        <div class="left">
          <img :src="getImgURL(item.fileId, 'LARGE_LOGO')">
          <div class="text">
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
        <div class="right">
          <i class="iconfont ic-youjiantou"></i>
        </div>
      </div>
      <new-no-data :length="list.length"></new-no-data>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        pageNum: 1,
        pageSize: 15,
        list: [],
        loading: false
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
        var url = '/chats?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
        this.$http.get(url).then(res => {
          if (res.data.list.length > 0) {
            this.list = this.list.concat(res.data.list);
            this.loading = false;
            this.pageNum++;
          }
        }).catch(error => {
          this.exception(error);
        });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .container {
    background-color: #f8f8f8;
    .list {
      .item {
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        margin-bottom: 10px;
        .left {
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 200px;
            height: 200px;
          }
          .text {
            margin-left: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            & > div {
              width: 400px;
              margin-bottom: 10px;
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
        .right {
          .iconfont {
            font-size: 50px;
          }
        }
      }
    }
  }
</style>
