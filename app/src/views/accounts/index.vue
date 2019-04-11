<template>
  <div>
    <new-layout>
      <template slot="center">
        <div class="wrapper1">
          <van-icon
            name="xiaoxi-1"
            :info="messageCount"
            color="white"
            size="0.5166rem"
            class="bell"
            @click="loadPageMessageTypes"
          ></van-icon>
          <div class="name">
            {{ account.name || "" }}
          </div>
          <div class="order-wrapper">
            <header>
              <div class="left">
                <span>
                  我的订单
                </span>
              </div>
              <div class="center" @click="loadPageOrders(0)">
                <span>
                  全部订单
                </span>
              </div>
              <div class="right" @click="loadPageOrders(0)">
                <van-icon
                  name="arrow"
                  color="#666666"
                  size="0.4166rem"
                  class="arrow"
                ></van-icon>
              </div>
            </header>
            <div class="wrapper">
              <div class="item item1">
                <new-icon
                  name="daifukuan"
                  color="#9CA2F9"
                  size="0.8166rem"
                  :info="count.toPayCount"
                  @click="loadPageOrders(1)"
                />
                <span>
                  待付款
                </span>
              </div>
              <div class="item item2">
                <new-icon
                  name="peijizhong-"
                  color="#88c79a"
                  size="0.8166rem"
                  :info="count.toDeliveryCount"
                  @click="loadPageOrders(2)"
                />
                <span>
                  调剂中
                </span>
              </div>
              <div class="item item3">
                <new-icon
                  name="daishouhuo-"
                  color="#88C79A"
                  size="0.8166rem"
                  :info="count.toReceivedCount"
                  @click="loadPageOrders(3)"
                />
                <span>
                  待收货
                </span>
              </div>
              <div class="item item4">
                <new-icon
                  name="daipingjia-"
                  color="#7DCAF7"
                  size="0.8166rem"
                  :info="count.toAppraiseCount"
                  @click="loadPageOrders(4)"
                />
                <span>
                  待评价
                </span>
              </div>
            </div>
            <van-uploader :after-read="onRead">
              <img
                class="headImg"
                v-lazy="getImgURL(account.fileId, 'LARGE_LOGO')"
              />
            </van-uploader>
          </div>
        </div>
        <div class="cell-wrapper">
          <info-cell
            v-for="(item, index) in cells"
            :key="index"
            @click.native="$router.push(item.url)"
            :title="item.name"
            :left-icon = "item.icon"
            is-link
          />
        </div>
      </template>
      <template slot="bottom">
        <van-tabbar :value="4" :fixed="false">
          <van-tabbar-item icon="shouye-" to="/home">首页</van-tabbar-item>
          <van-tabbar-item icon="chufang-" to="/rxs">处方单</van-tabbar-item>
          <van-tabbar-item icon="fenlei-" to="/drugTypes">分类</van-tabbar-item>
          <van-tabbar-item icon="gouwuche-" to="/carts"
            >购物车
          </van-tabbar-item>
          <van-tabbar-item icon="wo-" to="/accounts">我</van-tabbar-item>
        </van-tabbar>
      </template>
    </new-layout>
  </div>
</template>
<style type="text/scss" lang="scss">
.cell-wrapper {
  margin-top: 50px;
  .name {
    font-size: $size-small;
    color: $gray-light;
    margin-left: 10px;
  }
}
.wrapper1 {
  width: 720px;
  background: url("../../assets/img/accounts/个人中心背景.png");
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
    header {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      .left {
        span {
          font-size: $size-small;
        }
      }
      .center {
        justify-self: right;
        span {
          color: $gray;
          font-size: $size-small;
        }
      }
      .right {
        margin-top: 5px;
      }
    }
    .wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      height: 100%;
      align-items: center;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          margin-top: 20px;
          font-size: $size-small;
          color: $gray-light;
        }
      }
    }
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

<script>
import { setAccount } from '@/storage';
import infoCell from '@/components/accounts/infoCell';
export default {
  components: {
    infoCell
  },
  data() {
    return {
      count: {
        toPayCount: 0,
        toDeliveryCount: 0,
        toReceivedCount: 0,
        toAppraiseCount: 0
      },
      messageCount: 0,
      cells: [
        {
          icon: 'wo-',
          name: '我的医保',
          url: '/accounts/info'
        },
        {
          icon: 'qian-',
          name: '医保账单',
          url: '/insurances/consume'
        },
        {
          icon: 'dingwei-',
          name: '我的地址',
          url: '/addresses'
        },
        {
          icon: 'shoucang-',
          name: '我的收藏',
          url: '/collects'
        },
        {
          icon: 'dingdan-',
          name: '我的退单',
          url: '/orderRefunds'
        },
        {
          icon: 'changjianwenti-',
          name: '常见问题',
          url: '/faqs'
        },
        {
          icon: 'yijianfankui-',
          name: '意见反馈',
          url: '/feedbacks'
        }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initData();
    });
  },
  created() {},
  mounted() {},
  methods: {
    async initData() {
      this.count = await this.$http.get('/api/orders/count');
      this.messageCount = await this.$http.get('/api/messages/count');
    },
    async onRead(file) {
      let self = this;
      let reader = new FileReader();
      // 将图片转成base64格式
      reader.readAsDataURL(file.file);
      // 读取成功后的回调
      reader.onloadend = function () {
        let result = this.result;
        let img = new Image();
        img.src = result;
        console.log('********未压缩前的图片大小********');
        console.log(result.length);
        img.onload = async function () {
          let data = self.compress(img);
          console.log('*******压缩后的图片大小*******');
          console.log(data.length);
          let blob = new File([self.dataURItoBlob(data)], file.file.name);
          console.log('*******base64转blob对象******');
          console.log(file.file);
          console.log(blob);
          let param = new FormData();
          param.append('fileType', 'LOGO');
          param.append('file', blob);
          let config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };
          let fileId = await self.$http.post('/api/files', param, config);
          console.log('*******图片上传成功******');
          console.log(fileId);
          self.account.fileId = fileId;
          await self.$http.put('/api/accounts', self.account);
          setAccount(self.account);
        };
      };
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      // 进行最小压缩
      let data = canvas.toDataURL('image/jpeg', 0.02);
      return data;
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      var bytes = window.atob(base64Data.split(',')[1]);
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/png' });
    }
  }
};
</script>
