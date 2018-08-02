<template>
  <!-- TODO 倒计时-->
<div class="rxs-container" >

<div class="rxs-header position-relative">
  <div class="rx-header-title position-relative">
    <router-link to="/">
    <i class="iconfont ic-arrow-right position-absolute position-lt fz-40 text-white"></i>
    </router-link>
    <span>处方列表</span>
  </div>

  <div class="flex-row-center text-white pt-26">
    <div class="">
      <img class="is-110x110"  :src="getImgURL(account.fileId)"/>
    </div>
    <div class="ml-60 mr-160">
      <div class="account-info" >
        <i class="iconfont ic-wo"></i>
        <span>{{account.name}}</span>
        <span class="ml-20">{{getGender()}}</span>
        <span class="ml-20">{{account.age}}岁</span>
      </div>
      <div class="account-info" >
        <i class="iconfont ic-Id"></i>
        <span>{{account.identityNumber}}</span>
      </div>
    </div>
  </div>
  <div class="header-search position-relative position-center">
    <img class="is-30x30 position-absolute position-search" src="../../assets/image/search.png" @click="getRxs">
    <input type="text" class="no-border" placeholder="请输入搜索内容" v-model="keyword">
  </div>
</div>

<ul v-infinite-scroll="loadMore" class="mt-26" style="overflow: scroll">
  <li class="rxs-box mt-20" v-for="rx in rxs">
      <router-link :to="{path:'/rxs/view',query:{id:rx.id}}">
        <table class="position-relative" >
          <tr>
            <td><img class="is-30x30" src="../../assets/image/rxs/recipe_1.png"></td>
            <td><span class="td-width-55 ellipsis">地址</span></td>
            <td><span class="td-width-250 ellipsis">{{rx.hospital}}</span></td>
            <td class="text-center"><span class="text-13C1FE">{{rx.number}}</span></td>
          </tr>
          <tr>
            <td><img class="is-30x30" src="../../assets/image/rxs/recipe_2.png"></td>
            <td><span class="td-width-55 ellipsis">日期</span></td>
            <td><span class="td-width-250 ellipsis">{{formatDatE(rx.rxDate)}}</span></td>
            <td></td>
          </tr>
          <tr>
            <td><img class="is-30x30" src="../../assets/image/rxs/recipe_3.png"></td>
            <td><span class="td-width-55 ellipsis">症状</span></td>
            <td><span class="td-width-250 ellipsis">{{rx.symptom}}</span></td>
            <td></td>
          </tr>
          <tr>
            <td><img class="is-30x30" src="../../assets/image/rxs/recipe_4.png"></td>
            <td><span class="td-width-55 ellipsis">倒计时</span></td>
            <td><span class="td-width-250 ellipsis">2018-12-19 12:06:00</span></td>
            <td class="text-center">该处方已失效</td>
          </tr>
          <div class="position-absolute position-rb">
            <img class="is-155x155" src="../../assets/image/rxs/rx-true.png" v-if="rx.state==='TO_USE'">
            <img class="is-155x155" src="../../assets/image/rxs/rx-false.png" v-if="rx.state!=='TO_USE'">
          </div>
        </table>
      </router-link>
  </li>
    <div v-show="allLoaded" style="text-align: center" class="baseLine">就这么多啦,回顶部再看看吧</div>
    <div v-show="nullLoaded" style="text-align: center">没有数据</div>
</ul>
    <div class="is-720x100 "></div>
    <new-footer :urlRouter="$route.path"></new-footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        account: {},
        rxs: [],
        keyword: '',
        rxDate: '',
        pageNum: 0,
        pageSize: 15,
        pages: null,
        allLoaded: false,
        nullLoaded: false,
        formatDatE: this.timeConvert,
        headImg: '',
        loading: false
      };
    },
    created() {
      let account = JSON.parse(localStorage.getItem('account'));
      console.log(account);
      if (!account) {
        this.$router.push('/login');
      } else {
        this.account = this.$store.getters.account;
        console.log(this.account);
        // getImage(this.account, this, 'SMALL_LOGO');
      }
      ;
    },
    methods: {
      loadMore() {
        if (this.pages === null || this.pageNum < this.pages) {
          this.pageNum++;
          this.loadData();
        } else {
          this.loading = true;
          this.allLoaded = true;
        }
      },
      loadData() {
        this.$http.get('/rxs?' + 'keyword=' + this.keyword + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize, {
          headers: {
            'Authorization': this.$store.getters.token
          }
        })
          .then(res => {
            this.pages = res.data.pages;
            if (this.pages === 0) {
              this.nullLoaded = true;
              this.loading = true;
              return false;
            }
            this.rxs = this.rxs.concat(res.data.list);
          });
      },
      getRxs() {
        this.rxs = [];
        this.pageList = [];
        this.pageNum = 0;
        this.loadData();
      },
      getGender() {
        switch (this.account.gender) {
          case 'MALE':
            return '男';
          case 'FEMALE':
            return '女';
          default:
            return '';
        }
      }
    },
    filters: {
      time: function (value) {
        return value.slice(0, 10);
      }
    },
    computed: {
      formatDate: function (timer) {
        return this.timeConvert.formatDate(new Date(timer), 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style scoped>
  .flex-stream-sb{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rxs-header{
    width: 720px;
    height: 312px;
    background: #2ac4fb;
  }
  .rx-header-title{
    width: 720px;
    height: 130px;
    line-height: 130px;
    font-size: 35px;
    text-align: center;
    color: white;
  }
  .position-lt{
    left: 0;
    top: 0;
  }
  .fz-40{
    font-size: 40px;
  }

  .header-search{
    width:690px;
    height:60px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    box-shadow:1px 1px 1px rgba(0,0,0,0.27);
  }
  .header-search input{
    width:690px;
    height:60px;
    box-sizing: border-box;
    padding-left: 50px;
  }
  .no-border{
    border: 0;
    outline: 0;
  }
  .rxs-container{
    width: 720px;
    background: #f5f5f5;
  }
  .img-radius{
    border-radius: 50%;
  }
  .-position-30{
    left: -30px;
  }
  .is-30x30{
    width: 30px;
    height: 30px;
  }
  .is-110x110{
    width: 110px;
    height: 110px;
  }
  .is-155x155{
    width: 155px;
    height: 155px;
  }
  .ml-20{
    margin-left: 20px !important;
  }
  .ml-60{
    margin-left: 60px !important;
  }
  .mr-160{
    margin-right: 160px !important;
  }
  .mt-20{
    margin-top: 20px !important;
  }
  .mt-26{
    margin-top: 26px !important;
  }
  .pt-26{
    padding-top: 26px !important;
  }
  .text-center{
    text-align: center;
  }
  .rxs-box{
    width:690px;
    height:273px;
    background: white;
    margin: 0 auto;
    padding-top: 40px;
  }
  table{
    width: 600px;
    margin-left: 50px;
    border-collapse:separate;
    border-spacing:5px;
  }
  .position-center{
    left: 15px;
    bottom: -10px;
  }
  .position-rb{
    right: 10px;
    bottom: 0;
  }
  .td-width-250{
    width: 250px;
  }
  .td-width-55{
    width: 55px;
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 撑屏容器 */
  .is-720x100{
    width: 720px;
    height: 100px;
  }
  .flex-row-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .account-info{
    width: 254px;
  }
  .position-search{
    top: 17px;
    left: 10px;
  }
</style>

