<template>
  <div class="rxs-container">
    <div class="rxs-header position-relative" ref="header">
      <new-header title="处方列表">
        <div slot="left" @click="$router.go(-1)">
          <i class="iconfont ic-arrow-right"></i>
        </div>
      </new-header>
      <div class="account-container">
        <div class="account-container-image">
          <img v-lazy="getImgURL(account.fileId,'SMALL_LOGO')"/>
        </div>
        <div class="account-container-text">
          <div>
              <span>
                <i class="iconfont ic-wo"></i>
              </span>
              <span>{{account.name || '未知姓名'}}</span>
              <span>{{getGender()|| '未知性别'}}</span>
              <span>{{account.age + '岁'|| '未知年龄'}}</span>
          </div>
          <div>
              <span>
                <i class="iconfont ic-Id"></i>
              </span>
              <span>
                {{account.identityNumber|| '未知身份证'}}
              </span>
          </div>
        </div>
      </div>
      <div class="header-search position-relative position-center">
        <img class="is-30x30 position-absolute position-search" src="../../assets/image/search.png" @click="getRxs">
        <input type="text" class="no-border" placeholder="请输入搜索内容" v-model="keyword"  @keyup.enter="getRxs()">
      </div>
    </div>

    <ul v-infinite-scroll="loadMore" class="mt-26" ref="body">
      <li class="rxs-box mt-20" v-for="rx in list">
        <router-link :to="{path:'/rxs/view',query:{rxId:rx.id}}">
          <table class="position-relative">
            <tr>
              <td><img class="is-30x30" src="../../assets/image/rxs/recipe_1.png"></td>
              <td><span class="td-width-55 ellipsis text-small">地址</span></td>
              <td><span class="td-width-250 ellipsis text-black">{{rx.hospital}}</span></td>
              <td class="text-center"><span class="text-13C1FE">{{rx.number}}</span></td>
            </tr>
            <tr>
              <td><img class="is-30x30" src="../../assets/image/rxs/recipe_2.png"></td>
              <td><span class="td-width-55 ellipsis text-small">日期</span></td>
              <td><span class="td-width-250 ellipsis text-black">{{rx.rxDate|timeConvert}}</span></td>
              <td></td>
            </tr>
            <tr>
              <td><img class="is-30x30" src="../../assets/image/rxs/recipe_3.png"></td>
              <td><span class="td-width-55 ellipsis text-small">症状</span></td>
              <td><span class="td-width-250 ellipsis text-black">{{rx.illness}}</span></td>
              <td></td>
            </tr>
            <tr>
              <td><img class="is-30x30" src="../../assets/image/rxs/recipe_4.png"></td>
              <td><span class="td-width-55 ellipsis text-small">倒计时</span></td>
              <td>
                <span class="td-width-250 ellipsis text-333333">
                  <new-count-down :endTime="rx.rxDate"></new-count-down>
                </span>
              </td>
            </tr>
            <div class="position-absolute position-rb">
              <img class="is-155x155" src="../../assets/image/rxs/rx-true.png" v-if="rx.state==='ENABLED'">
              <img class="is-155x155" src="../../assets/image/rxs/rx-false.png" v-else>
            </div>
          </table>
        </router-link>
      </li>
      <new-no-data v-if="list.length===0"></new-no-data>
      <new-loading v-if="process"></new-loading>
      <new-all-data v-if="loading"></new-all-data>
    </ul>
    <new-footer :urlRouter="$route.path" ref="footer"></new-footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        keyword: '',
        pageNum: 0,
        pageSize: 5,
        pages: null,
        loading: false,
        process: false,
        account: this.$store.getters.account
      };
    },
    created() {
    },
    methods: {
      getRxs() {
        this.list = [];
        this.pageNum = 0;
        this.loadData();
      },
      loadMore() {
        this.pageNum++;
        if (!this.pages || this.pageNum < this.pages) {
          this.loadData();
        } else {
          this.loading = true;
        }
      },
      loadData() {
        this.process = true;
        this.$http.get('/rxs?' + 'keyword=' + this.keyword + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            this.list = this.list.concat(res.data.list);
            if (!this.pages) {
              this.pages = res.data.pages;
            }
            this.process = false;
          }).catch(error => {
            this.process = false;
            this.exception(error);
          });
      }
    },
    computed: {},
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight - this.$refs.footer.$el.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    }
  };
</script>

<style scoped>
  .rxs-header {
    width: 720px;
    height: 312px;
    background: rgb(19, 193, 254);
  }

  .header-search {
    width: 690px;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.27);
  }

  .header-search input {
    width: 690px;
    height: 60px;
    box-sizing: border-box;
    padding-left: 50px;
  }

  .no-border {
    border: 0;
    outline: 0;
  }

  .rxs-container {
    width: 720px;
    background: #f5f5f5;
    height: 100vh;
    overflow: auto;
  }

  .is-30x30 {
    width: 30px;
    height: 30px;
  }

  .is-110x110 {
    width: 110px;
    height: 110px;
  }

  .is-155x155 {
    width: 155px;
    height: 155px;
  }

  .ml-20 {
    margin-left: 20px !important;
  }

  .ml-60 {
    margin-left: 60px !important;
  }

  .mr-160 {
    margin-right: 160px !important;
  }

  .mt-20 {
    margin-top: 20px !important;
  }

  .mt-26 {
    margin-top: 26px !important;
  }

  .pt-26 {
    padding-top: 26px !important;
  }

  .text-center {
    text-align: center;
  }

  .rxs-box {
    width: 690px;
    height: 273px;
    background: white;
    margin: 0 auto;
    padding-top: 40px;
  }

  table {
    width: 600px;
    margin-left: 50px;
    border-collapse: separate;
    border-spacing: 5px;
  }

  .position-center {
    left: 15px;
    bottom: -10px;
  }

  .position-rb {
    right: 10px;
    bottom: 0;
  }

  .td-width-250 {
    width: 250px;
  }

  .td-width-55 {
    width: 55px;
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .flex-row-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  /*.account-info {*/
    /*width: 284px;*/
  /*}*/

  .position-search {
    top: 17px;
    left: 10px;
  }

  .text-black{
    color: black;
    width:222px;
    height:24px;
    font-size:25px;
    line-height:36px;
  }
  .text-small{
    color: #888888;
    font-size:16px;
    width:48px;
    height:16px;
    line-height:36px;
  }

  .account-container {
    display: flex;
    align-items: center;
  }
  .account-container .account-container-image img {
    width:111px;
    height:111px;
    border-radius: 50%;
    margin-left: 95px;
  }
  .account-container .account-container-text {
    margin-left: 20px;
  }
  .account-container .account-container-text>div {
    display: flex;
    align-items: center;
    font-size:28px;
    font-family:HiraginoSansGB-W3;
    color:rgba(254,254,254,1);
  }
  .ic-wo, .ic-Id {
    font-size: 40px;
  }

  .account-container .account-container-text>div:nth-child(1)>span:nth-child(2) {
    margin-left: 10px;
  }
  .account-container .account-container-text>div:nth-child(1)>span:nth-child(3) {
    margin-left: 30px;
  }
  .account-container .account-container-text>div:nth-child(1)>span:nth-child(4) {
    margin-left: 30px;
  }

  .account-container .account-container-text>div:nth-child(2)>span:nth-child(2) {
    margin-left: 10px;
  }
</style>

