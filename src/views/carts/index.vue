<template>
  <div>
    <new-header title="购物车">
      <i class="iconfont ic-arrow-right" slot="left"></i>
      <span slot="right">删除</span>
    </new-header>
    <div class="close">
      <div class="left">
        <input type="checkbox" id="all">
        <label for="all">全选</label>
      </div>
      <div class="right">
        <span>不含运费 合计:</span>
        <span>￥188.00</span>
        <button>
          <span>结算(0)</span>
        </button>
      </div>
    </div>
    <ul class="body">
      <li v-for="(shopInfo,index) in list" :key="index">
        <new-header bgColor="white" height="low" leftSize="small" leftColor="black">
          <div slot="left" class="checkbox-drugInfo">
            <input type="checkbox" id="index" v-model="shopInfo.check">
            <label for="index"></label>
          </div>
          <i class="iconfont ic-yaodian" slot="left"></i>
          <span slot="left">{{shopInfo.shopName}}</span>
        </new-header>

        <ul>
          <li v-for="(drugInfo,index1) in shopInfo.rxs" :key="index1">
            <new-header bgColor="white" height="low" leftSize="small" leftColor="black" v-if="drugInfo.rxId && drugInfo.rxState == 'ENABLED'">
              <div slot="left" class="checkbox-drugInfo">
                <input type="checkbox" id="index1" v-model="drugInfo.check">
                <label for="index1"></label>
              </div>
              <i class="iconfont ic-chufangdanluru" slot="left"></i>
              <span slot="left" class="chufangdan" >处方单</span>
              <span slot="right" class="chakanchufan">查看处方></span>
            </new-header>
            <new-header bgColor="white" height="low" leftSize="small" leftColor="black" v-else>
              <i class="iconfont ic-jisongchufangdan" slot="left"></i>
              <span slot="left" class="chufangdan" >非处方单</span>
            </new-header>
            <new-left-slide :list="drugInfo.drugs">

            </new-left-slide>
          </li>
        </ul>
      </li>
    </ul>
    <new-footer :urlRouter="$route.path"></new-footer>
  </div>
</template>
<script>
  // import {MessageBox, Toast} from 'mint-ui';

  export default {
    name: 'carts',
    data() {
      return {
        list: [{
          'amount': 180,
          'id': '4',
          'medicaidAmount': 0,
          'payAmount': 180,
          'shopName': '老百姓大药房',
          'check': false,
          'rxs': [{
            'drugs': [{
              'cartId': '15',
              'fileId': '1',
              'id': '14',
              'name': '感冒灵',
              'otc': true,
              'price': 3,
              'quantity': 25,
              'spec': '12粒/盒',
              'check': false
            }],
            'rxId': '9',
            'rxState': 'ENABLED',
            'check': false
          }]
        }]
      };
    },
    components: {},
    created() {
      console.log(this.list);
    },
    methods: {
      getData() {
        this.$http.get('/carts').then(res => {
          debugger;
          this.list = res.data.cartShops;
        }).catch(error => {
          this.exception(error);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .body {
    height: calc(100vh - 98px - 130px - 100px);
    overflow: scroll;
  }

  .close {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    height: 98px;
    width: 720px;
    background-color: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 100px;
  }
  .close button {
    height: 98px;
    background: rgba(240, 43, 43, 1);
    width: 193px;
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    outline: none;
    border: 0;
  }

  .close > span:nth-child(1) {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .close > span:nth-child(2) {
    color: rgba(240, 43, 43, 1);
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    margin-right: 10px;
  }

  .chufangdan {
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(19, 193, 254, 1);
  }

  .chakanchufan {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 0, 0, 1);
  }

  .ic-chufang {
    margin-left: 40px;
  }

  .checkbox-drugInfo {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
  }

</style>


