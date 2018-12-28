import http from '@/http';
const api = {
  getPois(params) {
    return http.get(`${process.env.OUTSIDE_ROOT}/baidu/maps.json?coordType=bd09ll&poi=true`, params);
  }
};
export default api;
