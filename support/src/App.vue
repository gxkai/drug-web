<template>
  <div id="app">
    <transition
      :name="transitionName"
    >
      <navigation>
        <router-view class="app-router"/>
      </navigation>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionName: 'fade'
      };
    },
    computed: {
    },
    created() {
      this.$navigation.on('forward', (to, from) => {
        this.transitionName = 'slide-left';
      });
      this.$navigation.on('back', (to, from) => {
        this.transitionName = 'slide-right';
      });
    },
    methods: {
    }
  };
</script>
<style lang="scss">
  @import "assets/scss/index.scss";
  * {
    font-family: HiraginoSansGB-W3;
    font-size: 30px;
  }
  .app-router {
    position:absolute;
    width:100%;
    transition:all.8s cubic-bezier(.55,0,.1,1);
  }
   	.slide-left-enter,.slide-right-leave-active {
     opacity:0;
     transform: translate(100%, 0);
  }
   	.slide-left-leave-active,.slide-right-enter {
     opacity:0;
     transform: translate(-100%, 0);
  }
</style>
