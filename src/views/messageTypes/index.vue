<template>
  <div class="container">
    <new-header title="我的消息">
      <router-link tag="i" to="/accounts" class="iconfont ic-arrow-right" slot="left"></router-link>
    </new-header>

    <div class="news-lists">
      <router-link  v-for="(messageContentType,index) in messageContentList" :key="index" :to="{path:'/messages',query:{messageType:messageContentType.messageType,titles:messageContentType.name}}">
        <div class="news-list">
          <div class="news-list-left">
            <img src="defaultMsgList[index].img"/>
          </div>
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
              list[i].message = this.formateText(list[i].message);
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
    width: 720px;
    background: rgba(255, 255, 255, 1);
    display: block;
    padding-top: 23px;
  }

  .news-list {
    height: 91px;
    margin-bottom: 39px;
    display:flex;
    align-items:center;

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
    margin: auto;
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
    width: 550px;

    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

</style>
