import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/hello',
      component: HelloWorld
    },
    {
      path: '/drugs/search',
      component: () => import('@/views/drugs/search')
    },
    {
      path: '/',
      component: () => import('@/views/index')
    },
    {
      path: '/points/exchangeRecord',
      component: () => import('@/views/points/exchangeRecord')
    },
    {
      path: '/points',
      alias: '/points/index',
      component: () => import('@/views/points/index')
    },
    {
      path: '/signIn',
      alias: '/points/signIn',
      component: () => import('@/views/points/signIn')
    },
    {
      path: '/signIn',
      alias: '/points/signIn',
      component: () => import('@/views/points/signIn')
    },
    // accounts
    {
      path: '/accounts',
      component: () => import('@/views/accounts/index')
    }, {
      path: '/accounts/card/bind',
      component: () => import('@/views/accounts/card/bind')
    },
    {
      path: '/accounts/card/bind/success',
      component: () => import('@/views/accounts/card/success')
    },
    {
      path: '/accounts/password',
      component: () => import('@/views/accounts/password')
    }, {
      path: '/accounts/view',
      component: () => import('@/views/accounts/view')
    },
    {
      path: '/accounts/edit',
      component: () => import('@/views/accounts/edit')
    },
    // accounts_insurance
    {
      path: '/accounts/insurance/account',
      component: () => import('@/views/accounts/insurance/account')
    },
    {
      path: '/accounts/insurance/card',
      component: () => import('@/views/accounts/insurance/card')
    },
    {
      path: '/accounts/insurance/consume',
      component: () => import('@/views/accounts/insurance/consume')
    },
    {
      path: '/accounts/insurance/consumeinfo',
      component: () => import('@/views/accounts/insurance/consumeinfo')
    },
    {
      path: '/accounts/insurance/consumeinfomore',
      component: () => import('@/views/accounts/insurance/consumeinfomore')
    },
    // hospital
    {
      path: '/hospital/view',
      component: () => import('@/views//hospital/view')
    },
    // rxs
    {
      path: '/rxs',
      component: () => import('@/views/rxs/index.vue')
    },
    {
      path: '/rxs/shops',
      component: () => import('@/views/rxs/shops/index.vue')
    },
    {
      path: '/rxs/shops/drugs',
      component: () => import('@/views/rxs/shops/drugs/index.vue')
    },
    {
      path: '/rxs/view',
      component: () => import('@/views/rxs/view.vue')
    },
    {
      path: '/about',
      component: () => import('@/views/about.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/forget',
      component: () => import('@/views/forget.vue')
    },
    {
      path: '/feedbacks/create',
      component: () => import('@/views/feedbacks/create.vue')
    },
    {
      path: '/faqs',
      component: () => import('@/views/faqs/index.vue')
    },
    {
      path: '/addresses/create',
      component: () => import('@/views/addresses/create.vue')
    },
    {
      path: '/addresses/edit',
      component: () => import('@/views/addresses/edit.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/setting.vue')
    },
    {
      path: '/addresses',
      component: () => import('@/views/addresses/index.vue')
    },
    {
      path: '/addresses/repositioning',
      component: () => import('@/views/addresses/repositioning.vue')
    },
    {
      path: '/chats',
      component: () => import('@/views/chats/index.vue')
    },
    {
      path: '/chats/view',
      component: () => import('@/views/chats/view.vue')
    },
    {
      path: '/version',
      component: () => import('@/views/version.vue')
    },
    {
      path: '/drugAppraises',
      component: () => import('@/views/drugAppraises/index.vue')
    },
    {
      path: '/drugAppraises/create',
      component: () => import('@/views/drugAppraises/create.vue')
    },
    {
      path: '/drugAppraises/success',
      component: () => import('@/views/drugAppraises/success.vue')
    },
    {
      path: '/carts',
      component: () => import('@/views/carts/index.vue')
    },
    {
      path: '/collects',
      component: () => import('@/views/collects/index.vue')
    },
    {
      path: '/collects/child/drugs',
      component: () => import('@/views/collects/child/drugs.vue')
    },
    {
      path: '/collects/child/shops',
      component: () => import('@/views/collects/child/shops.vue')
    },
    {
      path: '/repositories',
      component: () => import('@/views/repositories/index.vue')
    },
    {
      path: '/repositories/view',
      component: () => import('@/views/repositories/view.vue')
    },
    {
      path: '/repositoryTypes',
      component: () => import('@/views/repositoryTypes/index.vue')
    },
    {
      path: '/drugTypes',
      component: () => import('@/views/drugTypes/index.vue')
    },
    {
      path: '/messageTypes',
      component: () => import('@/views/messageTypes/index.vue')
    },
    {
      path: '/messages',
      component: () => import('@/views/messages/index.vue')
    },
    {
      path: '/orderRefunds',
      component: () => import('@/views/orderRefunds/index.vue')
    },
    {
      path: '/orderRefunds/create',
      component: () => import('@/views/orderRefunds/create.vue')
    },
    {
      path: '/orderRefunds/view',
      component: () => import('@/views/orderRefunds/view.vue')
    },
    {
      path: '/shops/view',
      component: () => import('@/views/shops/view.vue')
    },
    {
      path: '/shops/info',
      component: () => import('@/views/shops/info.vue')
    },
    {
      path: '/accounts/card/success.vue',
      component: () => import('@/views/accounts/card/success.vue')
    },
    {
      path: '/shopDrugSpecs',
      component: () => import('@/views/shopDrugSpecs/index.vue')
    },
    {
      path: '/shopDrugSpecs/appraise',
      component: () => import('@/views/shopDrugSpecs/child/appraise.vue')
    },
    {
      path: '/orders/view',
      component: () => import('@/views/orders/view.vue')
    },
    {
      path: '/orders/delivery',
      component: () => import('@/views/orders/delivery.vue')
    },
    {
      path: '/orders/create/fromCart',
      component: () => import('@/views/orders/create/fromCart.vue')
    },
    {
      path: '/orders/create/fromShop',
      component: () => import('@/views/orders/create/fromShop.vue')
    },
    {
      path: '/orders/create/fromHospital',
      component: () => import('@/views/orders/create/fromHospital.vue')
    },
    {
      path: '/orders/addresses',
      component: () => import('@/views/orders/addresses/index.vue')
    },
    {
      path: '/orders/pay',
      component: () => import('@/views/orders/pay/index.vue')
    },
    {
      path: '/orders',
      component: () => import('@/views/orders/index.vue')
    },
    {
      path: '/orders/toPay',
      component: () => import('@/views/orders/toPay.vue')
    },
    {
      path: '/orders/toAppraise',
      component: () => import('@/views/orders/toAppraise.vue')
    },
    {
      path: '/orders/toDeliver',
      component: () => import('@/views/orders/toDeliver.vue')
    },
    {
      path: '/orders/toReceive',
      component: () => import('@/views/orders/toReceive.vue')
    },
    {
      path: '/orders/search',
      component: () => import('@/views/orders/search.vue')
    },
    {
      path: '/orders/takeDrug',
      component: () => import('@/views/orders/takeDrug.vue')
    },
    {
      path: '/pay/alipay',
      component: () => import('@/views/orders/pay/alipay.vue')
    },
    {
      path: '/orderRefunds/view',
      component: () => import('@/views/orderRefunds/view.vue')
    },
    {
      path: '/drugs',
      component: () => import('@/views/drugs/index.vue')
    },
    {
      path: '/drugs/screen',
      component: () => import('@/views/drugs/screen.vue')
    },
    {
      path: '/drugs/screenConfirm',
      component: () => import('@/views/drugs/screenConfirm.vue')
    },
    {
      path: '/drugs/shops',
      component: () => import('@/views/drugs/shops/index.vue')
    },
    {
      path: '/shopDrugSpecs/info',
      alias: '/shopDrugSpecs/child/info',
      component: () => import('@/views/shopDrugSpecs/child/info.vue')
    },
    {
      path: '/shopDrugSpecs/view',
      component: () => import('@/views/shopDrugSpecs/view.vue')
    },
    {
      path: '/shops',
      alias: '/shops/index',
      component: () => import('@/views/shops/index.vue')
    },
    {
      path: '/shops/drugs',
      component: () => import('@/views/shops/drugs/index.vue')
    }
  ]
});
