<template>
  <new-layout class="pharmacist">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
        <new-no-data v-if="list.length ===0"></new-no-data>
        <div class="pharmacist__item"
             v-for="(item, key) in list"
             :key="key"
        >
          <div class="pharmacist__item__first">
            <div class="pharmacist__item__first__left">
              <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')">
            </div>
            <div class="pharmacist__item__first__right">
              <div class="pharmacist__item__first__right__first">
                <span class="pharmacist__item__first__right__first__name">{{item.name}}</span>
              </div>
              <div class="pharmacist__item__first__right__second">
               {{item.introduce}}
              </div>
            </div>
          </div>
          <div class="pharmacist__item__third">
            <span class="pharmacist__item__third__button"
            @click="onConsult(item)"
            >进行咨询</span>
          </div>
        </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .pharmacist {
    &__item {
      background-color: white;
      padding: 30px;
      margin-top: 20px;
      width: 720px;
      &__third {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        &__button {
          background-color: $themeColor;
          color: white;
          font-size: 30px;
          font-weight: 200;
          width: 300px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          border-radius: 5PX;
        }
      }
      &__second {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top: 20px;
        &__item {
          border: $themeColor 1PX solid;
          color: $themeColor;
          font-size: 20px;
          padding: 0 20px;
          border-radius: 10PX;
        }
      }
      &__first {
        display: flex;
        &__left {
          img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
          }
        }
        &__right {
          display: flex;
          flex-flow: column;
          justify-content: center;
          margin-left: 50px;
          flex: 1;
          overflow: hidden;
          &__first {
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &__name {
              font-size: 35px;
              font-weight: 500;
            }
            &__tag {
              border: $themeColor 1PX solid;
              color: $themeColor;
              font-size: 20px;
              padding: 0 20px;
              margin-left: 20px;
            }
          }
          &__second {
            margin-top: 30px;
            font-size: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            text-indent: 50px;
            color: #999999;
          }

        }
      }
    }
  }
</style>
<script>
  import { getAccount } from '@/storage';

  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        list: [],
        type: this.$route.query.type,
        account: getAccount()
      };
    },
    created() {
    },
    mounted() {
      this.onLoad();
    },
    methods: {
      async onLoad() {
        let url = this.type === 0 ? '/chats/pharmacists' : '/chats/customerServices';
        this.list = await this.$http.get(url);
      },
      async onConsult(user) {
        let data = {
          accountId: this.account.id,
          userId: user.id,
          type: this.type === 0 ? 'PHARMACIST' : 'CUSTOMER_SERVICE'
        };
        let chat = await this.$http.post(`/chats`, data);
        this.$router.push({ path: '/chats/view', query: { user: JSON.stringify(user), chatId: chat.id } });
      }
    }
  };
</script>
