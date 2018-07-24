import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/accounts',
      name: 'account',
      component: () => import('@/views/accounts/index.vue')
    },
    {
      path: '/accounts/card/bind',
      name: 'bind',
      component: () => import('@/views/accounts/card/bind.vue')
    },
    {
      path: '/accounts/card/unbind',
      name: 'unbind',
      component: () => import('@/views/accounts/card/unbind.vue')
    },
    {
      path: '/accounts/card/unbindCard',
      name: 'unbindCard',
      component: () => import('@/views/accounts/card/unbindCard.vue')
    },
    {
      path: '/accounts/card/success',
      name: 'success',
      component: () => import('@/views/accounts/card/success.vue')
    },
    {
      path: '/accounts/child/accountLabel',
      name: 'accountLabel',
      component: () => import('@/views/accounts/child/accountLabel.vue')
    },
    {
      path: '/accounts/insurance/account',
      name: 'account',
      component: () => import('@/views/accounts/insurance/account.vue')
    },
    {
      path: '/accounts/insurance/card',
      name: 'card',
      component: () => import('@/views/accounts/insurance/card.vue')
    },
    {
      path: '/accounts/insurance/consume',
      name: 'consume',
      component: () => import('@/views/accounts/insurance/consume.vue')
    },
    {
      path: '/accounts/insurance/consumeinfo',
      name: 'consumeinfo',
      component: () => import('@/views/accounts/insurance/consumeinfo.vue')
    },
    {
      path: '/accounts/insurance/consumeinfomore',
      name: 'consumeinfomore',
      component: () => import('@/views/accounts/insurance/consumeinfomore.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('@/views/forget.vue')
    },
    {
      path: '/feedbacks',
      name: 'feedbacks',
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
      path: '/version',
      component: () => import('@/views/version.vue')
    }
  ]
});
