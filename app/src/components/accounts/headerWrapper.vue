<template>
  <div :style="{ backgroundImage: `url(${backgroundImage})` }" class="wrapper">
    <van-icon
      :info="messageCount"
      name="xiaoxi-1"
      color="white"
      size="0.5166rem"
      class="bell"
      @click="loadPageMessageTypes"
    ></van-icon>
    <div class="name">
      {{ account.name || '' }}
    </div>
    <div class="order-wrapper">
      <order-wrapper />
      <entry-wrapper />
      <van-uploader :after-read="onRead1">
        <img v-lazy="getImgURL(account.fileId)" class="headImg" />
      </van-uploader>
    </div>
  </div>
</template>

<script>
import entryWrapper from '@/components/accounts/entryWrapper';
import orderWrapper from '@/components/accounts/orderWrapper';
export default {
  name: '',
  components: {
    entryWrapper,
    orderWrapper
  },
  mixins: [],
  data() {
    return {
      messageCount: 0,
      backgroundImage: require('@/assets/img/accounts/background.png')
    };
  },
  computed: {},
  watch: {},
  async created() {
    this.messageCount = await this.$http.get('/api/messages/count');
  },
  mounted() {},
  methods: {
    async onRead1(file) {
      let fileId = await this.onRead(file);
      this.account.fileId = fileId;
      await this.$http.put('/api/accounts', this.account);
      this.setAccount(this.account);
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.wrapper {
  width: 720px;
  background-size: cover;
  height: 400px;
  position: relative;
  padding-top: 20px;
  .bell {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .name {
    text-align: center;
    color: white;
    font-size: $size-large;
  }
  .order-wrapper {
    background-color: white;
    height: 240px;
    margin-top: 130px !important;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.33);
    border-radius: 20px;
    padding: 10px;
    .van-uploader {
      position: absolute;
      top: 0;
      left: calc(50% - 149px / 2);
      .headImg {
        width: 149px;
        height: 149px;
        margin-top: 100px;
        background-color: #ffeeed;
        box-shadow: 0px 8px 10px 0px rgba(232, 75, 69, 0.7);
        border: solid 6px #ffffff;
        border-radius: 50%;
        z-index: 999;
      }
    }
  }
}
</style>
