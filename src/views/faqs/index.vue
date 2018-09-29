<template>
  <div class="faqs">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="faqs__content"
         ref="content"
         v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
      <div class="faqs__content__item"
           v-for="(item,index) in list">
        <div class="faqs__content__item__question">
          {{index+1}}、{{ item.question }}
        </div>
        <div class="faqs__content__item__answer">
          {{ item.answer }}
        </div>
      </div>
      <new-no-data v-if="loadingComplete"></new-no-data>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .faqs {
    background-color: #f5f5f5;
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
        list: [],
        pageSize: 15,
        pageNum: 0,
        loadingComplete: false,
        loading: true
      };
    },

    created() {
      this.loadMore();
    },
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight) + 'px';
      this.$refs.content.style.overflow = 'auto';
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get('/faqs?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            if (res.data.list.length > 0) {
              this.list = this.list.concat(res.data.list);
              this.loading = false;
            } else {
              this.loadingComplete = true;
            }
          })
          .catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>
