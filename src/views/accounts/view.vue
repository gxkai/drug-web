<!-- FIXME 字体大小 -->
<template>
  <div class="account-container">

    <mt-header title="账户信息">
      <router-link to="/accounts/view" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="a-content-list flex-stream-sb padding-10" @click="changeVisible">
      <span>头像</span>
      <div class="flex-stream-sb">
        <img class="is-55x55" v-lazy="aa"/>
        <i class="iconfont ic-youjiantou"></i>
      </div>
    </div>
    <router-link class="a-content-list flex-stream-sb padding-10" to='/accounts/edit'>
        <span>隐私</span>
        <i class=" iconfont ic-youjiantou"></i>
    </router-link>

    <account-label :label="this.labels[3]"/>
    <router-link to="/accounts/password">
      <account-label :label="this.labels[5]"/>
    </router-link>

    <!--新版手机拍照上传开始-->
    <div id="shangchuanpic" class="div1">
      <ul style="padding-bottom:40px;">
        <li  class="imgLi div2" v-for="(item, index) in duploadURLs" style="float:left;width:50px;height:50px;display:none;">
          <img v-lazy='item' class="upload_img div3" style="display:none;" />
          <span @click="delImg(index)" style="display:none;"><span class="file-remove">+</span></span>
        </li>
      </ul>
    </div>
    <div class="image-item space upscolor fl ml10" style="display:none;" @click="showActionSheet()">
      加号<div class="image-up"></div>
    </div>

    <!--新版手机拍照上传结束-->
    <mt-actionsheet
      :actions="actions"
      v-model="fileVisible"/>
  </div>
</template>

<script>
  import AccountLabel from './child/accountLabel';
let headPic;
  export default {
    data() {
      return {
        photoBase: '',
        aa: '',
        fileId: '',
        copyuploadURLs: [],
        uploadURLs: [],
        duploadURLs: [],
        account: {},
        label: [],
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
      let URL_PATH = process.env.URL_PATH;
      this.aa = URL_PATH + '/files/' + this.$store.getters.account.fileId + '/image?fileType=LOGO';
      this.aa = headPic;
      this.labels = [
        {
          label: '头像',
          name: 'fileId',
          value: this.$store.getters.account.fileId
        },
        {
          label: '真实姓名',
          name: 'name',
          value: this.$store.getters.account.name
        },
        {
          label: '性别',
          name: 'gender',
          value: this.getGender(this.$store.getters.account.gender)
        },
        {
          label: '手机',
          name: 'username',
          value: this.$store.getters.account.username
        },
        {
          label: '身份证号',
          name: 'identityNumber',
          value: this.$store.getters.account.identityNumber
        },
        {
          label: '密码',
          name: 'password',
          value: '修改密码'
        }
      ];
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
              let URL_PATH = process.env.URL_PATH;
              let param = new FormData();
              param.append('fileType', 'LOGO');
              param.append('file', picUrl);
              _this.$http({
                url: URL_PATH + '/files/image',
                method: 'post',
                data: param,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(res => {
                _this.fileId = res.data;
                let URL = process.env.URL_PATH + '/accounts';
                _this.$http.put(URL, {
                  'fileId': _this.fileId,
                  'gender': _this.$store.getters.account.gender,
                  'identityNumber': _this.$store.getters.account.identityNumber,
                  'medicalNumber': _this.$store.getters.account.medicalNumber,
                  'name': _this.$store.getters.account.name
                }, {
                  headers: {
                    'Authorization': _this.$store.getters.token
                  }
                }).then(res => {
                  _this.account.fileId = _this.fileId;
                  _this.$store.commit('SET_ACCOUNT', _this.account);
                  alert(_this.fileId);
                  let URL_PATH = process.env.URL_PATH;
                  _this.$store.getters.account.imgUrl = URL_PATH + '/files/' + _this.account.fileId + '/image?fileType=LOGO';
                  _this.aa = URL_PATH + '/files/' + _this.account.fileId + '/image?fileType=LOGO';
                  localStorage.setItem('nameImg', _this.aa);
                  headPic = _this.aa;
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
      getGender(gender) {
        switch (gender) {
          case 'MALE':
            return '男';
          case 'FEMALE':
            return '女';
          default:
            return '';
        }
      },
      changeVisible() {
        this.fileVisible = true;
      }
    },
    components: {AccountLabel}
  };
</script>

<style scoped>
  .mint-header {
    background: #1AB6FD;
    color: white;
  }
  .account-container{
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }

  .a-content-list{
    display: block;
    width:720px;
    height:80px;
    background:rgba(255,255,255,1);
    margin-bottom: 15px;
  }
  .a-content-list span{
    color: #535353;
  }
  .flex-stream-sb{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .padding-10{
    padding:0 10px;
    box-sizing: border-box;
  }

  .is-55x55{
    width: 55px;
    height: 55px;
  }

</style>
