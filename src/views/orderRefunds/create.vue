<template>


  <div class="f_body">


    <mt-header title="申请退款">
      <router-link to="#" slot="left">
        <mt-button icon="back"  @click="$router.go(-1)"></mt-button>
      </router-link>
    </mt-header>

    <ul class="d_uls">
      <div v-for="rx in rxDrugs">
        <li>
          <div class="J_ReturnGoods_ispf">
            <span class="J_ReturnGoods_zi">处方单</span>
            <span class="J_ReturnGoods_tu"><i class="icon iconfont icon-xiala"></i></span>
          </div>
          <router-link tag="div" :to="{path:'/rxs/view',query:{rxId:rx.rxId}}" class="J_ReturnGoods_check">查看处方>
          </router-link>
                </li>
        <li class="d_li">
          <div class="J_ReturnGoods_yao" v-for="drug in rx.drugs">
            <div class="J_ReturnGoods_yao_d1 d_bgwr">
              <img v-lazy="drug.logo" class="J_ReturnGoods_yao_d1_img1">
            </div>
            <div class="J_ReturnGoods_yao_d2">
              <div class="J_ReturnGoods_yao_d2_d1">{{drug.drugName}}</div>
              <div class="J_ReturnGoods_yao_d2_d2">
                <span>{{drug.spec}}</span>

              </div>
              <div class="J_ReturnGoods_yao_d2_d3">
                  ￥{{drug.price}}
                   <span>x{{drug.quantity}}</span>
              </div>
            </div>
          </div>
        </li>

      </div>
      <div>
        <li>
          <div class="J_ReturnGoods_ispf">
            <span class="J_ReturnGoods_zi">非处方单</span>
            <span class="J_ReturnGoods_tu"><i class="icon iconfont icon-xiala"></i></span>
          </div>
           </li>
        <li class="d_li">
          <div class="J_ReturnGoods_yao" v-for="drug in norDrugs">
            <div class="J_ReturnGoods_yao_d1 d_bgwr">
              <img v-lazy="drug.logo" class="J_ReturnGoods_yao_d1_img1">
            </div>
            <div class="J_ReturnGoods_yao_d2">
              <div class="J_ReturnGoods_yao_d2_d1">{{drug.drugName}}</div>
              <div class="J_ReturnGoods_yao_d2_d2">
                <span>{{drug.spec}}</span>
              </div>
              <div class="J_ReturnGoods_yao_d2_d3">
                  ￥{{drug.price}}
                  <span>x{{drug.quantity}}</span>
              </div>
            </div>
          </div>
        </li>

      </div>
    </ul>


    <div class="J_ChoseTheReason">
      <div>退款原因</div>
      <div>
        <span  @click="handleClick()"><i class="icon iconfont ic-youjiantou"></i></span>
      </div>
      <span class="J_plzcs"  @click="handleClick()">{{pleasechoose}}</span>
    </div>

    <div class="J_nosencediv d_amount">
      <span>退款金额:</span> &nbsp;&nbsp;
      <span style="color:red">￥{{price}}</span>
      <p>
        <span>最多</span><span>￥{{price}}</span> <span>含发货邮费</span><span>￥0.00</span>
      </p>
    </div>




    <div class="J_nosencediv">
      <span>退款说明:</span> &nbsp;&nbsp;
      <span class="addreason"><input type="text" placeholder="选填" v-model="explain"></span>
    </div>

    <div class="J_nosencediv" style="margin-bottom:0px;min-height:10.3rem;">
      <span>上传凭证</span> &nbsp;&nbsp;
       <div style="padding-left:2%;margin-bottom:10rem;background:#f6f6f6;"  v-if="flieBtn">
        <div class="J_nosencediv_button">
          <div class="J_nosencediv_button_img">
            <!-- <img src="./cam.png" alt=""> -->
            <img src="static/img/order/cam.png"/>
          </div>
          <div>上传凭证</div>
          <div>最多三张</div>
          <input class="J_uploadsomeevidence" type="file" @change="onUpload" id="file" multiple="Mmultiple" v-if="flieBtn"/>
           </div>
      </div>
    </div>


      <div id="result" name="result" style="height: 50px;width: 100%;"></div>

    <div class="J_SoYouCanSubmit" @click="commit">提交</div>


  <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom" closeOnClickModal="true">
      <div>
          <p>退款原因<i class="icon iconfont ic-guanbi2" @click="popupVisible=!popupVisible"></i></p>
           <div class="d_refund_reason">
              <ul>
                <li>
                    &nbsp;&nbsp;&nbsp;多拍/拍错/不想要
                     <span class="checkbox-group">
                        <input type="radio" name="fu" id="3" v-model="reason" value="多拍/拍错/不想要"/>
                        <label for="3"></label>
                    </span>
               </li>
               <li>
                   &nbsp;&nbsp;&nbsp;缺货
                     <span class="checkbox-group">
                        <input type="radio" name="fu" id="4" v-model="reason" value="缺货"/>
                        <label for="4"></label>
                    </span>
               </li>
              </ul>
           </div>
         <mt-button size="large" type="primary" @click="sure()">确认</mt-button>
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
        this.$http.post(this.URL_PATH + '/orderRefunds', {
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
        };
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
            };
          };
        };
        let formDta = new FormData();
        formDta.append('file', _THIS.onUploadFiles);
        formDta.append('fileType', 'IMAGE_PIC');
        _THIS.$http.post(this.URL_PATH + '/files/image?resolution=LARGE_LOGO', {
          data: formDta
        }).then(res => {
          this.fileId = res.data;
        });
      }
    },
    created() {
      this.accountId = this.$store.getters.account.id;
      this.orderId = this.$route.query.orderId;
      this.$http.get(this.URL_PATH + '/orders/' + this.orderId, {
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
              drug.logo = this.URL_PATH + '/files/' + drug.fileId + '/image?resolution=LARGE_LOGO';
            });
          });
          this.norDrugs.forEach(drug => {
            drug.logo = this.URL_PATH + '/files/' + drug.fileId + '/image?resolution=LARGE_LOGO';
          });
          this.price = this.orderInfo.totalAmount;
        });
    }
};
</script>

<style scoped>
  .J_Pharmacylist_header {
    display: flex;
    justify-content: space-between;
    padding: 0 2%;
    padding-right: 5%;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.4rem;
    background-color: #1AB6FD;
    color: #ffffff;
  }

  .J_Pharmacylist_header .icon {
    font-size: 2rem;
  }

  .J_Pharmacylist_header_hong {
    width: 0.6rem;
    height: 0.6rem;
    background-color: red;
    border-radius: 0.6rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  .J_Pharmacylist_header_search {
    background-color: #12b1f9;
    width: 76%;
    opacity: 0.8;
    height: 2.5rem;
    margin-top: 0.75rem;
    border-radius: 2.5rem;
    position: relative;
  }

  .J_Pharmacylist_header_search div {
    position: absolute;
    left: 5%;
    width: 10%;
    height: 2.5rem;
    top: -0.6rem;
  }

  .J_nosencediv {
    height: 3rem;
    line-height: 3rem;
    padding-left: 2%;
    background: #f5f5f5;
    margin:0rem 0rem 0.7rem 0rem;
  }

  .J_nosencediv .addreason {
    display: inline-block;
    width: 70%;

  }

  .J_nosencediv input {
    display: inline-block;
    height: 3rem;
    line-height: 3rem;
    padding: 0 1%;
    width: 100%;
    background: none;
  }

  .J_ChoseTheReason {
    display: flex;
    justify-content: space-between;
    position: relative;;
    padding: 0 2%;
    height: 3rem;
    line-height: 3rem;
    margin:0.75rem 0rem 0.7rem 0rem;
    font-size: 1rem;
    background: #f6f6f6;
  }

  .J_plzcs {
    position: absolute;
    top: 0;
    height: 3rem;
    line-height: 3rem;
    right: 10%;
  }

  .J_ChoseTheReason div {
    display: inline-block;
    line-height: 3rem;
  }

  .J_ChoseTheReason div span {
    display: inline-block;
    line-height: 3rem;
    height: 3rem;
  }

  .J_ChoseTheReason .icon {
    font-size: 2rem;
  }

  .J_nosencediv_button {
    position: relative;
    border: 1px dashed #ccc;
    width: 20%;
  }

  .J_nosencediv_button div {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    line-height: 1rem;
    color: #ccc;
    height: 1rem;
  }

  .J_nosencediv_button .J_nosencediv_button_img {
    height: 3rem;
    line-height: 3rem;
  }

  .J_nosencediv_button_img img {
    width: 61%;
    height: 76%;
    margin-top: 0.5rem;
  }

  .J_SoYouCanSubmit {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    color: #fff;
    background-color: #13c1fe;
    text-align: center;
    font-size: 1.3rem;
    position: fixed;
    bottom: 0;
  }

  .J_uploadsomeevidence {
    position: absolute;
    height: 5rem;
    width: 100%;
    opacity: 0;
    top: 0;
    left: 0;
  }

  .J_ReturnGoods_ispf {
    display: flex;
    justify-content: space-between;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
    padding: 0 3%;
  }

  .J_ReturnGoods_zi {
    color: #13c1fe;
  }

  .J_ReturnGoods_tu .icon {
    font-size: 1.8rem;
  }

  .J_ReturnGoods_check {
    text-align: right;
    margin-right: 3%;
    color: red;
    height: 2rem;
    line-height: 2rem;
  }

  .J_ReturnGoods_yao {
    display: flex;
    width: 100%;
    background: #F5F5F5;
   }


  .J_ReturnGoods_yao_d1_img1 {
    width: 10rem;
    height: 10rem;
  }

  .J_ReturnGoods_yao_d1_img2 {
    width: 17%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .J_ReturnGoods_yao_d2 div {
    line-height: 1.5rem;

  }

  .J_ReturnGoods_yao_d2_d2 {
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 0.9rem;
  }

  .J_ReturnGoods_yao_d2_d3 {
    color: red;
  }

.J_Pharmacylist_header i{color: #333333;}
.mint-popup-bottom{width: 100%;text-align: center;}
.mint-popup-bottom div{height: 2rem;line-height: 2rem;}
.mint-popup-bottom{height:16rem;}
.d_refund_reason{height: 4rem!important;}
.checkbox-group{float: right;}
.ic-guanbi2{float: right;color: #1AB6FD;padding-right: 1rem;}
.mint-popup-bottom div p{height: 4rem;}
.mint-button--primary{background: #1AB6FD;margin-top: 3rem;}
.mint-popup-bottom div ul li{text-align: left;height: 3rem;}
.mint-button--large{width: 96%;margin: auto;margin-top: 3rem;}
.bgw{background: #12b1f9;color:white;}
.icon-xiaoxi{color: white!important;}
#icon_fanhu{color: white!important;}
.d_amount{height: 5.8rem;}
.d_bgwr{width: 10rem;height: 7rem;border:1px solid #f5f5f5;margin: 0.35rem 1.4rem 0.4rem 3.35rem;background: white;}
.d_uls li.d_li{height: 10.75rem;}
.J_ReturnGoods_yao_d2_d1{margin-top: 2.3rem;}
.J_ReturnGoods_yao_d2_d3{margin-top: 3.1rem;font-size: 1.2rem;}
.J_ReturnGoods_yao_d2_d3 span{float: right;margin-right: 0.35rem;}
.J_ReturnGoods_yao_d2_d2{font-size: 0.9rem;}
.J_ReturnGoods_yao_d2{width: 100%;}
.J_ReturnGoods_yao{height: 10.75rem;}

</style>
