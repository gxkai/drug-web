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
      path: '/addresses/create',
      component: () => import('@/views/addresses/create.vue')
    },
    {
      path: '/addresses/edit',
      component: () => import('@/views/addresses/edit.vue')
    },
    {
      path: '/addresses',
      component: () => import('@/views/addresses/index.vue')
    }
  ]
});
