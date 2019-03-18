import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'

export default () => {
  Vue.use(BaiduMap, {
    ak: 'YOUR_APP_KEY'
  })
}
