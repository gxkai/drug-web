<!-- FIXME 字体大小 -->
<template>
  <div class="refund-container">
    <new-header title="申请退款">
      <i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
    </new-header>

    <ul class="">
      <div v-for="rx in rxDrugs">
        <li class="is-flex flex-sb refund-title p-lr-20">
          <div>
            <span>处方单</span>
            <span><i class="iconfont icon-xiala"></i></span>
          </div>
          <router-link tag="div" :to="{path:'/rxs/view',query:{rxId:rx.rxId}}" class="J_ReturnGoods_check">查看处方>
          </router-link>
        </li>
        <li>
          <div v-for="drug in rx.drugs">
            <refund-drug class="mb-10" :fileId="drug.logo" :drugName="drug.drugName" :spec="drug.spec"
                         :price="drug.price" :quantity="drug.quantity"></refund-drug>
          </div>
        </li>
      </div>

      <div>
        <div class="is-flex flex-sb refund-title p-lr-20">
          <span>非处方单</span>
          <span><i class="iconfont ic-xiajiantou"></i></span>
        </div>
        <li class="d_li">
          <div v-for="drug in norDrugs">
            <refund-drug class="mb-10" :fileId="drug.logo" :drugName="drug.drugName" :spec="drug.spec"
                         :price="drug.price" :quantity="drug.quantity"></refund-drug>
          </div>
        </li>
      </div>
    </ul>

    <div class="refund-reason is-flex flex-sb p-lr-20">
      <div>退款原因</div>
      <div>
        <span @click="handleClick()">{{pleasechoose}}</span>
        <span @click="handleClick()"><i class="iconfont ic-youjiantou"></i></span>
      </div>
    </div>

    <div class="refund-price mt-10 is-flex flex-column flex-ju p-lr-20">
      <div>
        <span>退款金额:</span>
        <span class="text-red">￥{{price}}</span>
      </div>
      <div class="text-999999">
        <span>最多</span><span>￥{{price}}，</span>
        <span>含发货邮费</span><span>￥0.00</span>
      </div>
    </div>

    <div class="refund-price mt-10 p-lr-20">
      <span>退款说明:</span>
      <span><input type="text" placeholder="选填" v-model="explain"></span>
    </div>

    <div class="refund-phone mt-10 p-lr-20">
      <span>上传凭证</span>
      <div v-if="flieBtn">
        <div class="phone-box">
          <div class="is-flex flex-column flex-ju flex-item">
            <img src="../../assets/image/order/cam.png" class="is-37x32"/>
            <span class="fz-12">上传凭证</span>
            <span class="fz-12">最多三张</span>
          </div>
          <input type="file" @change="onUpload" id="file" multiple="Mmultiple" v-if="flieBtn"/>
        </div>
      </div>
    </div>
    <div id="result" name="result"></div>
    <div class="btn-fixed" @click="commit">提交</div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom" closeOnClickModal="true">
      <div class="shadow-box">
          <span>
            <span class="ml-10"><b>退款原因</b></span>
            <i class="iconfont ic-guanbi2 checkbox-group text-red"
               @click="popupVisible=!popupVisible"></i>
          </span>
        <div class="mt-10">
          <ul>
            <li class="m-lr-10">
              多拍/拍错/不想要
              <span class="checkbox-group">
                      <input type="radio" name="fu" id="3" v-model="reason" value="多拍/拍错/不想要"/>
                      <label for="3"></label>
                  </span>
            </li>
            <li class="m-lr-10">
              缺货
              <span class="checkbox-group">
                      <input type="radio" name="fu" id="4" v-model="reason" value="缺货"/>
                      <label for="4"></label>
                  </span>
            </li>
          </ul>
        </div>
        <mt-button class="btn-fixed" size="large" type="primary" @click="sure()">确认</mt-button>
      </div>
    </mt-popup>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    name: 'orderRefundsCreate',
    data() {
      return {
        msg: '组件',
        value: '',
        popupVisible: false,
        flieBtn: true,
        orderId: '',
        pleasechoose: '请选择',
        rxDrugs: [],
        norDrugs: [],
        onUploadFiles: [],
        orderInfo: {},
        explain: '',
        reason: '请选择',
        price: '',
        reasonList: [
          '买错了',
          '错买了',
          '不想买了'
        ],
        fileId: '',
        accountId: ''
      };
    },
    methods: {
      handleClick: function () {
        this.popupVisible = true;
      },
      sure: function () {
        this.popupVisible = false;
        this.pleasechoose = this.reason;
      },
      commit: function () {
        this.$http.post('/orderRefunds', {
          'explain': this.explain,
          'orderId': this.orderId,
          'price': this.price,
          'reason': this.reason
        }, {
          headers: {
            'Authorization': this.$store.getters.token
          }
        }).then(res => {
          if (res.status === 200) {
            this.$router.push({path: '/orderRefunds/view', query: {id: res.data}});
          }
        });
      },
      delete: function (index) {
        this.onUploadFiles.splice(index, 1);
      },
      onUpload: function (e) {
        let _THIS = this;
        var file = document.getElementById('file').files;
        var result = document.getElementById('result');
        if (file.length > 3) {
          Toast({
            message: '最多只能传3张',
            position: 'middle',
            duration: 3000
          });
          this.flieBtn = false;
        }
        ;
        for (var i = 0; i < file.length; i++) {
          var reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            result.innerHTML = result.innerHTML + '<img style="width:6rem;height:6rem;margin-right:1rem;" src="' + this.result + '" alt="" />';
            _THIS.onUploadFiles.push(this.result);
            if (_THIS.onUploadFiles.length > 2) {
              Toast({
                message: '最多只能传3张',
                position: 'middle',
                duration: 3000
              });
              this.flieBtn = false;
              return false;
            }
            ;
          };
        }
        ;
        let formDta = new FormData();
        formDta.append('file', _THIS.onUploadFiles);
        formDta.append('fileType', 'IMAGE_PIC');
        _THIS.$http.post('/files/image?resolution=LARGE_LOGO', {
          data: formDta
        }).then(res => {
          this.fileId = res.data;
        });
      }
    },
    created() {
      this.accountId = this.$store.getters.account.id;
      this.orderId = this.$route.query.orderId;
      this.$http.get('/orders/' + this.orderId, {
        headers: {
          'Authorization': this.$store.getters.token
        }
      })
        .then(res => {
          this.orderInfo = res.data;
          if (res.data.rxDrugs) {
            this.rxDrugs = res.data.rxDrugs;
          }
          if (res.data.norDrugs) {
            this.norDrugs = res.data.norDrugs;
          }
          this.rxDrugs.forEach(rx => {
            rx.drugs.forEach(drug => {
              drug.logo = '/files/' + drug.fileId + '/image?resolution=LARGE_LOGO';
            });
          });
          this.norDrugs.forEach(drug => {
            drug.logo = '/files/' + drug.fileId + '/image?resolution=LARGE_LOGO';
          });
          this.price = this.orderInfo.totalAmount;
        });
    }
  };
</script>

<style scoped>
  .refund-container {
    margin-bottom: 100px;
  }

  .checkbox-group {
    float: right;
  }

  .is-37x32 {
    width: 37px;
    height: 32px;
  }

  .m-lr-10 {
    margin-left: 10px;
    margin-right: 10px;
  }

  .ml-10 {
    margin-left: 10px !important;
  }

  .mb-10 {
    margin-bottom: 10px !important;
  }

  .mt-10 {
    margin-top: 10px !important;
  }

  .p-lr-20 {
    padding-left: 20px;
    padding-right: 20px;
  }

  .is-flex {
    display: flex !important;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-ju {
    justify-content: center;
  }

  .flex-item {
    align-items: center;
  }

  .flex-sb {
    justify-content: space-between;
  }

  .refund-reason {
    width: 720px;
    height: 60px;
    line-height: 60px;
    background: #f6f6f6;
  }

  .refund-price {
    width: 720px;
    height: 116px;
    background: #f6f6f6;
  }

  .refund-price input {
    outline: 0;
    border: 0;
    background: #f6f6f6;
  }

  .refund-phone {
    width: 720px;
    height: 206px;
    background: #f6f6f6;
  }

  .phone-box {
    width: 147px;
    height: 121px;
    margin-top: 10px !important;
  }

  .fz-12 {
    font-size: 8px !important;
  }

  /* 遮罩层 */
  .shadow-box {
    width: 720px;
    height: 421px;
  }

  .refund-title {
    height: 60px;
    line-height: 60px;
  }

  .btn-fixed {
    width: 720px;
    height: 77px;
    line-height: 77px;
    text-align: center;
    background: rgba(19, 193, 254, 1);
    border-radius: 5px;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 0;
    color: white;
    letter-spacing: 2px;
  }
</style>
