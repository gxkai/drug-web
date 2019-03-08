/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const positionRouter = [
  {
    path: '/position',
    name: '定位',
    component: () => import('@/views/position/entry.vue')
  }
]

const rxRouter = [
  {
    path: '/',
    name: '页面分发入口',
    component: () => import('@/views/entry.vue')
  },
  {
    path: '/rxs',
    name: '处方列表',
    component: () => import('@/views/rxs/entry.vue')
  },
  {
    path: '/rxs/shops',
    name: '处方药店列表',
    component: () => import('@/views/rxs/shops/entry.vue')
  },
  {
    path: '/rxs/shops/drugs',
    name: '处方药店药品列表',
    component: () => import('@/views/rxs/shops/drugs/entry.vue')
  },
  {
    path: '/rxs/view',
    name: '处方详情',
    component: () => import('@/views/rxs/view.vue')
  }
];

const cartRouter = [
  {
    path: '/carts',
    name: '购物车',
    component: () => import('@/views/carts/entry.vue')
  }
]

const orderRouter = [
  {
    path: '/orders/view',
    name: '订单详情',
    component: () => import('@/views/orders/view.vue')
  },
  {
    path: '/orders/create/fromCart',
    name: '购物车结算',
    component: () => import('@/views/orders/create/fromCart.vue')
  },
  {
    path: '/orders/pay/success',
    name: '支付成功',
    component: () => import('@/views/orders/pay/success.vue')
  },
  {
    path: '/orders',
    name: '全部订单',
    component: () => import('@/views/orders/entry.vue')
  },
  {
    path: '/orders/myorder',
    alias: '/myorder',
    name: '我的订单',
    component: () => import('@/views/orders/myorder.vue')
  }
];

const addressRouter = [
  {
    path: '/addresses/edit',
    name: '地址修改',
    component: () => import('@/views/addresses/edit.vue')
  },
  {
    path: '/addresses',
    name: '地址列表',
    component: () => import('@/views/addresses/entry.vue')
  },
  {
    path: '/addresses/choose',
    name: '选择收货地址',
    component: () => import('@/views/addresses/choose.vue')
  },
  {
    path: '/addresses/confirm',
    name: '确认收货地址',
    component: () => import('@/views/addresses/confirm.vue')
  }
];
const Router = new VueRouter({
  routes: [
    ...rxRouter,
    ...orderRouter,
    ...positionRouter,
    ...cartRouter,
    ...addressRouter
  ]
});
export default Router;
