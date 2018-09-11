<template>
  <div class="account">
    <new-header title="账户信息">
      <div slot="left" @click="$router.push('/accounts')">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>

    <div class="account-container">
      <div class="account-container-item" @click="showActionSheet()">
        <div class="account-container-item-left">
          <div class="text-l-25">头像</div>
        </div>
        <div class="account-container-item-right">
          <div>
            <img :src="getImgURL(account.fileId,'SMALL_LOGO')" id="headImg"/>
          </div>
          <div>
            <i class="iconfont ic-youjiantou"></i>
          </div>
        </div>
      </div>
      <div class="account-container-item" @click="$router.push('/accounts/edit')">
        <div class="account-container-item-left">
          <div class="text-l-25">隐私</div>
        </div>
        <div class="account-container-item-right">
          <div>
            <i class="iconfont ic-youjiantou"></i>
          </div>
        </div>
      </div>
      <div class="account-container-item" @click="$router.push('/accounts/password')">
        <div class="account-container-item-left">
          <div class="text-l-25">修改密码</div>
        </div>
        <div class="account-container-item-right">
          <div>
            <i class="iconfont ic-youjiantou"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['account'])
    },
    created() {
    },
    methods: {
      showActionSheet() {
        let _this = this;
        var a = [{
          title: '拍照'
        }, {
          title: '从手机相册选择'
        }];
        // eslint-disable-next-line
        plus.nativeUI.actionSheet({
          title: '修改用户头像',
          cancel: '取消',
          buttons: a
        }, function (b) {
          switch (b.index) {
            case 0:
              break;
            case 1:
              _this.getImage();
              break;
            case 2:
              _this.galleryImg();
              break;
            default:
              break;
          }
        });
      },
      getImage() {
        var _this = this;
        // eslint-disable-next-line
        var _plus = plus;
        var c = _plus.camera.getCamera();
        c.captureImage(function (e) {
          // eslint-disable-next-line
          _plus.io.resolveLocalFileSystemURL(e, function (entry) {
            _this.uploadHead(entry.toLocalURL());
            /* 上传图片 */
          }, function (e) {
            console.log('读取拍照文件错误：' + e.message);
          });
        }, function (s) {
          console.log('error' + s);
        }, {
          filename: '_doc/head.png'
        });
      },
      galleryImg() {
        var _this = this;
        // eslint-disable-next-line
        var _plus = plus;
        _plus.gallery.pick(function (path) {
          _this.uploadHead(path);
        }, function (e) {
          console.log('取消选择图片');
        }, { filter: 'image', multiple: false });
      },
      uploadHead(imgPath) {
        console.log(imgPath);
        var _this = this;
        var image = new Image();
        image.onload = function () {
          var dataUrl = _this.getBase64Image(image);
          document.getElementById('headImg').src = dataUrl;
          let param = new FormData();
          param.append('fileType', 'LOGO');
          param.append('file', dataUrl);
          _this.$http({
            url: '/files/image',
            type: 'post',
            data: param,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            _this.account.fileId = res.data;
            _this.$http.put('/accounts', _this.account)
              .then(res => {
                _this.$store.commit('SET_ACCOUNT', _this.account);
              })
              .catch(err => {
                _this.exception(err);
              });
          })
            .catch(err => {
              _this.exception(err);
            });
        };
        image.src = imgPath;
        image.style.width = '100px';
        image.style.height = '100px';
      },
      getBase64Image(img) {
        var canvas = document.createElement('canvas');
        var width = img.width;
        var height = img.height;
        // calculate the width and height, constraining the proportions
        if (width > height) {
          if (width > 100) {
            height = Math.round(height *= 100 / width);
            width = 100;
          }
        } else {
          if (height > 100) {
            width = Math.round(width *= 100 / height);
            height = 100;
          }
        }
        canvas.width = width; /* 设置新的图片的宽度 */
        canvas.height = height; /* 设置新的图片的长度 */
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height); /* 绘图 */
        var dataURL = canvas.toDataURL('image/png', 1);
        console.log(dataURL);
        return dataURL;
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">

  .account {
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    .account-container {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      .account-container-item {
        width: 100%;
        height: calc(219px / 3);
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .account-container-item-right {
          display: flex;
          align-items: center;
          img {
            width: 55px;
            border-radius: 50%;
            margin-right: 10px;
            vertical-align: middle;
          }
          .ic-youjiantou {
            font-size: 40px;
          }
        }
      }
    }
    .account-image_upload {
      ul {
        padding-bottom:40px;
        li {
          float:left;width:50px;height:50px;display:none;
        }
      }
    }
  }

</style>
