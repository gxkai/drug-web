<template>
  <div class="main">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      id="header"
    />
    <div :style="contentStyle" class="body">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div class="drugAppraises-main" v-for="item in list">
            <div class="line1">
              <div>
                <img v-lazy="getImgURL(account.fileId,'LARGE_LOGO')">
                <span>{{account.username|asterisk}}</span>
              </div>
              <span class="text-l-25">{{timeConvert(item.createdDate)}}</span>
            </div>
            <div class="line2">
              {{item.content}}
            </div>
            <div class="line3">
              <img v-lazy="getImgURL(item.fileId,'LARGE_LOGO')">
              <div class="right">
                <p>药品名称：{{item.name}}</p>
                <p>规格:{{item.spec}}</p>
              </div>
            </div>
          </div>
          <new-no-data v-if="finished"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myAppraise',
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
        account: this.$store.getters.account
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
        this.$http.get('/drugAppraises/mine', {
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

<style scoped>
  .drugAppraises-main {
    width: 680px;
    height: 328px;
    margin: auto;
    margin-bottom: 40px;
    background: rgba(255, 255, 255, 1);
  }

  .main {
    background: rgba(241, 239, 240, 1);
    width: 720px;
    height: 100vh;
  }

  .body {
    width: 720px;
    background: rgba(255, 255, 255, 1);
    padding: 20px;
  }

  .line1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .line1 div:nth-child(1) {
    display: inline-flex;
    align-items: center;
  }

  .line1 div:nth-child(1) img {
    width: 62px;
    height: 62px;
    margin-right: 21px;
    border-radius: 50%;
  }

  .line1 div:nth-child(1) span {
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
  }

  .line1 div:nth-child(2) span {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
  }

  .line2 {
    font-size: 25px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    padding: 30px 10px;
  }

  .line3 {
    width: 679px;
    padding: 10px;
    background: rgba(238, 238, 238, 1);
    margin: auto;
    display: flex;
    align-items: center;
  }

  .line3 img {
    width: 150px;
    height: 150px;
    margin-left: 10px;
    margin-right: 31px;
  }

  .line3 .right {
    margin-left: 20px;
  }

  .line3 .right p:nth-child(1) {
    font-size: 25px;
    font-family: HiraginoSansGB-W3;
    color: rgba(0, 0, 0, 1);
  }

  .line3 .right p:nth-child(2) {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
  }
</style>
