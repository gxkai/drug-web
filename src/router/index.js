import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      component: () => import('@/views/index')
    },
    // accounts
    {
      path: '/accounts',
      component: () => import('@/views/accounts/index')
    }, {
      path: '/accounts/bind',
      component: () => import('@/views/accounts/card/bind')
    }, {
      path: '/accounts/unbind',
      component: () => import('@/views/accounts/card/unbind')
    }, {
      path: '/accounts/bind/success',
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
      name: 'messageTypes',
      component: () => import('@/views/messageTypes/index.vue')
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/views/messages/index.vue')
    }
  ]
});
