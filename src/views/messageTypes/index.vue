<template>
  <div class="container">
    <new-header title="我的消息">
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>

    <div class="news-lists">
      <router-link v-for="(messageContentType,index) in list" :key="index"
                   :to="{path:'/messages',query:{messageType:messageContentType.messageType,titles:messageContentType.name}}">
        <div class="news-list">
          <div class="news-list-left">
            <img :src="defaultMsgList[index].img"/>
          </div>
          <div class="news-list-right">
            <div class="news-list-right-top">
              <span class="news-list-title">{{messageContentType.name}}</span>
              <span class="news-list-time">{{timeConvert(messageContentType.date)}}</span>
            </div>
            <span class="news-list-content">{{messageContentType.message}}</span>
          </div>
        </div>
      </router-link>
    </div>
    <new-no-data v-if="list.length===0"></new-no-data>
    <div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'messageTypes',
    data() {
      return {
        list: [],
        defaultMsgList: [
          {img: require('../../assets/image/message/ACCOUNT_SYSTEM.png')},
          {img: require('../../assets/image/message/ACCOUNT_ORDER.png')},
          {img: require('../../assets/image/message/ACCOUNT_RX.png')}
        ]
      };
    },
    created: function () {
      this.getList();
    },
    methods: {
      getList() {
        this.$http.get('/messageTypes')
          .then((res) => {
            this.list = res.data;
          });
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
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
    display: flex;
    align-items: center;

  }

  .news-list-left {
    width: 91px;
    height: 91px;
    margin-left: 21px;
  }

  .news-list-left img {
    width: 100%;
  }

  .news-list-right {
    width: 550px;
    height: 91px;
    margin: auto;
  }

  .news-list-right-top {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .news-list-title {
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
  }

  .news-list-time {
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
    margin-right: 21px;
  }

  .news-list-content {
    display: block;
    width: 550px;
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

</style>
