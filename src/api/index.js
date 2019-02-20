import http from '@/http';
const api = {
  // 百度定位
  getPois(params) {
    return http.get(`${process.env.OUTSIDE_ROOT}/baidu/maps?coordType=bd09ll&poi=true`, params);
  }
};
export default api;
