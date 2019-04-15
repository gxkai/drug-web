import vue from 'vue';

// 这里就是我们刚刚创建的那个静态组件
import loadingComponent from './loading.vue';

// 返回一个 扩展实例构造器
const LoadingConstructor = vue.extend(loadingComponent);

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
// 实例化一个 toast.vue
const loadingDom = new LoadingConstructor({
  el: document.createElement('div'),
  data() {
    return {
      type: 1,
      show: true
    };
  }
});
let dToast = {
  loading(type) {
    if (type !== undefined) {
      loadingDom.type = type;
    }
    // 把 实例化的 toast.vue 添加到 body 里
    document.body.appendChild(loadingDom.$el);
  },
  clear() {
    loadingDom.show = false;
  }
};

// 注册为全局组件的函数
function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$dToast = dToast;
}

export default registryToast;
