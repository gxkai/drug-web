<template>
  <div class="container">
    <new-header title="我的消息">
      <router-link tag="i" to="/accounts" class="iconfont ic-arrow-right" slot="left"></router-link>
    </new-header>

    <div class="news-lists" v-for="(messageContentType,index) in messageContentList">
      <router-link :key="index"
                   :to="{path:'/messages',query:{messageType:messageContentType.messageType,titles:messageContentType.name}}">
        <div class="news-list">

          <div class="news-list-left">
            <img src="defaultMsgList[index].img"/>
          </div>

          <!--<div class="news-list-right">-->
          <!--<div class="news-list-right-title">-->
          <!--<span>{{messageContentType.name}}</span>-->
          <!--<span class="news-list-time">{{formatDate(messageContentType.date)}}</span>-->
          <!--</div>-->
          <!--<div class="news-list-content">{{messageContentType.message}}</div>-->
          <!--</div>-->
          <div class="news-list-right">
            <div class="news-list-right-top">
              <span class="news-list-title">{{messageContentType.name}}</span>
              <span class="news-list-time">{{formatDate(messageContentType.date)}}</span>
            </div>

            <span class="news-list-content">{{messageContentType.message}}</span>
          </div>

        </div>
      </router-link>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'messageTypes',
    data() {
      return {
        formatDate: this.timeConvert,
        messageContentList: [],
        defaultMsgList: [
          {img: '/image/message/xitong.png'},
          {img: '/image/message/dingdan.png'},
          {img: '/image/message/chufang.png'}
        ],
        accountId: this.$store.getters.account.id
      };
    },
    created: function () {
      this.getList();
    },
    methods: {
      getList() {
        this.$http.get('/messageTypes?', {
          headers: {
            'Authorization': this.$store.getters.token
          }
        })
          .then((res) => {
            const list = res.data;
            for (let i in list) {
              list[i].date = this.formatDate(list[i].date);
              list[i].message = this.formateText(list[i].message, 25);
            }
            console.log(list);
            this.messageContentList = list;
          });
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box
  }

  .container {
    width: 720px;
    height: 100vh;
  }

  .news-lists {
    width: 678px;
    background: rgba(255, 255, 255, 1);
    margin: auto;
  }

  .news-list {
    height: 91px;
    margin-bottom: 39px;
    flex-direction:row;
    margin: auto;
  }
  .news-list-left {
    width: 91px;
    height: 91px;
    margin-left: 21px;
  }
  .news-list-right {
    width: 550px;
    height: 91px;
    margin-left: 125px;
  }

.news-list-right-top{
  display: flex;
  justify-content: space-between;
  flex-direction:row;
}
  .news-list-title {
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);

  }

  .news-list-time {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    margin-right: 21px;
  }

  .news-list-content {
    display: block;
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

  }

  /*.mint-header {*/
  /*background: #1AB6FD;*/
  /*color: white;*/
  /*}*/

  /*.mint-button--primary {*/
  /*background: #1AB6FD;*/
  /*color: #e2e2e2;*/
  /*}*/

  /*.f_body {*/
  /*text-align: left;*/
  /*}*/

  /*.f_news_list {*/
  /*width: 100%;*/
  /*display: flex;*/
  /*flex-direction: row;*/
  /*border-bottom: 1px #e5e5e5 solid;*/
  /*box-sizing: border-box;*/
  /*padding: 1rem 0.5rem 0.5rem 0.5rem;*/
  /*position: relative;*/
  /*}*/

  /*.f_news_list_time {*/
  /*position: absolute;*/
  /*right: 1rem;*/
  /*}*/

  /*.f_news_list > p {*/
  /*margin: 0;*/
  /*padding: 0;*/
  /*display: inline-block;*/
  /*}*/

  /*.f_news_list > img {*/
  /*width: 3rem;*/
  /*height: 3rem;*/
  /*!*margin: 0.2rem;*!*/
  /*}*/

  /*.f_news_list_right_title {*/
  /*width: 100%;*/
  /*}*/

  /*.f_news_list_right_title :first-child {*/

  /*}*/

  /*.f_news_list_right_title :last-child {*/
  /*color: #c1c1c1;*/
  /*}*/

  /*.f_news_list_right :last-child {*/
  /*font-size: 1rem;*/
  /*color: #c1c1c1;*/
  /*}*/

  /*#bgw {*/
  /*background: white;*/
  /*}*/
</style>
