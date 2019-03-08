import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const loginRouter = [{
  name: '登陆页',
  path: '/login',
  alias: '/',
  component: () => import('@/views/login')
}];
const chatRouter = [{
  name: '聊天列表',
  path: '/chats',
  component: () => import('@/views/chats/index')
},
{
  path: '/chats/view',
  component: () => import('@/views/chats/view')
}];
const shopRouter = [{
  path: '/scan',
  component: () => import('@/views/shop/scan')
},
{
  path: '/shop',
  name: '扫一扫确认收货',
  component: () => import('@/views/shop/index')
}];

export default new Router({
  routes: [
    ...loginRouter,
    ...chatRouter,
    ...shopRouter
  ]
});
