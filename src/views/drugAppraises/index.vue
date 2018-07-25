<template>
  <div class="main">
    <new-header title="我的评价">
      <i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
    </new-header>
  </div>
    <!--<div id="bgw">-->
      <!--<mt-header class="J_mheader" title="我的评价">-->
        <!--<router-link to="#" slot="left">-->
          <!--<mt-button icon="back" @click="$router.go(-1)"></mt-button>-->
        <!--</router-link>-->
      <!--</mt-header>-->
      <!--<div style="height:4rem;width:100%;"></div>-->


      <!--<div style="height:100vh;">-->
        <!--<ul class="J_assessul" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"-->
            <!--infinite-scroll-distance="10">-->
          <!--<li v-for="(item,index) in list">-->
            <!--<div class="J_div">-->
              <!--<div class="J_aphoto">-->
                  <!--<img :src="headImg" alt=""">-->
              <!--</div>-->
              <!--<span>{{nickname}}</span>-->
              <!--<div class="littlestar">-->
                <!--<star-rating :rating="item.score" read-only="true" active-color="red" star-size="18" :show-rating="false" ></star-rating>-->
              <!--</div>-->
              <!--<div class="J_timeee">{{formatDate(item.createdDate).slice(0,10)}}</div>-->
            <!--</div>-->
            <!--<div class="J_TheWordYouSay">{{item.content}}</div>-->
            <!--<div class="J_ThePicture">-->
              <!--<img :src="item.imgUrl">-->
              <!--<div class="J_ThePicture_d">-->
                <!--<p style="font-size:1.1rem;">-->
                  <!--药品名称：{{item.name}}-->
                <!--</p>-->
                <!--<p class="elip">-->
                  <!--规格：{{item.spec}}-->
                <!--</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
          <!--<div v-show="allLoaded" style="text-align: center">就这么多啦,回顶部再看看吧</div>-->
          <!--<div v-show="nullLoaded" style="text-align: center">没有数据</div>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
</template>

<script>
  // import timeConvert from 'static/js/timeConvert';
  // import {getImages} from '@/util/images';
  // import StarRating from 'vue-star-rating';

  export default {
    name: 'myAppraise',
    data() {
      return {
        list: [],
        headImg: '',
        nickname: '',
        allLoaded: false,
        nullLoaded: false,
        pageNum: 0,
        pageSize: 15,
        pages: null,
        loading: false,
        account: this.$store.getters.account
      };
    },
    // components: {
    //   'star-rating': StarRating
    // },
    created() {
      // this.account.headImg = this.getImgURL(this.account.fileId,'LARGE_LOGO');
    },
    methods: {
      // loadMore() {
      //   this.loading = false;
      //   if (this.pages === null || this.pageNum <= this.pages) {
      //     this.loadData();
      //   } else {
      //     this.loading = true;
      //     this.allLoaded = true;
      //   }
      // },
      // loadData() {
      //   this.pageNum++;
      //   this.$http.get(this.URL_PATH + '/drugAppraises/mine?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
      //     .then(res => {
      //       getImages(res.data.list, this);
      //       console.log(res.data.list);
      //       this.list = this.list.concat(res.data.list);
      //       this.pages = res.data.pages;
      //       if (this.pages === 0) {
      //         this.nullLoaded = true;
      //         this.loading = true;
      //       }
      //     });
      // }
    }
  };
</script>

<style scoped>
  .main {
    background: rgba(241, 239, 240, 1);
    width: 720px;
    height: 100vh;
  }

  /*.header1 {*/
    /*width: 720px;*/
    /*height: 130px;*/
    /*font-size: 36px;*/
    /*background: rgba(19, 193, 254, 1);*/
    /*font-family: HiraginoSansGB-W3;*/
    /*color: rgba(254, 254, 254, 1);*/
    /*text-align: center;*/
    /*line-height: 120px;*/
  /*}*/


  /*.ic-arrow-right:before {*/
    /*font-size: 50px;*/
    /*position: absolute;*/
    /*left: 0;*/
  /*}*/

  /*.ic-lingdang:before {*/
    /*font-size: 50px;*/
    /*position: absolute;*/
    /*right: 0;*/
  /*}*/
  /*.J_mheader {*/
    /*background-color: #1AB6FD;*/
    /*color: #ffffff;*/
  /*}*/

  /*.J_div {*/
    /*position: relative;*/
    /*height: 9vw;*/
    /*line-height: 9vw;*/
    /*font-size: 1.2rem;*/
    /*padding-left: 15vw;*/
  /*}*/

  /*.J_aphoto {*/
    /*position: absolute;*/
    /*left: 2%;*/
    /*width: 9vw;*/
    /*height: 9vw;*/
  /*}*/

  /*.J_div .J_aphoto img {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*border-radius: 9vw;*/
  /*}*/

  /*.J_assessul {*/
    /*padding: 1rem 0;*/
    /*margin-bottom: 10rem;*/
    /*margin-top:-2rem;*/
    /*background: #eeeeee;*/
  /*}*/

  /*.J_assessul li {*/
    /*margin: 1rem 0;*/
    /*padding: 1rem 2%;*/
    /*background:#ffffff;*/
  /*}*/
  /*.J_TheWordYouSay {*/
    /*font-size: 1.1rem;*/
    /*line-height: 2rem;*/
    /*margin: 1rem 0;*/
  /*}*/
  /*.J_timeee{*/
    /*position: absolute;*/
    /*right: 0;*/
    /*top:0;*/
    /*font-size:1rem;*/
    /*color: #ccc;*/
  /*}*/
  /*.J_Thesummary {*/
    /*color: #999999;*/
  /*}*/

  /*.J_assessul li .J_ThePicture {*/
    /*height: 7rem;*/
    /*line-height: 7rem;*/
    /*padding: 1rem 2%;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*background: #eeeeee;*/
    /*position: relative;*/
  /*}*/

  /*.J_assessul li .J_ThePicture img {*/
    /*height: 5rem;*/
    /*width: 25%;*/
  /*}*/

  /*.J_TheMore {*/
    /*text-align: right;*/
    /*padding-right: 20%;*/
    /*position: relative;*/
  /*}*/

  /*.J_TheMore span {*/
    /*margin-left: 3%;*/
    /*color: #999999;*/
  /*}*/
  /*.J_TheMore .J_adddiv {*/
    /*top: 0;*/
    /*position: absolute;*/
    /*right: 2%;*/
    /*height: 2rem;*/
    /*line-height: 2rem;*/
    /*border: 1px solid #12b1f9;*/
    /*color: #12b1f9;*/
    /*border-radius: 1rem;*/
    /*text-align: center;*/
    /*width: 15%;*/
  /*}*/
  /*#bgw {*/
    /*background: #eeeeee;*/
  /*}*/
  /*.J_ThePicture_d{*/
    /*position: absolute;*/
    /*left: 30%;*/
    /*top: 1rem ;*/
  /*}*/
  /*.J_ThePicture_d p{*/
    /*height:2.5rem;*/
    /*line-height: 2.5rem;*/
  /*}*/
  /*.littlestar{*/
    /*display: inline-block;*/
    /*margin-left: 2%;*/
  /*}*/

</style>
