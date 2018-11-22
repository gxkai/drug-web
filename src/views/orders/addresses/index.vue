<template>
  <div class="main">
    <!--<new-header title="选择收货地址">-->
      <!--<router-link tag="span" to="/addresses" slot="right" class="text-l-25">管理</router-link>-->
    <!--</new-header>-->
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="管理"
      @click-right="$router.push('/addresses')"
      ref="header"
    />
    <div class="body1">
      <div class="content1" v-for="(address,index) in list" :key="index" @click.stop="onAddress(address)">
        <div class="line1">
          <div>
            <new-radio v-if="address.defaulted" disabled class="mr-l-10"></new-radio>
          </div>
          <div>
            <span class="text-l-25">{{address.consignee}}</span>
            <span class="text-l-25">{{address.phone}}</span>
          </div>
        </div>
        <div class="line2">
          <div></div>
          <div>
            <span v-if="address.defaulted" class="default-address">[默认地址]</span>
            <span class="text-l-22">{{address.address}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    name: 'addresses',
    data() {
      return {
        list: [],
        account: this.$store.getters.account
      };
    },
    created() {
      this.initData();
    },
    computed: {
      ...mapGetters(['receiveAddress'])
    },
    methods: {
      async initData() {
        this.list = await this.$http.get('/addresses');
      },
      onAddress(address) {
        this.setReceiveAddress(address);
        this.$router.go(-1);
      },
      ...mapMutations({
        setReceiveAddress: 'SET_RECEIVE_ADDRESS'
      })
    }
  };
</script>

<style scoped>
  .main {
    background-color: rgba(241, 239, 240, 1);
    width: 720px;
    height: 100vh;
  }
  .content1 {
    background-color: white;
    padding: 10px;
    margin-top: 10px;
  }
  .content1 .line1,.content1 .line2 {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    font-size:22px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }
  .content1 .line1>div:nth-child(1) {
    width: 40px;
    display: flex;
    justify-content: flex-end;
  }
  .content1 .line1>div:nth-child(2) {
    width: 680px;
    display: flex;
    justify-content: space-between;
  }
  .content1 .line2>div:nth-child(1) {
    width: 40px;
  }
  .content1 .line2>div:nth-child(2) {
    width: 680px;
  }
  .content1 .line2 .default-address {
    font-size:22px;
    font-family:HiraginoSansGB-W3;
    color:rgba(19,193,254,1);
  }
</style>
