<template>
  <new-layout>
    <template slot="center">
      <div
        v-for="(item, key) in list"
        :key="key"
        @click="onConsult(item)"
      >
        <new-white-space/>
        <div class="wrapper">
          <div class="left">
            <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')">
          </div>
          <div class="right">
            <div class="line line1">
              <span class="name">
                {{item.name}}
              </span>
              <span class="tag">
                执业药师
              </span>
            </div>
            <div class="line line2">
              <van-rate :value="5" :size="10" readonly/>
              <span class="rate">5</span>
              <span class="count">
                咨询量：99人
              </span>
            </div>
            <div class="line line3">
              {{item.introduce}}
            </div>
          </div>
          <span class="consult">
          咨询
        </span>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    padding: 26px 15px;
    background-color: white;
    position: relative;
    .consult {
      position: absolute;
      right: 15px;
      top: 26px;
      width: 100px;
      height: 30px;
      background-color: #d7000e;
      border-radius: 15px;
      font-size: $size-mini;
      color: #ffffff;
      text-align: center;
      line-height: 30px;
    }
    .left {
      img {
        width: 152px;
        height: 136px;
      }
    }
    .right {
      display: grid;
      grid-row-gap: 10px;
      .line1 {
        .name {
          font-size: $size-large;
        }
        .tag {
          padding: 2px 8px;
          border-radius: 5px;
          border: solid 1px $theme;
          font-size: 20px;
          color: $theme;
        }
      }
      .line2 {
        display: flex;
        align-items: center;
        .rate {
          font-size: 20px;
          color: $theme;
        }
        .count {
          margin-left: 10px;
          font-size: 20px;
          color: $gray;
        }
      }
      .line3 {
        font-size: 20px;
        color: $gray;
      }
    }
  }
</style>
<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        list: [],
        type: this.$route.query.type
      };
    },
    created() {
    },
    mounted() {
      this.onLoad();
    },
    methods: {
      async onLoad() {
        let url = this.type === 'PHARMACIST' ? '/api/chats/pharmacists' : '/api/chats/customerServices';
        this.list = await this.$http.get(url);
      },
      async onConsult(user) {
        let data = {
          accountId: this.account.id,
          userId: user.id,
          type: this.type
        };
        let chat = await this.$http.post(`/api/chats`, data);
        this.loadPageChatsView(user, chat.id);
      }
    }
  };
</script>
