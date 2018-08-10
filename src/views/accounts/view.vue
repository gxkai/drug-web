<!-- FIXME 字体大小 -->
<template>
  <div class="account-container">
    <new-header title="账户信息">
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>


    <div class="bg-white width-percent-100">
      <div class="a-content-list flex-stream-sb width-percent-96 m-auto" @click="changeVisible">
        <span>头像</span>
        <div class="flex-stream-sb">
          <img class="is-55x55" v-lazy="getImgURL(account.fileId,'SMALL_LOGO')"/>
          <i class="iconfont ic-youjiantou"></i>
        </div>
      </div>
    </div>


    <div class="width-percent-100 bg-white">
      <router-link class="a-content-list flex-stream-sb width-percent-96 m-auto" to='/accounts/edit'>
        <span>隐私</span>
        <i class=" iconfont ic-youjiantou"></i>
      </router-link>
    </div>

    <div class="width-percent-100 bg-white">
      <router-link class="a-content-list flex-stream-sb width-percent-96 m-auto" to='/accounts/password'>
        <span>修改密码</span>
        <i class=" iconfont ic-youjiantou"></i>
      </router-link>
    </div>


    <div id="shangchuanpic" class="div1">
      <ul style="padding-bottom:40px;">
        <li class="imgLi div2" v-for="(item, index) in duploadURLs"
            style="float:left;width:50px;height:50px;display:none;">
          <img v-lazy='item' class="upload_img div3" style="display:none;"/>
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

<style scoped>

  .account-container {
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }

  .a-content-list {
    display: block;

    height: 80px;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 15px;
  }

  .a-content-list span {
    color: #535353;
  }

  .flex-stream-sb {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .padding-10 {

    box-sizing: border-box;
  }

  .is-55x55 {
    width: 55px;
    height: 55px;
  }

  .account-container span {
    color: #333333 !important;
    font-size: 20px;
  }
  .account-container .ic-youjiantou {
    font-size: 20px;
  }
</style>
