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
          <img :src="getImgURL(account.fileId,'SMALL_LOGO')"/>
        </div>
        <div class="account-container-text ">
          <div>
              <span>
                <i class="iconfont ic-wo"></i>
              </span>
            <span class="text-l-30">{{account.name || '无'}}</span>
            <span class="text-l-30">{{getGender()|| '未填写'}}</span>
            <span class="text-l-30">{{account.age + '岁'|| '未填写'}}</span>
          </div>
          <div>
              <span>
                <i class="iconfont ic-Id"></i>
              </span>
            <span class="text-l-30">
                {{account.identityNumber|| '未填写'}}
              </span>
          </div>
        </div>
      </div>
      <div class="header-search position-relative position-center">
        <div>
          <input type="text" class="no-border iconfont header-search-input" :placeholder="icon" v-model="keyword" @keyup.enter="getRxs()">
        </div>
      </div>
    </div>

    <ul v-infinite-scroll="loadMore" class="mt-26" ref="body">
      <li class="rxs-box mt-20" v-for="rx in list">
        <router-link :to="{path:'/rxs/view',query:{rxId:rx.id}}">
          <table class="position-relative">
            <tr>
              <td><img class="is-30x30" src="../../assets/image/rxs/recipe_1.png"></td>
              <td><span class="td-width-55 ellipsis text-888888 text-l-25">地址</span></td>
              <td><span class="td-width-250 ellipsis  text-l-25">{{rx.hospital}}</span></td>
              <td class="text-center "><span class="text-13C1FE text-l-30">{{rx.number}}</span></td>
            </tr>
            <tr>
              <td><img class="is-30x30" src="../../assets/image/rxs/recipe_2.png"></td>
              <td><span class="td-width-55 ellipsis text-888888 text-l-25">日期</span></td>
              <td><span class="td-width-250 ellipsis  text-l-25">{{rx.rxDate|timeConvert}}</span></td>
              <td></td>
            </tr>
            <tr>
              <td><img class="is-30x30" src="../../assets/image/rxs/recipe_3.png"></td>
              <td><span class="td-width-55 ellipsis text-888888 text-l-25">症状</span></td>
              <td><span class="td-width-250 ellipsis  text-l-25">{{rx.illness}}</span></td>
              <td></td>
            </tr>
            <tr>
              <td><img class="is-30x30" src="../../assets/image/rxs/recipe_4.png"></td>
              <td><span class="td-width-55 ellipsis text-888888 text-l-25">倒计时</span></td>
              <td>
                  <new-count-down :endTime="rx.rxDate"></new-count-down>
              </td>
            </tr>
            <div class="position-absolute position-rb t-l-60">
              <img class="is-155x155" src="../../assets/image/rxs/rx-true.png" v-if="rx.state ==='ENABLED'">
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
        account: this.$store.getters.account,
        icon: '\ue64c 请输入症状搜索'
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
    display: flex;
    align-items: center;
  }
  .header-search input {
    width: 690px;
    height: 60px;
    padding: 0 30px;
    font-size: 28px;
    position:relative;
    box-shadow: 0 20px 30px rgba(0,0,0,0.3),0 0 40px rgba(0,0,0,0.1) inset;
  }
  /*.header-search input:after{*/
    /*content:"";*/
    /*position:absolute;*/
    /*background:transparent;*/
    /*top:50%;*/
    /*bottom: 1px;*/
    /*left: 10px;*/
    /*right: 10px;*/
    /*z-index: -1;*/
    /*box-shadow: 0 0 30px rgba(0,0,0,0.7);*/
    /*border-radius: 100px/10px;*/
  /*}*/
  .header-search input::placeholder{
    font-size:28px;
    color:rgba(204,204,204,1);
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


  .mt-20 {
    margin-top: 20px !important;
  }

  .mt-26 {
    margin-top: 26px !important;
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
    bottom: -20px;
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

  .text-888888 {
    color: #888888;
  }


  .account-container {
    display: flex;
    align-items: center;
  }

  .account-container .account-container-image img {
    width: 111px;
    height: 111px;
    border-radius: 50%;
    margin-left: 95px;
  }

  .account-container .account-container-text {
    margin-left: 20px;
  }

  .account-container .account-container-text > div {
    display: flex;
    align-items: center;
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(254, 254, 254, 1);
  }

  .ic-wo, .ic-Id {
    font-size: 40px;
  }

  .account-container .account-container-text > div:nth-child(1) > span:nth-child(2) {
    margin-left: 10px;
  }

  .account-container .account-container-text > div:nth-child(1) > span:nth-child(3) {
    margin-left: 30px;
  }

  .account-container .account-container-text > div:nth-child(1) > span:nth-child(4) {
    margin-left: 30px;
  }

  .account-container .account-container-text > div:nth-child(2) > span:nth-child(2) {
    margin-left: 10px;
  }
</style>

