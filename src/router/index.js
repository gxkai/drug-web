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
  name: '错误页面',
  component: () => import('@/components/error')
};

const searchRouter = {
  path: '/search',
  name: '搜索',
  component: () => import('@/views/search.vue')
};
const chatRouter = [
  {
    path: '/chats/view',
    name: '药师聊天',
    component: () => import('@/views/chats/view')
  },
  {
    path: '/chats',
    name: '药师咨询',
    component: () => import('@/views/chats/index')
  }
];

const accountRouter = [
  {
    path: '/accounts/password',
    name: '密码设置',
    component: () => import('@/views/accounts/password')
  }, {
    path: '/accounts/view',
    name: '账户信息详情',
    component: () => import('@/views/accounts/view')
  },
  {
    path: '/accounts/info',
    name: '账户信息',
    component: () => import('@/views/accounts/info')
  },
  {
    path: '/accounts/insurance/account',
    name: '医保账户信息',
    component: () => import('@/views/accounts/insurance/account')
  },
  {
    path: '/accounts/insurance',
    name: '医保卡信息',
    component: () => import('@/views/accounts/insurance/index')
  },
  {
    path: '/accounts/insurance/consume',
    name: '消费信息',
    component: () => import('@/views/accounts/insurance/consume')
  },
  {
    path: '/accounts/insurance/consumeinfo',
    name: '消费机构信息',
    component: () => import('@/views/accounts/insurance/consumeInfo')
  },
  {
    path: '/accounts/insurance/consumeinfomore',
    name: '消费信息详情',
    component: () => import('@/views/accounts/insurance/consumeInfoMore')
  }
];

const rxRouter = [
  {
    path: '/rxs',
    name: '处方列表',
    component: () => import('@/views/rxs/index.vue')
  },
  {
    path: '/rxs/shops',
    name: '处方药房列表',
    component: () => import('@/views/rxs/shops/index.vue')
  },
  {
    path: '/rxs/shops/drugs',
    name: '选择厂商',
    component: () => import('@/views/rxs/shops/drugs/index.vue')
  },
  {
    path: '/rxs/view',
    name: '处方详情',
    component: () => import('@/views/rxs/view.vue')
  }
];
const hospitalRouter = {
  path: '/hospital/view',
  name: '医院详情',
  component: () => import('@/views//hospital/view')
};

const addressRouter = [
  {
    path: '/addresses/edit',
    name: '地址修改',
    component: () => import('@/views/addresses/edit.vue')
  },
  {
    path: '/addresses',
    name: '地址列表',
    component: () => import('@/views/addresses/index.vue')
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

const drugAppraiseRouter = [
  {
    path: '/drugAppraises',
    name: '药品评价列表',
    component: () => import('@/views/drugAppraises/index.vue')
  },
  {
    path: '/drugAppraises/create',
    name: '药品评价创建',
    component: () => import('@/views/drugAppraises/create.vue')
  },
  {
    path: '/drugAppraises/success',
    name: '药品评价成功',
    component: () => import('@/views/drugAppraises/success.vue')
  }
];

const collectRouter = {
  path: '/collects',
  name: '我的收藏',
  component: () => import('@/views/collects/index.vue')
};

const repositoryRouter = [
  {
    path: '/repositories',
    name: '知识库列表',
    component: () => import('@/views/repositories/index.vue')
  },
  {
    path: '/repositories/view',
    name: '知识库详情',
    component: () => import('@/views/repositories/view.vue')
  },
  {
    path: '/repositoryTypes',
    name: '知识库类型',
    component: () => import('@/views/repositoryTypes/index.vue')
  }
];

const shopDrugSpecRouter = [
  {
    path: '/shopDrugSpecs',
    name: '商品首页',
    component: () => import('@/views/shopDrugSpecs/index.vue')
  },
  {
    path: '/shopDrugSpecs/view',
    name: '商品详情',
    component: () => import('@/views/shopDrugSpecs/view.vue')
  }
];

const messageRouter = [
  {
    path: '/messageTypes',
    name: '消息类型',
    component: () => import('@/views/messageTypes/index.vue')
  },
  {
    path: '/messages',
    name: '消息列表',
    component: () => import('@/views/messages/index.vue')
  }
];

const orderRouter = [
  {
    path: '/orders/view',
    name: '订单详情',
    component: () => import('@/views/orders/view.vue')
  },
  {
    path: '/orders/delivery',
    name: '配送详情',
    component: () => import('@/views/orders/delivery.vue')
  },
  {
    path: '/orders/create/fromCart',
    name: '购物车结算',
    component: () => import('@/views/orders/create/fromCart.vue')
  },
  {
    path: '/orders/create/fromShop',
    name: '订单结算',
    component: () => import('@/views/orders/create/fromShop.vue')
  },
  {
    path: '/orders/addresses',
    name: '订单地址',
    component: () => import('@/views/orders/addresses/index.vue')
  },
  {
    path: '/orders/pay/success',
    name: '支付成功',
    component: () => import('@/views/orders/pay/success.vue')
  },
  {
    path: '/orders',
    name: '全部订单',
    component: () => import('@/views/orders/index.vue')
  }
];

const shopRouter = [
  {
    path: '/shops/view',
    name: '药房详情',
    component: () => import('@/views/shops/view.vue')
  },
  {
    path: '/shops/info',
    name: '商家介绍',
    component: () => import('@/views/shops/info.vue')
  },
  {
    path: '/shops',
    alias: '/shops/index',
    name: '药房列表',
    component: () => import('@/views/shops/index.vue')
  },
  {
    path: '/shops/drugs',
    name: '药房药品列表',
    component: () => import('@/views/shops/drugs/index.vue')
  }
];

const drugRouter = [
  {
    path: '/drugs',
    name: '药品列表',
    component: () => import('@/views/drugs/index.vue')
  },
  {
    path: '/drugs/shops',
    name: '药品药房',
    component: () => import('@/views/drugs/shops/index.vue')
  }
];

const settingRouter = [
  {
    path: '/setting',
    name: '设置',
    component: () => import('@/views/setting.vue')
  },
  {
    path: '/version',
    name: '版本信息',
    component: () => import('@/views/version.vue')
  },
  {
    path: '/about',
    name: '关于我们',
    component: () => import('@/views/about.vue')
  }
];

const otherRouter = [
  {
    path: '/feedbacks/create',
    name: '意见反馈',
    component: () => import('@/views/feedbacks/create.vue')
  },
  {
    path: '/faqs',
    name: '常见问题',
    component: () => import('@/views/faqs/index.vue')
  }
];
const appRouter = [
  {
    path: '/',
    name: '跳转入口',
    component: () => import('@/views/entry')
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/views/index')
  },
  {
    path: '/accounts',
    name: '个人中心',
    component: () => import('@/views/accounts/index')
  },
  {
    path: '/carts',
    name: '购物车列表',
    component: () => import('@/views/carts/index.vue')
  },
  {
    path: '/drugTypes',
    name: '药品类型',
    component: () => import('@/views/drugTypes/index.vue')
  },
  {
    path: '/login',
    name: '登陆',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/forget',
    name: '忘记密码',
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
