import {getAccount, getCurrentAddress, getToken, setAccount, setCurrentAddress} from '../storage';
import moment from 'moment/moment';
import BMap from 'BMap';
export default {
  data() {
    return {
      account: getAccount(),
      currentAddress: getCurrentAddress(),
      token: getToken(),
      testPosition: {
        name: '测试地址',
        lat: 31,
        lng: 120
      }
    };
  },
  created() {
  },
  methods: {
    setAccount,
    setCurrentAddress,
    dateFmt(input, fmt) {
      return moment(input).format(fmt);
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
    },
    async onRead(file) {
      return new Promise((resolve, reject) => {
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
            resolve(fileId);
          };
        };
      });
    },
    getCurrentPoint() {
      return new Promise((resolve, reject) => {
        new BMap.Geolocation().getCurrentPosition(async r => {
          resolve(r.point);
        });
      });
    },
    async getCurrentPosition(point) {
      if (point === undefined) {
        point = await this.getCurrentPoint();
      }
      const data = await this.$api.getPois(point);
      const position = {
        name: data.pois[0].name,
        lat: data.pois[0].location.lat,
        lng: data.pois[0].location.lng
      };
      return position;
    },
    async getNearbyPosition(point) {
      if (point === undefined) {
        point = await this.getCurrentPoint();
      }
      const data = await this.$api.getPois(point);
      return data.pois;
    },
    async getKeyPosition(query, point) {
      if (point === undefined) {
        point = await this.getCurrentPoint();
      }
      let data = await this.$api.getPoisByKeyword(query, point);
      return data.result;
    }
  }
};
