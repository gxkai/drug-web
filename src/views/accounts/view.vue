<template>
  <div class="account">
    <new-header title="账户信息">
      <div slot="left" @click="$router.push('/accounts')">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>

    <div class="account-container">
      <div class="account-container-item" @click="changeVisible()">
        <div class="account-container-item-left">
          <div class="text-l-25">头像</div>
        </div>
        <div class="account-container-item-right">
          <div>
            <img :src="getImgURL(account.fileId,'SMALL_LOGO')"/>
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

    <div id="shangchuanpic" class="account-image_upload">
      <ul>
        <li class="imgLi div2" v-for="(item, index) in duploadURLs">
          <img :src='item' class="upload_img div3" style="display:none;"/>
          <span @click="delImg(index)" style="display:none;"><span class="file-remove">+</span></span>
        </li>
      </ul>
    </div>
    <div class="image-item space upscolor fl ml10" style="display:none;" @click="showActionSheet()">
      加号
      <div class="image-up"></div>
    </div>


    <mt-actionsheet :actions="actions" v-model="fileVisible"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        account: this.$store.getters.account,
        photoBase: '',
        copyuploadURLs: [],
        uploadURLs: [],
        duploadURLs: [],
        fileVisible: false,
        actions: [
          {
            name: '拍照',
            method: this.getImagee
          },
          {
            name: '从相册中选择',
            method: this.galleryImgs
          }
        ]
      };
    },
    created() {
    },
    methods: {
      delImg(index) {
        this.duploadURLs.splice(index, 1);
        this.uploadURLs.splice(index, 1);
      },
      showActionSheet() {
        let _this = this;
        var bts = [{
          title: '拍照'
        }, {
          title: '从相册选择'
        }];
        let __PLUS = plus;// eslint-disable-line no-undef
        __PLUS.nativeUI.actionSheet({
          cancel: '取消',
          buttons: bts
        },
        function (e) {
          if (e.index === 1) {
            _this.getImagee();
          } else if (e.index === 2) {
            _this.galleryImgs();
          }
        }
        );
      },
      showPics(url, name) {
        let _this = this;
        let __PLUS = plus;// eslint-disable-line no-undef
        __PLUS.io.resolveLocalFileSystemURL(url, function (entry) {
          entry.file(function (file) {
            let fileReader = new __PLUS.io.FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onloadend = function (e) {
              let picUrl = e.target.result.toString();
              _this.uploadURLs.push(picUrl.split(',')[1]);
              _this.duploadURLs.push(picUrl);
              let param = new FormData();
              param.append('fileType', 'LOGO');
              param.append('file', picUrl);
              _this.$http({
                url: '/files/image',
                method: 'post',
                data: param,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(res => {
                this.account.fileId = res.data;
                let URL = '/accounts';
                _this.$http.put(URL, this.account).then(res => {
                  this.$store.commit('SET_ACCOUNT', this.account);
                }).catch(error => {
                  this.exception(error);
                });
              });
            };
          });
        });
      },
      compressImage(url, filename) {
        let _this = this;
        var name = '_doc/upload/' + filename;
        let __PLUS = plus;// eslint-disable-line no-undef
        __PLUS.zip.compressImage({
          src: url,
          dst: name,
          quality: 40, // quality: (Number 类型 )压缩图片的质量.取值范围为1-100
          overwrite: true// overwrite: (Boolean 类型 )覆盖生成新文件
        },
        function (zip) {
          // 页面显示图片
          _this.showPics(zip.target, name);
        });
      },
      getImagee() {
        let __PLUS = plus;// eslint-disable-line no-undef
        let _this = this;
        var cmr = __PLUS.camera.getCamera();
        cmr.captureImage(function (p) {
          __PLUS.io.resolveLocalFileSystemURL(p, function (entry) {
            _this.compressImage(entry.toLocalURL(), entry.name);
          }, function (e) {
            __PLUS.nativeUI.toast('读取拍照文件错误：' + e.message);
          });
        }, function (e) {
        }, {
          filter: 'image'
        });
      },
      galleryImgs() {
        let _this = this;
        let __PLUS = plus;// eslint-disable-line no-undef
        __PLUS.gallery.pick(function (e) {
          var name = e.substr(e.lastIndexOf('/') + 1);
          _this.compressImage(e, name);
        }, function (e) {
        }, {
          filter: 'image'
        });
      },
      changeVisible() {
        this.fileVisible = true;
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
