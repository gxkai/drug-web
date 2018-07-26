<template>
  <div>
    <mt-header title="我的消息">
      <router-link to="/accounts" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="f_news_lists" v-for="(messageContentType, index) in messageContentList">
      <router-link
        :to="{path:'/messages',query:{messageType:messageContentType.messageType,titles:messageContentType.name}}">
        <div class="f_news_list">
          <img :src="defaultMsgList[index].img"/>
          <div class="f_news_list_right">
            <div class="f_news_list_right_title">
              <span>{{messageContentType.name}}</span>
              <span class="f_news_list_time">{{formatDate(messageContentType.date)}}</span>
            </div>
            <span>{{messageContentType.message}}</span>
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
        formatDate: this.timeConvert.formatDate,
        messageContentList: [],
        defaultMsgList: [
          {img: 'static/img/message/xitong.png'},
          {img: 'static/img/message/dingdan.png'},
          {img: 'static/img/message/chufang.png'}
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
            console.log(res.data);
            this.messageContentList = this.formatData(res.data);
          });
      },
      formatData: function (list) {
        for (let i in list) {
          list[i].date = this.formatDate(list[i].date);
          list[i].message = this.formatText(list[i].message, 25);
        }
        return list;
      }
    }
  };
</script>

<style scoped>
  .mint-header {
    background: #1AB6FD;
    color: white;
  }
  .mint-button--primary {
    background: #1AB6FD;
    color: #e2e2e2;
  }
  .f_body {
    text-align: left;
  }

  .f_news_list {
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px #e5e5e5 solid;
    box-sizing: border-box;
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    position: relative;
  }
  .f_news_list_time{
    position: absolute;
    right: 1rem;
  }

  .f_news_list > p {
    margin: 0;
    padding: 0;
    display: inline-block;
  }

  .f_news_list > img {
    width: 3rem;
    height: 3rem;
    /*margin: 0.2rem;*/
  }

  .f_news_list_right_title {
    width: 100%;
  }

  .f_news_list_right_title :first-child {

  }

  .f_news_list_right_title :last-child {
    color: #c1c1c1;
  }

  .f_news_list_right :last-child {
    font-size: 1rem;
    color: #c1c1c1;
  }
  #bgw{background: white;}
</style>
