<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="chatDetail">
      <ul>
        <li v-for="items in sessions" :key="items.id">
          <section v-for="item in items.messages">
            <p class="time"><span>{{ item.date }}</span></p>
            <div class="chat-main" :class="{ self: item.self }">
              <p>{{ items.user.name }}</p>
              <img class="avatar" width="30" height="30" :src="item.self ? user.img : items.user.img" />
              <div class="text">{{ item.content }}</div>
            </div>
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import axios from 'axios'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class ChatDetail extends Vue {
    user = {
      name: 'coffce',
      img: require(`~/assets/img/login-bg.jpeg`)
    }
    sessions = [
      {
        id: 1,
        user: {
          name: '左1',
          img: require(`~/assets/img/hospital/img1.png`)
        },
        messages: [
          {
            content: '左2',
            date: '2019-02-24 12:00:00',
            self: false
          },
          {
            content: '左3',
            date: '2019-03-24 12:00:00',
            self: false
          }
        ]
      },
      {
        id: 2,
        user: {
          name: '右1',
          img: require(`~/assets/img/hospital/img1.png`)
        },
        messages: [
          {
            content: '右2',
            date: '2019-04-24 12:00:00',
            self: true
          },
          {
            content: '右3',
            date: '2019-05-24 12:00:00',
            self: true
          }
        ]
      }
    ]

    async getDetail (id) {
      let detail = await axios.get(`/api/supervise/admins/jaGE49wRQciJIDMXFpRtAA`)
      console.log(detail)
    }

    mounted () {
      let id = this.$route.query.id
      this.getDetail(id)
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  .chatDetail {
    width: 80%;
    height: 600px;
    padding: 10px;
    overflow-y: scroll;
    background: #eee;
    li {
      margin-bottom: 15px;
      list-style: none;
      .chat-main{
        /*border: 1px solid #000;*/
        p{
          font-size: 12px;
          line-height: 1;
          color: #666666;
        }
      }
    }
    .time {
      margin: 7px 0;
      text-align: center;
      > span {
        display: inline-block;
        padding: 2px 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }
    .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: 90%;
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;

      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }

    .self {
      text-align: right;
      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }
      .text {
        background-color: #b2e281;
        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
</style>
