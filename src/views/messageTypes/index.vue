<template>
  <new-layout>
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="message-type--item"
           v-for="(item,index) in list"
           @click="$router.push({name:'/messages',params:{messageType:item.messageType,title:item.name}})"
      >
        <div class="message-type--item__left">
          <img v-lazy="defaultMsgList[index].img"/>
        </div>
        <div class="message-type--item__right">
          <div class="message-type--item__right__first">
            <div class="message-type--item__right__first--name">
              {{item.name}}
            </div>
            <div class="message-type--item__right__first--date">
              {{timeConvert(item.date)}}
            </div>
          </div>
          <div class="message-type--item__right__second">
            {{item.message||'暂无'}}
          </div>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .message-type {
    &--item {
      display: flex;
      align-items: center;
      background-color: white;
      margin-top: 20px;
      padding: 0 20px;
      &__left {
        img {
          width: 100px;
          height: 100px;
        }
      }
      &__right {
        margin-left: 10px;
        flex: 1;
        &__first {
          display: flex;
          justify-content: space-between;
          &--name {
            flex: 1;
            font-size:28px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(51,51,51,1);
          }
          &--date {
            font-size:18px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(102,102,102,1);
          }
        }
        &__second {
          width: 500px;
          font-size:20px;
          font-family:HiraginoSansGB-W3;
          font-weight:normal;
          color:rgba(102,102,102,1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'messageTypes',
    data() {
      return {
        list: [],
        defaultMsgList: [
          { img: require('../../assets/image/message/ACCOUNT_SYSTEM.png') },
          { img: require('../../assets/image/message/ACCOUNT_ORDER.png') },
          { img: require('../../assets/image/message/ACCOUNT_RX.png') }
        ]
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.list = await this.$http.get('/messageTypes');
      }
    }
  };
</script>
