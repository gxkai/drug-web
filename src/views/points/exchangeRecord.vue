<template>
  <div class="cointer-full">
    <new-header title="兑换记录">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>
   <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
      <div class="exchange-record bg-white width-percent-100" v-for="(item,index) in goodsList" @click="couponDetail(item)">
        <div class="left d-inline-block">
          <img v-lazy="getImgURL(item.fileId, 'MIDDLE_LOGO')"/>
        </div>
        <div class="right d-inline-block">
          <p class="elps fz30 receive-title">{{item.name}}</p>
          <p class="text-red fz20 gold">{{item.point}}金币</p>
          <p class="fz22 date">{{formatDate(item.expiryDate)}}</p>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        loading: false,
        process: false,
        formatDate: this.timeConvert,
        goodsList: [],
        pageNum: 0,
        pageSize: 5,
        pages: null,
        id: ''
      };
    },
    methods: {
      loadMore() {
        this.pageNum++;
        if (!this.pages || this.pageNum < this.pages) {
          this.loadData();
        } else {
          this.loading = true;
        }
      },
      couponDetail(item) {
        this.$http.get('/couponRecords/' + item.couponId)
          .then(res => {
            this.$router.push('/points/view?id=' + item.couponId + '&type=record' +'&title=' + item.name);
          });
      },
      loadData() {
        this.process = true;
        this.$http.get('/couponRecords')
          .then(res => {
            this.goodsList = this.goodsList.concat(res.data.list);
            if (!this.pages) {
              this.pages = res.data.pages;
            }
            this.process = false;
          }).catch(error => {
            this.exception(error);
            this.process = false;
          });
      }
    },
    created() {
      let id = this.$route.query.id;
      this.id = id;
      this.loadMore();
    }
  };
</script>

<style scoped>
  .cointer-full {
    width: 720px;
    background: #f5f5f5;
  }

  .exchange-record .left {
    width: 165px;
    height: 165px;
    border: 1px solid #f5f5f5;
    margin-left: 56px;
    margin-top: 15px;
  }

  .exchange-record .right {
    margin-left: 37px;
  }

  .exchange-record .left img {
    width: 163px;
    height: 163px;
  }

  .fz22 {
    font-size: 22px;
  }

  .fz20 {
    font-size: 20px;
  }

  .fz30 {
    font-size: 30px;
  }

  .receive-title {
    margin-top: 31px;
  }

  .gold {
    margin-top: 18px;
  }

  .date {
    margin-top: 20px;
  }

  .exchange-record {
    margin-bottom: 13px;
  }

</style>
