<template>
  <div>
    <new-layout>
      <template slot="center">
        <header-wrapper/>
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
        <footer-entry :value="4"/>
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
</style>

<script>
import { setAccount } from '@/storage';
import infoCell from '@/components/accounts/infoCell';
import footerEntry from '@/components/footerEntry';
import headerWrapper from '@/components/accounts/headerWrapper';
export default {
  components: {
    infoCell,
    footerEntry,
    headerWrapper
  },
  data() {
    return {
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
