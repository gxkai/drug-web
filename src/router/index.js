import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
// accounts
import accounts from '@/views/accounts/index';
import accountsBind from '@/views/accounts/card/bind';
import accountsUnbind from '@/views/accounts/card/unbind';
import accountsBindSuccess from '@/views/accounts/card/success';
import accountsPassword from '@/views/accounts/password';
import accountsView from '@/views/accounts/view';
import accountsEdit from '@/views/accounts/edit';
// 医保信息
import card from '@/views/accounts/insurance/card';
import account from '@/views/accounts/insurance/account';
import consume from '@/views/accounts/insurance/consume';
import consumeinfo from '@/views/accounts/insurance/consumeinfo';
import consumeinfomore from '@/views/accounts/insurance/consumeinfomore';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // accounts
    {
      path: '/accounts',
      component: accounts
    }, {
      path: '/accounts/bind',
      component: accountsBind
    }, {
      path: '/accounts/unbind',
      component: accountsUnbind
    }, {
      path: '/accounts/bind/success',
      name: '/accounts/bind/success',
      component: accountsBindSuccess
    },
    {
      path: '/accounts/password',
      component: accountsPassword
    }, {
      path: '/accounts/view',
      component: accountsView
    },
    {
      path: '/accounts/edit',
      component: accountsEdit
    },
    // accounts_insurance
    {
      path: '/accounts/insurance/account',
      component: account
    },
    {
      path: '/accounts/insurance/card',
      component: card
    },
    {
      path: '/accounts/insurance/consume',
      component: consume
    },
    {
      path: '/accounts/insurance/consumeinfo',
      component: consumeinfo
    },
    {
      path: '/accounts/insurance/consumeinfomore',
      component: consumeinfomore
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('@/views/forget.vue')
    },
    {
      path: '/feedbacks',
      name: 'feedbacksCreate',
      component: () => import('@/views/feedbacks/create.vue')
    },
    {
      path: '/faqs',
      name: 'faqs',
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
      path: '/carts',
      name: 'carts',
      component: () => import('@/views/carts/index.vue')
    },
    {
      path: '/collects',
      name: 'collects',
      component: () => import('@/views/collects/index.vue')
    },
    {
      path: '/collects/child/drugs',
      name: 'collectDrugs',
      component: () => import('@/views/collects/child/drugs.vue')
    },
    {
      path: '/collects/child/shops',
      name: 'collectShops',
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
    }
  ]
});
