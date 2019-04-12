import that from '@/main';
const api = {
  // 百度定位
  getPois(params) {
    return that.$http.get(`${process.env.OUTSIDE_ROOT}/baidu/maps?coordType=bd09ll&poi=true`, params);
  },
  getPoisByKeyword(query, point) {
    return that.$http.get(`${process.env.OUTSIDE_ROOT}/baidu/places`, {query: query, lat: point.lat, lng: point.lng});
  }
};
export default api;
