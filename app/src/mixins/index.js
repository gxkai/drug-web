import {
  getAccount,
  getCurrentAddress,
  getToken,
  setAccount,
  setCurrentAddress,
  getUsername,
  setUsername,
  setToken
} from '../storage';
import moment from 'moment/moment';
import Load from '@/mixins/load';
import BMap from 'BMap';
export default {
  mixins: [Load],
  data() {
    return {
      testPosition: {
        name: '测试地址',
        lat: 31,
        lng: 120
      }
    };
  },
  created() {},
  computed: {
    currentAddress() {
      return getCurrentAddress();
    },
    account() {
      return getAccount();
    },
    token() {
      return getToken();
    }
  },
  methods: {
    getUsername,
    setUsername,
    setAccount,
    setToken,
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
    /**
     * 获取文件ID
     * @param file
     * @returns {Promise<any>}
     */
    async onRead(file) {
      return new Promise(resolve => {
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
    /**
     * 当前经纬度
     * @returns {Promise<any>}
     */
    getCurrentPoint() {
      return new Promise(resolve => {
        new BMap.Geolocation().getCurrentPosition(async r => {
          resolve(r.point);
        });
      });
    },
    /**
     * 当前定位信息
     * @param point
     * @returns {Promise<{name: *, lat: *, lng: *}>}
     */
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
    /**
     * 附近定位信息
     * @param point
     * @returns {Promise<*>}
     */
    async getNearbyPosition(point) {
      if (point === undefined) {
        point = await this.getCurrentPoint();
      }
      const data = await this.$api.getPois(point);
      return data.pois;
    },
    /**
     * 关键字定位信息
     * @param query
     * @param point
     * @returns {Promise<*>}
     */
    async getKeyPosition(query, point) {
      if (point === undefined) {
        point = await this.getCurrentPoint();
      }
      let data = await this.$api.getPoisByKeyword(query, point);
      return data.result;
    },
    /**
     * 百度导航链接
     * @param name
     * @param address
     * @param lat
     * @param lng
     * @returns {string}
     */
    jumpToBaidu(name, address, lat, lng) {
      return `https://api.map.baidu.com/marker?location=${lat},${lng}&title=${name}&content=${address}&output=html&src=webapp.baidu.openAPIdemo  `;
    },
    /**
     * 检验是否是移动设备
     * @returns {boolean}
     */
    isMobile() {
      var system = {
        win: false,
        mac: false,
        xll: false,
        ipad: false
      };
      var p = navigator.platform;
      system.win = p.indexOf('Win') === 0;
      system.mac = p.indexOf('Mac') === 0;
      system.x11 = p === 'X11' || p.indexOf('Linux') === 0;
      system.ipad = navigator.userAgent.match(/iPad/i) != null;
      if (system.win || system.mac || system.xll || system.ipad) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * 图片请求地址
     * @param fileId
     * @param resolution
     * @returns {string}
     */
    getImgURL(fileId, resolution) {
      let url = resolution === undefined ? `${
        process.env.API_ROOT
      }/api/files/${fileId}/image` : `${
        process.env.API_ROOT
      }/api/files/${fileId}/image?resolution=${resolution}`;
      return url;
    },
    /**
     * 是否处方
     * @param str
     * @returns {boolean}
     */
    isRx(str) {
      if (str === '0' || str === null || str === 'undefined') {
        return false;
      } else {
        return true;
      }
    },
    getUrlKey(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
  }
};
