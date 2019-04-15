export default {
  install(Vue) {
    /**
     * 上下循环抖动
     */
    Vue.directive('bounce-column', {
      inserted(e) {
        document.styleSheets[0].insertRule(
          '@keyframes bounce {\n' +
            '    25% {transform: translateY(-30%);}\n' +
            '    50%, 100% {transform: translateY(0);}\n' +
            '    75% {transform: translateY(30%);}\n' +
            '  }',
          0
        );
        e.style.animation = 'bounce 1.5s linear infinite';
      }
    });

    /**
     * 获取焦点
     */
    Vue.directive('focus', {
      inserted(el) {
        el.focus();
      }
    });
  }
};
