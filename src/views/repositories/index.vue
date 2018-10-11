<template>
  <div class="repositories">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push('/messageTypes')"
      id="header"
    >
      <van-icon name="chat" slot="right"/>
    </van-nav-bar>
    <div :style="contentStyle">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div
          class="repositories--item van-hairline--bottom"
          v-for="(item, index) in list"
          :key="index"
          @click="$router.push({path:'/repositories/view',query:{id:item.id,repositoryTypeId:repositoryTypeId,title:title,pageNum:index+1}})"
          >
            <div
            class="repositories--item__top"
            >
              <span>
                {{item.title }}
              </span>
              <van-icon name="arrow" color="#999999"></van-icon>
            </div>
            <div
            class="repositories--item__bottom"
            >
              {{ delHtmlTag(item.content)}}
            </div>
          </div>
          <new-no-data v-show="finished === true"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .repositories {
    &--item {
      padding: 20px;
      &__top {
        display: flex;
        justify-content: space-between;
        span {
          font-size:26px;
          font-family:HiraginoSansGB-W3;
          font-weight:normal;
          color:rgba(0,0,0,1);
        }
      }
      &__bottom {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:18px;
        font-family:HiraginoSansGB-W3;
        font-weight:normal;
        color:rgba(102,102,102,1);
      }
    }
  }
</style>
<script>
  export default {
    name: 'repositories',
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        contentStyle: {
          height: 0,
          overflow: 'auto'
        },
        repositoryTypeId: this.$route.query.repositoryTypeId,
        title: this.$route.query.title
      };
    },
    created() {
    },
    mounted() {
      this.contentStyle.height = (document.documentElement.clientHeight - document.getElementById('header').clientHeight) + 'px';
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
        this.$http.get('/repositories/', {
          params: {
            'pageNum': this.pageNum,
            'pageSize': this.pageSize,
            'repositoryTypeId': this.repositoryTypeId
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
