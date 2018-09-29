import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/drugs/search',
      name: '药品搜索',
      component: () => import('@/views/drugs/search')
    },
    {
      path: '/error',
      name: '错误页面',
      component: () => import('@/components/error')
    },
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/index')
    },
    {
      path: '/points/exchangeRecord',
      name: '兑换记录',
      component: () => import('@/views/points/exchangeRecord')
    },
    {
      path: '/points',
      alias: '/points/index',
      name: '积分列表',
      component: () => import('@/views/points/index')
    },
    {
      path: '/signIn',
      alias: '/points/signIn',
      name: '积分兑换',
      component: () => import('@/views/points/signIn')
    },
    {
      path: '/points/view',
      name: '积分详情',
      component: () => import('@/views/points/view')
    },
    // accounts
    {
      path: '/accounts',
      name: '个人中心',
      component: () => import('@/views/accounts/index')
    }, {
      path: '/accounts/card/bind',
      name: '医保卡绑定',
      component: () => import('@/views/accounts/card/bind')
    },
    {
      path: '/accounts/card/bind/success',
      name: '绑定成功',
      component: () => import('@/views/accounts/card/success')
    },
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
      path: '/accounts/edit',
      name: '账户信息修改',
      component: () => import('@/views/accounts/edit')
    },
    // accounts_insurance
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
      name: '年度消费信息',
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
    },
    // hospital
    {
      path: '/hospital/view',
      name: '医院详情',
      component: () => import('@/views//hospital/view')
    },
    // rxs
    {
      path: '/rxs',
      name: '处方列表',
      component: () => import('@/views/rxs/index.vue')
    },
    {
      path: '/rxs/shops',
      name: '处方药店列表',
      component: () => import('@/views/rxs/shops/index.vue')
    },
    {
      path: '/rxs/shops/drugs',
      name: '处方药店药品列表',
      component: () => import('@/views/rxs/shops/drugs/index.vue')
    },
    {
      path: '/rxs/view',
      name: '处方详情',
      component: () => import('@/views/rxs/view.vue')
    },
    {
      path: '/about',
      name: '关于我们',
      component: () => import('@/views/about.vue')
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
    },
    {
      path: '/feedbacks/create',
      name: '反馈创建',
      component: () => import('@/views/feedbacks/create.vue')
    },
    {
      path: '/faqs',
      name: '常见问题',
      component: () => import('@/views/faqs/index.vue')
    },
    {
      path: '/addresses/create',
      name: '地址创建',
      component: () => import('@/views/addresses/create.vue')
    },
    {
      path: '/addresses/edit',
      name: '地址修改',
      component: () => import('@/views/addresses/edit.vue')
    },
    {
      path: '/setting',
      name: '设置',
      component: () => import('@/views/setting.vue')
    },
    {
      path: '/addresses',
      name: '地址列表',
      component: () => import('@/views/addresses/index.vue')
    },
    {
      path: '/addresses/repositioning',
      name: '地址选择',
      component: () => import('@/views/addresses/repositioning.vue')
    },
    {
      path: '/chats',
      name: '聊天列表',
      component: () => import('@/views/chats/index.vue')
    },
    {
      path: '/chats/view',
      name: '聊天详情',
      component: () => import('@/views/chats/view.vue')
    },
    {
      path: '/version',
      name: '版本信息',
      component: () => import('@/views/version.vue')
    },
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
    },
    {
      path: '/carts',
      name: '购物车列表',
      component: () => import('@/views/carts/index.vue')
    },
    {
      path: '/collects',
      name: '我的收藏',
      component: () => import('@/views/collects/index.vue')
    },
    {
      path: '/collects/child/drugs',
      name: '药品收藏',
      component: () => import('@/views/collects/child/drugs.vue')
    },
    {
      path: '/collects/child/shops',
      name: '药店收藏',
      component: () => import('@/views/collects/child/shops.vue')
    },
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
    },
    {
      path: '/drugTypes',
      name: '药品类型',
      component: () => import('@/views/drugTypes/index.vue')
    },
    {
      path: '/messageTypes',
      name: '消息类型',
      component: () => import('@/views/messageTypes/index.vue')
    },
    {
      path: '/messages',
      name: '消息列表',
      component: () => import('@/views/messages/index.vue')
    },
    {
      path: '/orderRefunds',
      name: '退款列表',
      component: () => import('@/views/orderRefunds/index.vue')
    },
    {
      path: '/orderRefunds/create',
      name: '退款创建',
      component: () => import('@/views/orderRefunds/create.vue')
    },
    {
      path: '/orderRefunds/view',
      name: '退款详情',
      component: () => import('@/views/orderRefunds/view.vue')
    },
    {
      path: '/shops/view',
      name: '药店详情',
      component: () => import('@/views/shops/view.vue')
    },
    {
      path: '/shops/info',
      name: '商家介绍',
      component: () => import('@/views/shops/info.vue')
    },
    {
      path: '/accounts/card/success.vue',
      name: '医保卡绑定成功',
      component: () => import('@/views/accounts/card/success.vue')
    },
    {
      path: '/shopDrugSpecs',
      name: '商品首页',
      component: () => import('@/views/shopDrugSpecs/index.vue')
    },
    {
      path: '/shopDrugSpecs/appraise',
      name: '商品评价列表',
      component: () => import('@/views/shopDrugSpecs/child/appraise.vue')
    },
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
      name: '药店结算',
      component: () => import('@/views/orders/create/fromShop.vue')
    },
    {
      path: '/orders/addresses',
      name: '订单地址',
      component: () => import('@/views/orders/addresses/index.vue')
    },
    {
      path: '/orders/pay',
      name: '支付成功',
      component: () => import('@/views/orders/pay/index.vue')
    },
    {
      path: '/orders',
      name: '全部订单',
      component: () => import('@/views/orders/index.vue')
    },
    {
      path: '/orders/takeDrug',
      name: '医院取药',
      component: () => import('@/views/orders/takeDrug.vue')
    },
    {
      path: '/pay/alipay',
      name: '支付宝支付',
      component: () => import('@/views/orders/pay/alipay.vue')
    },
    {
      path: '/drugs',
      name: '药品列表',
      component: () => import('@/views/drugs/index.vue')
    },
    {
      path: '/drugs/screen',
      name: '药品筛选',
      component: () => import('@/views/drugs/screen.vue')
    },
    {
      path: '/drugs/screenConfirm',
      name: '药品筛选确认',
      component: () => import('@/views/drugs/screenConfirm.vue')
    },
    {
      path: '/drugs/shops',
      name: '药品药店',
      component: () => import('@/views/drugs/shops/index.vue')
    },
    {
      path: '/shopDrugSpecs/info',
      alias: '/shopDrugSpecs/child/info',
      name: '商品信息',
      component: () => import('@/views/shopDrugSpecs/child/info.vue')
    },
    {
      path: '/shopDrugSpecs/view',
      name: '商品详情',
      component: () => import('@/views/shopDrugSpecs/view.vue')
    },
    {
      path: '/shops',
      alias: '/shops/index',
      name: '药店列表',
      component: () => import('@/views/shops/index.vue')
    },
    {
      path: '/shops/drugs',
      name: '药店药品列表',
      component: () => import('@/views/shops/drugs/index.vue')
    },
    {
      path: '/qrCode',
      name: '扫码页面',
      component: () => import('@/views/qrCode.vue')
    }
  ]
});
