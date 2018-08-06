<!-- FIXME 字体大小 -->
<template>
  <div class="refund-container">
    <new-header title="申请退款">
      <div slot="left">
      <i class="iconfont ic-arrow-right"  @click="$router.go(-1)"></i>
      </div>
    </new-header>

    <new-refund :order="orderInfo"></new-refund>
    <div class="refund-reason">
      <div>
        <span>退款原因</span>
      </div>
      <div>
        <span>请选择<i class="iconfont ic-youjiantou"></i></span>
      </div>
    </div>
    <div class="refund-price">
      <div>
        <span>退款金额：</span>
        <span>￥{{orderInfo.totalAmount}}</span>
      </div>
    </div>
    <div class="refund-description">
      <div>
        <span>退款说明</span>
      </div>
      <div>
        <textarea placeholder="选填 最多50字" maxlength="50" rows="3" >
        </textarea>
      </div>
    </div>
    <div class="refund-image">
          上传凭证
    </div>

    <div class="upphotos fl heiauto">
      <!--新版上传图片开始-->
      <input type="hidden" id="picIndex" value="0">
      <div id='image-list' class="row image-list">
        <div class="image-item space upscolor" @click="showActionSheet()">
          +
          <div class="image-up"></div>
        </div>
      </div>
    </div>

    <br/>
    <div id="shangchuanpic" class="div1">
      <ul>
        <li  class="imgLi div2" v-for="(item, index) in duploadURLs">
          <img :src='item' class="upload_img"/>
          <span @click="delImg(index)"><span class="file-remove">x</span></span>
        </li>
      </ul>
    </div>
    <div class="div1">
      <ul>
        <li  class="imgLi div2" v-for="(item, index) in copyuploadURLs">
          <img :src='item.url' class="upload_img div3"/>
          <span @click="shanchupic(item.id,index)"><span class="file-remove" v-if="tjshow">+</span></span>
        </li>
      </ul>
    </div>

 </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    name: 'orderRefundsCreate',
    data() {
      return {
        uploadURLs: [],
        duploadURLs: [],
        duploadURLs: [], // 上传的图片数组
        copyuploadURLs: [], // 渲染获取过来的pic
        value: '',
        popupVisible: false,
        flieBtn: true,
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
        orderId: this.$route.query.orderId,
        account: this.$store.getters.account
      };
    },
    methods: {
      shanchupic(imgid, index) {
        let person = JSON.parse(localStorage.getItem('person'));
        let tokens = person.tokens;
        getData('post', 'http://10.9.0.37:18000/app/schoolTableImg/delete', {
          'id': imgid
        })
          .then(res => {
            if (res.data.stateNum == '1') {
              this.copyuploadURLs.splice(index, 1);
            }
          });
      },
      showActionSheet() {
        let _this = this;
        var bts = [{
          title: '拍照'
        }, {
          title: '从相册选择'
        }];// eslint-disable-next-line
        plus.nativeUI.actionSheet({
          cancel: '取消',
          buttons: bts
        },
        function (e) {
          if (e.index === 1) {
            _this.getImage();
          } else if (e.index === 2) {
            _this.galleryImgs();
          }
        }
        );
      },
      getImage() {
        let _this = this;// eslint-disable-next-line
        var cmr = plus.camera.getCamera();
        cmr.captureImage(function (p) { // eslint-disable-next-line
          plus.io.resolveLocalFileSystemURL(p, function (entry) {
            _this.compressImage(entry.toLocalURL(), entry.name);
          }, function (e) { // eslint-disable-next-line
            plus.nativeUI.toast('读取拍照文件错误：' + e.message);
          });
        }, function (e) {
        }, {
          filter: 'image'
        });
      },
      galleryImgs() {
        let _this = this;// eslint-disable-next-line
        plus.gallery.pick(function (e) {
          var name = e.substr(e.lastIndexOf('/') + 1);
          _this.compressImage(e, name);
        }, function (e) {
        }, {
          filter: 'image'
        });
      },
      compressImage(url, filename) {
        let _this = this;
        var name = '_doc/upload/' + filename;// eslint-disable-next-line
        plus.zip.compressImage({
          src: url,
          dst: name,
          quality: 40,
          overwrite: true
        },
        function (zip) {
          // 页面显示图片
          _this.showPics(zip.target, name);
        });
      },
      showPics(url, name) {
        let _this = this;
        // eslint-disable-next-line
        plus.io.resolveLocalFileSystemURL(url, function (entry) {
          entry.file(function (file) { // eslint-disable-next-line
            let fileReader = new plus.io.FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onloadend = function (e) {
              let picUrl = e.target.result.toString();
              alert(1);
              _this.uploadURLs.push(picUrl.split(',')[1]);
              _this.duploadURLs.push(picUrl);
            };
          });
        });
      },
      delImg(index) {
        this.duploadURLs.splice(index, 1);
        this.uploadURLs.splice(index, 1);
      },
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
        }).then(res => {
          this.$router.push({path: '/orderRefunds/view', query: {id: res.data}});
        }).catch(error => {
          this.exception(error);
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
      this.$http.get('/orders/' + this.orderId)
        .then(res => {
          this.orderInfo = res.data;
        }).catch(error => {
          this.exception(error);
        });
    }
  };
</script>

<style scoped>
  .refund-reason {
    width:719px;
    height:60px;
    background:rgba(246,246,246,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  .refund-reason div:nth-child(1) {
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    margin-left: 21px;
  }
  .refund-reason div:nth-child(2) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
  }

  .refund-price {
    width:719px;
    height:60px;
    background:rgba(246,246,246,1);
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .refund-price div:nth-child(1) {
    margin-left: 21px;
  }
  .refund-price div:nth-child(1) span:nth-child(1) {
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }
  .refund-price div:nth-child(1) span:nth-child(2) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,0,0,1);
  }

  .refund-description {
    width:719px;
    height:116px;
    background:rgba(246,246,246,1);
    margin-top: 15px;
    display: flex;
  }

  .refund-description> div:nth-child(1) {
    width: 131px;
    height: 116px;
  }

  .refund-description> div:nth-child(1) span:nth-child(1) {
    margin-left: 20px;
    line-height:45px;
  }

  .refund-description> div:nth-child(2) {
    width: calc(720px - 131px);
    height: 116px;
  }
  .refund-description> div:nth-child(2) textarea {
    width: calc(720px - 131px);
    height: 116px;
    background:rgba(246,246,246,1);
    resize: none;
    outline: none;
    border: 0;
    line-height:45px;
  }
  .upphotos{
    width:100px;
    height:100px;
    line-height: 90px;
    text-align: center;
    font-size: 50px;
    border: 5px solid #f5f5f5;
  }
  .image-item{
    line-height: 70px;
  }
  .upload_img{
    width: 100px;height: 100px;
  }
</style>
