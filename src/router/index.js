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
    }
  ]
});
