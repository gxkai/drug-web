import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * navigation：是否用vux缓存页面数据，showBackTopLeft：头部返回按钮， showBackBottomRight：底部返回按钮
 * @type {{path: string, name: string, meta: {navigation: boolean, name: string, showBackTopLeft: boolean, showBackBottomRight: boolean}, component: (function(): (Promise<*>|*))}}
 */
const errorRouter = {
  path: '/error',
  name: '/error',
  meta: {
    navigation: true,
    name: '错误页面',
    showBackTopLeft: false,
    showBackBottomRight: true
  },
  component: () => import('@/views/error')
};

const searchRouter = [
  {
    path: '/search',
    name: '/search',
    meta: {
      navigation: false,
      name: '搜索',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/search.vue')
  }
];
const chatRouter = [
  {
    path: '/chats/view',
    name: '/chats/view',
    meta: {
      navigation: true,
      name: '聊天列表',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/chats/view')
  },
  {
    path: '/chats',
    name: '/chats',
    meta: {
      navigation: true,
      name: '聊天详情',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/chats/index')
  }
];

const accountRouter = [
  {
    path: '/accounts/info',
    name: '/accounts/info',
    meta: {
      navigation: true,
      name: '账户信息',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/accounts/info')
  }
];

const insuranceRouter = [
  {
    path: '/insurances/consume',
    name: '/insurances/consume',
    meta: {
      navigation: true,
      name: '消费信息',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/insurances/consume')
  },
  {
    path: '/insurances/consumeInfo',
    name: '/insurances/consumeInfo',
    meta: {
      navigation: true,
      name: '消费机构信息',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/insurances/consumeInfo')
  },
  {
    path: '/insurances/consumeInfoMore',
    name: '/insurances/consumeInfoMore',
    meta: {
      navigation: true,
      name: '消费信息详情',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/insurances/consumeInfoMore')
  }
];

const rxRouter = [
  {
    path: '/rxs',
    name: '/rxs',
    meta: {
      navigation: true,
      name: '处方列表',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/rxs/index.vue')
  },
  {
    path: '/rxs/shops',
    name: '/rxs/shops',
    meta: {
      navigation: true,
      name: '处方药房列表',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/rxs/shops/index.vue')
  },
  {
    path: '/rxs/shops/drugs',
    name: '/rxs/shops/drugs',
    meta: {
      navigation: true,
      name: '选择厂商',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/rxs/shops/drugs/index.vue')
  },
  {
    path: '/rxs/view',
    name: '/rxs/view',
    meta: {
      navigation: true,
      name: '处方详情',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/rxs/view.vue')
  }
];

const addressRouter = [
  {
    path: '/addresses/edit',
    name: '/addresses/edit',
    meta: {
      navigation: true,
      name: '地址修改',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/addresses/edit.vue')
  },
  {
    path: '/addresses',
    name: '/addresses',
    meta: {
      navigation: true,
      name: '地址列表',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/addresses/index.vue')
  },
  {
    path: '/addresses/choose',
    name: '/addresses/choose',
    meta: {
      navigation: true,
      name: '选择收货地址',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/addresses/choose.vue')
  },
  {
    path: '/addresses/confirm',
    name: '/addresses/confirm',
    meta: {
      navigation: true,
      name: '确认收货地址',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/addresses/confirm.vue')
  }
];

const drugAppraiseRouter = [
  {
    path: '/drugAppraises/create',
    name: '/drugAppraises/create',
    meta: {
      navigation: true,
      name: '药品评价创建',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/drugAppraises/create.vue')
  },
  {
    path: '/drugAppraises/success',
    name: '/drugAppraises/success',
    meta: {
      navigation: true,
      name: '药品评价成功',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/drugAppraises/success.vue')
  }
];

const collectRouter = [
  {
    path: '/collects',
    name: '/collects',
    meta: {
      navigation: true,
      name: '我的收藏',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/collects/index.vue')
  }
];

const repositoryRouter = [
  {
    path: '/repositories',
    name: '/repositories',
    meta: {
      navigation: true,
      name: '知识库列表',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/repositories/index.vue')
  },
  {
    path: '/repositories/view',
    name: '/repositories/view',
    meta: {
      navigation: true,
      name: '知识库详情',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/repositories/view.vue')
  },
  {
    path: '/repositories/home',
    name: '/repositories/home',
    meta: {
      navigation: true,
      name: '健康资讯',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/repositories/home.vue')
  },
  {
    path: '/repositoryTypes',
    name: '/repositoryTypes',
    meta: {
      navigation: true,
      name: '知识库类型',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/repositoryTypes/index.vue')
  }
];

const shopDrugRouter = [
  {
    path: '/shopDrugs',
    name: '/shopDrugs',
    meta: {
      navigation: true,
      name: '商品首页',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/shopDrugs/index.vue')
  }
];

const messageRouter = [
  {
    path: '/messageTypes',
    name: '/messageTypes',
    meta: {
      navigation: true,
      name: '消息类型',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/messageTypes/index.vue')
  },
  {
    path: '/messages',
    name: '/messages',
    meta: {
      navigation: true,
      name: '消息列表',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/messages/index.vue')
  },
  {
    path: '/messages/view',
    name: '/messages/view',
    meta: {
      navigation: true,
      name: '消息详情',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/messages/view.vue')
  }
];
const orderRefundRouter = [
  {
    path: '/orderRefunds',
    name: '/orderRefunds',
    meta: {
      navigation: true,
      name: '我的退单',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/orderRefunds/index.vue')
  }
];
const orderRouter = [
  {
    path: '/orders/view',
    name: '/orders/view',
    meta: {
      navigation: true,
      name: '订单详情',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/orders/view.vue')
  },
  {
    path: '/orders/create/fromCart',
    name: '/orders/create/fromCart',
    meta: {
      navigation: true,
      name: '购物车结算',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/orders/create/fromCart.vue')
  },
  {
    path: '/orders/create/fromShop',
    name: '/orders/create/fromShop',
    meta: {
      navigation: true,
      name: '订单结算',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/orders/create/fromShop.vue')
  },
  {
    path: '/orders/addresses',
    name: '/orders/addresses',
    meta: {
      navigation: true,
      name: '订单地址',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/orders/addresses/index.vue')
  },
  {
    path: '/orders',
    name: '/orders',
    meta: {
      navigation: true,
      name: '全部订单',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/orders/index.vue')
  }
];

const shopRouter = [
  {
    path: '/shops/view',
    name: '/shops/view',
    meta: {
      navigation: true,
      name: '药房详情',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/shops/view.vue')
  },
  {
    path: '/shops/info',
    name: '/shops/info',
    meta: {
      navigation: true,
      name: '商家介绍',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/shops/info.vue')
  },
  {
    path: '/shops',
    name: '/shops',
    meta: {
      navigation: true,
      name: '药房列表',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/shops/index.vue')
  }
];

const drugRouter = [
  {
    path: '/drugs',
    name: '/drugs',
    meta: {
      navigation: true,
      name: '药品列表',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/drugs/index.vue')
  },
  {
    path: '/drugs/shops',
    name: '/drugs/shops',
    meta: {
      navigation: true,
      name: '药品药房',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/drugs/shops/index.vue')
  }
];

const feedBackRouter = [
  {
    path: '/feedbacks/create',
    name: '/feedbacks/create',
    meta: {
      navigation: true,
      name: '意见反馈创建',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/feedbacks/create.vue')
  },
  {
    path: '/feedbacks',
    name: '/feedbacks',
    meta: {
      navigation: true,
      name: '意见反馈列表',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/feedbacks/index.vue')
  },
  {
    path: '/feedbacks/view',
    name: '/feedbacks/view',
    meta: {
      navigation: true,
      name: '意见反馈详情',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/feedbacks/view.vue')
  }
];

const otherRouter = [
  {
    path: '/faqs',
    name: '/faqs',
    meta: {
      navigation: true,
      name: '常见问题',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/faqs/index.vue')
  },
  {
    path: '/iframe',
    name: '/iframe',
    meta: {
      navigation: true,
      name: 'iframe',
      showBackTopLeft: false,
      showBackBottomRight: true
    },
    component: () => import('@/views/iframe.vue')
  }
];
const appRouter = [
  {
    path: '/',
    name: '/',
    meta: {
      navigation: true,
      name: '跳转路口',
      showBackTopLeft: false,
      showBackBottomRight: false
    },
    component: () => import('@/views/entry')
  },
  {
    path: '/home',
    name: '/home',
    meta: {
      navigation: true,
      name: '首页',
      showBackTopLeft: false,
      showBackBottomRight: false
    },
    component: () => import('@/views/index')
  },
  {
    path: '/accounts',
    name: '/accounts',
    meta: {
      navigation: false,
      name: '个人中心',
      showBackTopLeft: false,
      showBackBottomRight: false
    },
    component: () => import('@/views/accounts/index')
  },
  {
    path: '/carts',
    name: '/carts',
    meta: {
      navigation: true,
      name: '购物车列表',
      showBackTopLeft: false,
      showBackBottomRight: false
    },
    component: () => import('@/views/carts/index.vue')
  },
  {
    path: '/drugTypes',
    name: '/drugTypes',
    meta: {
      navigation: true,
      name: '药品类型',
      showBackTopLeft: false,
      showBackBottomRight: false
    },
    component: () => import('@/views/drugTypes/index.vue')
  },
  {
    path: '/login',
    name: '/login',
    meta: {
      navigation: true,
      name: '登陆',
      showBackTopLeft: false,
      showBackBottomRight: false
    },
    component: () => import('@/views/login.vue')
  }
];

const Router = new VueRouter({
  routes: [
    errorRouter,
    ...collectRouter,
    ...appRouter,
    ...accountRouter,
    ...rxRouter,
    ...addressRouter,
    ...drugAppraiseRouter,
    ...repositoryRouter,
    ...shopDrugRouter,
    ...messageRouter,
    ...orderRouter,
    ...shopRouter,
    ...drugRouter,
    ...otherRouter,
    ...chatRouter,
    ...orderRefundRouter,
    ...searchRouter,
    ...insuranceRouter,
    ...feedBackRouter
  ]
});
export default Router;
