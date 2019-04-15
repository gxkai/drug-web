<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="location" @click="loadPageAddressesChoose">
        <van-icon name="dizhi-" color="white" size=".416rem" />
        <span class="van-ellipsis">{{ locationName }}</span>
        <van-icon name="arrow" color="white" size=".416rem" class="arrow" />
      </div>
      <input
        :placeholder="placeholder"
        type="text"
        class="van-icon"
        readonly="readonly"
        @click="$router.push('/search')"
      />
      <van-icon
        :info="messageCount"
        name="xiaoxi-1"
        color="white"
        size=".616rem"
        @click="$router.push('/messageTypes')"
      ></van-icon>
    </div>
    <hooper :auto-play="true">
      <slide v-for="(banner, index) in banners" :key="index">
        <img v-lazy="banner" />
      </slide>
      <pagination slot="hooper-addons"></pagination>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide, Pagination } from 'hooper';
import 'hooper/dist/hooper.css';
export default {
  name: '',
  components: {
    Hooper,
    Slide,
    Pagination
  },
  mixins: [],
  data() {
    return {
      banners: [
        require('@/assets/img/home/banner4.png'),
        require('@/assets/img/home/banner4.png')
      ],
      placeholder: '\ue643 输入药品名称',
      messageCount: 0
    };
  },
  computed: {
    locationName() {
      return this.currentAddress ? this.currentAddress.name : '';
    }
  },
  watch: {},
  async created() {
    this.getCurrentAddress();
    this.messageCount = await this.$http.get('/api/messages/count');
  },
  mounted() {},
  methods: {
    async getCurrentAddress() {
      if (this.currentAddress === undefined) {
        if (this.isMobile()) {
          this.setCurrentAddress(await this.getCurrentPosition());
        } else {
          this.setCurrentAddress(this.testPosition);
        }
      }
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.header-wrapper {
  .hooper {
    height: 280px;
  }
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .header {
    width: 100%;
    padding: 20px 15px !important;
    position: absolute;
    top: 10px;
    z-index: 100;
    display: grid;
    grid-template-columns: 200px auto auto;
    align-items: center;
    justify-content: space-evenly;
    .location {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black;
      opacity: 0.2;
      border-radius: 12px;
      height: 45px;
      span {
        font-size: $size-small;
        color: white;
      }
      .arrow {
        margin-top: 10px;
      }
    }
    input {
      width: 350px;
      height: 55px;
      border: none;
      -webkit-appearance: none;
      background-color: white;
      border-radius: 30px;
      line-height: 30px;
      padding: 0 10px;
      &::placeholder {
        text-align: left;
        font-size: $size-normal;
        color: $gray-light;
      }
    }
  }
}
</style>
