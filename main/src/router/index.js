import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// const pointRouter = [
//   {
//     path: '/points/exchangeRecord',
//     name: '兑换记录',
//     component: () => import('@/views/points/exchangeRecord')
//   },
//   {
//     path: '/points/pointRecord',
//     name: '积分记录',
//     component: () => import('@/views/points/pointRecord')
//   },
//   {
//     path: '/points',
//     alias: '/points/index',
//     name: '积分列表',
//     component: () => import('@/views/points/index')
//   },
//   {
//     path: '/signIn',
//     alias: '/points/signIn',
//     name: '积分兑换',
//     component: () => import('@/views/points/signIn')
//   },
//   {
//     path: '/points/view',
//     name: '积分详情',
//     component: () => import('@/views/points/view')
//   }
// ];
//

const errorRouter = {
  path: '/error',
  name: '/error',
  meta: {
    name: '错误页面'
  },
  component: () => import('@/components/error')
};

const searchRouter = {
  path: '/search',
  name: '/search',
  meta: {
    name: '搜索'
  },
  component: () => import('@/views/search.vue')
};
const chatRouter = [
  {
    path: '/chats/view',
    name: '/chats/view',
    meta: {
      name: '聊天列表'
    },
    component: () => import('@/views/chats/view')
  },
  {
    path: '/chats',
    name: '/chats',
    meta: {
      name: '聊天详情'
    },
    component: () => import('@/views/chats/index')
  }
];

const accountRouter = [
  {
    path: '/accounts/password',
    name: '/accounts/password',
    meta: {
      name: '密码设置'
    },
    component: () => import('@/views/accounts/password')
  }, {
    path: '/accounts/view',
    name: '/accounts/view',
    meta: {
      name: '账户信息详情'
    },
    component: () => import('@/views/accounts/view')
  },
  {
    path: '/accounts/info',
    name: '/accounts/info',
    meta: {
      name: '账户信息'
    },
    component: () => import('@/views/accounts/info')
  },
  {
    path: '/accounts/insurance/account',
    name: '/accounts/insurance/account',
    meta: {
      name: '医保账户信息'
    },
    component: () => import('@/views/accounts/insurance/account')
  },
  {
    path: '/accounts/insurance',
    name: '/accounts/insurance',
    meta: {
      name: '医保卡信息'
    },
    component: () => import('@/views/accounts/insurance/index')
  },
  {
    path: '/accounts/insurance/consume',
    name: '/accounts/insurance/consume',
    meta: {
      name: '消费信息'
    },
    component: () => import('@/views/accounts/insurance/consume')
  },
  {
    path: '/accounts/insurance/consumeinfo',
    name: '/accounts/insurance/consumeinfo',
    meta: {
      name: '消费机构信息'
    },
    component: () => import('@/views/accounts/insurance/consumeInfo')
  },
  {
    path: '/accounts/insurance/consumeinfomore',
    name: '/accounts/insurance/consumeinfomore',
    meta: {
      name: '消费信息详情'
    },
    component: () => import('@/views/accounts/insurance/consumeInfoMore')
  }
];

const rxRouter = [
  {
    path: '/rxs',
    name: '/rxs',
    meta: {
      name: '处方列表'
    },
    component: () => import('@/views/rxs/index.vue')
  },
  {
    path: '/rxs/shops',
    name: '/rxs/shops',
    meta: {
      name: '处方药房列表'
    },
    component: () => import('@/views/rxs/shops/index.vue')
  },
  {
    path: '/rxs/shops/drugs',
    name: '/rxs/shops/drugs',
    meta: {
      name: '选择厂商'
    },
    component: () => import('@/views/rxs/shops/drugs/index.vue')
  },
  {
    path: '/rxs/view',
    name: '/rxs/view',
    meta: {
      name: '处方详情'
    },
    component: () => import('@/views/rxs/view.vue')
  }
];
const hospitalRouter = {
  path: '/hospital/view',
  name: '/hospital/view',
  meta: {
    name: '医院详情'
  },
  component: () => import('@/views//hospital/view')
};

const addressRouter = [
  {
    path: '/addresses/edit',
    name: '/addresses/edit',
    meta: {
      name: '地址修改'
    },
    component: () => import('@/views/addresses/edit.vue')
  },
  {
    path: '/addresses',
    name: '/addresses',
    meta: {
      name: '地址列表'
    },
    component: () => import('@/views/addresses/index.vue')
  },
  {
    path: '/addresses/choose',
    name: '/addresses/choose',
    meta: {
      name: '选择收货地址'
    },
    component: () => import('@/views/addresses/choose.vue')
  },
  {
    path: '/addresses/confirm',
    name: '/addresses/confirm',
    meta: {
      name: '确认收货地址'
    },
    component: () => import('@/views/addresses/confirm.vue')
  }
];

const drugAppraiseRouter = [
  {
    path: '/drugAppraises',
    name: '/drugAppraises',
    meta: {
      name: '药品评价列表'
    },
    component: () => import('@/views/drugAppraises/index.vue')
  },
  {
    path: '/drugAppraises/create',
    name: '/drugAppraises/create',
    meta: {
      name: '药品评价创建'
    },
    component: () => import('@/views/drugAppraises/create.vue')
  },
  {
    path: '/drugAppraises/success',
    name: '/drugAppraises/success',
    meta: {
      name: '药品评价成功'
    },
    component: () => import('@/views/drugAppraises/success.vue')
  }
];

const collectRouter = {
  path: '/collects',
  name: '/collects',
  meta: {
    name: '我的收藏'
  },
  component: () => import('@/views/collects/index.vue')
};

const repositoryRouter = [
  {
    path: '/repositories',
    name: '/repositories',
    meta: {
      name: '知识库列表'
    },
    component: () => import('@/views/repositories/index.vue')
  },
  {
    path: '/repositories/view',
    name: '/repositories/view',
    meta: {
      name: '知识库详情'
    },
    component: () => import('@/views/repositories/view.vue')
  },
  {
    path: '/repositoryTypes',
    name: '/repositoryTypes',
    meta: {
      name: '知识库类型'
    },
    component: () => import('@/views/repositoryTypes/index.vue')
  }
];

const shopDrugSpecRouter = [
  {
    path: '/shopDrugs',
    name: '/shopDrugs',
    meta: {
      name: '商品首页'
    },
    component: () => import('@/views/shopDrugs/index.vue')
  },
  {
    path: '/shopDrugs/view',
    name: '/shopDrugs/view',
    meta: {
      name: '商品详情'
    },
    component: () => import('@/views/shopDrugs/view.vue')
  }
];

const messageRouter = [
  {
    path: '/messageTypes',
    name: '/messageTypes',
    meta: {
      name: '消息类型'
    },
    component: () => import('@/views/messageTypes/index.vue')
  },
  {
    path: '/messages',
    name: '/messages',
    meta: {
      name: '消息列表'
    },
    component: () => import('@/views/messages/index.vue')
  }
];

const orderRouter = [
  {
    path: '/orders/view',
    name: '/orders/view',
    meta: {
      name: '订单详情'
    },
    component: () => import('@/views/orders/view.vue')
  },
  {
    path: '/orders/delivery',
    name: '/orders/delivery',
    meta: {
      name: '配送详情'
    },
    component: () => import('@/views/orders/delivery.vue')
  },
  {
    path: '/orders/create/fromCart',
    name: '/orders/create/fromCart',
    meta: {
      name: '购物车结算'
    },
    component: () => import('@/views/orders/create/fromCart.vue')
  },
  {
    path: '/orders/create/fromShop',
    name: '/orders/create/fromShop',
    meta: {
      name: '订单结算'
    },
    component: () => import('@/views/orders/create/fromShop.vue')
  },
  {
    path: '/orders/addresses',
    name: '/orders/addresses',
    meta: {
      name: '订单地址'
    },
    component: () => import('@/views/orders/addresses/index.vue')
  },
  {
    path: '/orders/pay/success',
    name: '/orders/pay/success',
    meta: {
      name: '支付成功'
    },
    component: () => import('@/views/orders/pay/success.vue')
  },
  {
    path: '/orders',
    name: '/orders',
    meta: {
      name: '全部订单'
    },
    component: () => import('@/views/orders/index.vue')
  }
];

const shopRouter = [
  {
    path: '/shops/view',
    name: '/shops/view',
    meta: {
      name: '药房详情'
    },
    component: () => import('@/views/shops/view.vue')
  },
  {
    path: '/shops/info',
    name: '/shops/info',
    meta: {
      name: '商家介绍'
    },
    component: () => import('@/views/shops/info.vue')
  },
  {
    path: '/shops',
    name: '/shops',
    meta: {
      name: '药房列表'
    },
    component: () => import('@/views/shops/index.vue')
  },
  {
    path: '/shops/drugs',
    name: '/shops/drugs',
    meta: {
      name: '药房药品列表'
    },
    component: () => import('@/views/shops/drugs/index.vue')
  }
];

const drugRouter = [
  {
    path: '/drugs',
    name: '/drugs',
    meta: {
      name: '药品列表'
    },
    component: () => import('@/views/drugs/index.vue')
  },
  {
    path: '/drugs/shops',
    name: '/drugs/shops',
    meta: {
      name: '药品药房'
    },
    component: () => import('@/views/drugs/shops/index.vue')
  }
];

const settingRouter = [
  {
    path: '/setting',
    name: '/setting',
    meta: {
      name: '设置'
    },
    component: () => import('@/views/setting.vue')
  },
  {
    path: '/version',
    name: '/version',
    meta: {
      name: '版本信息'
    },
    component: () => import('@/views/version.vue')
  },
  {
    path: '/about',
    name: '/about',
    meta: {
      name: '关于我们'
    },
    component: () => import('@/views/about.vue')
  }
];

const otherRouter = [
  {
    path: '/feedbacks/create',
    name: '/feedbacks/create',
    meta: {
      name: '意见反馈'
    },
    component: () => import('@/views/feedbacks/create.vue')
  },
  {
    path: '/faqs',
    name: '/faqs',
    meta: {
      name: '常见问题'
    },
    component: () => import('@/views/faqs/index.vue')
  }
];
const appRouter = [
  {
    path: '/',
    name: '/',
    meta: {
      name: '跳转路口'
    },
    component: () => import('@/views/entry')
  },
  {
    path: '/home',
    name: '/home',
    meta: {
      name: '首页'
    },
    component: () => import('@/views/index')
  },
  {
    path: '/accounts',
    name: '/accounts',
    meta: {
      name: '个人中心'
    },
    component: () => import('@/views/accounts/index')
  },
  {
    path: '/carts',
    name: '/carts',
    meta: {
      name: '购物车列表'
    },
    component: () => import('@/views/carts/index.vue')
  },
  {
    path: '/drugTypes',
    name: '/drugTypes',
    meta: {
      name: '药品类型'
    },
    component: () => import('@/views/drugTypes/index.vue')
  },
  {
    path: '/login',
    name: '/login',
    meta: {
      name: '登陆'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/forget',
    name: '/forget',
    meta: {
      name: '忘记密码'
    },
    component: () => import('@/views/forget.vue')
  }
];

const Router = new VueRouter({
  routes: [
    errorRouter,
    collectRouter,
    ...appRouter,
    ...accountRouter,
    ...hospitalRouter,
    ...rxRouter,
    ...addressRouter,
    ...drugAppraiseRouter,
    ...repositoryRouter,
    ...shopDrugSpecRouter,
    ...messageRouter,
    ...orderRouter,
    ...shopRouter,
    ...drugRouter,
    ...settingRouter,
    ...otherRouter,
    ...chatRouter,
    searchRouter
  ]
});
export default Router;
