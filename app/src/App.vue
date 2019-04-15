<template>
  <div v-cloak id="app">
    <top-left />
    <bottom-right />
    <transition :name="transitionName">
      <navigation v-if="$route.meta.navigation">
        <router-view class="app-router" />
      </navigation>
      <router-view v-else class="app-router" />
    </transition>
  </div>
</template>

<script>
import topLeft from '@/components/backButtons/topLeft';
import bottomRight from '@/components/backButtons/bottomRight';

export default {
  name: 'App',
  components: {
    topLeft,
    bottomRight
  },
  data() {
    return {
      transitionName: 'fade',
      isProd: process.env.NODE_ENV === 'production'
    };
  },
  computed: {},
  created() {
    this.$navigation.on('forward', () => {
      this.transitionName = 'slide-left';
    });
    this.$navigation.on('back', () => {
      this.transitionName = 'slide-right';
    });
  },
  methods: {}
};
</script>
<style lang="scss" type="text/scss">
@import 'assets/scss/index.scss';
.app-router {
  position: absolute;
  width: 100%;
  transition: all.8s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}
[v-cloak] {
  display: none !important;
}
</style>
