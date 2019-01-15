<template>
  <div>
    <div @click="onRadio()">
      <i class="iconfont ic-radiobox" v-show="!radio"></i>
      <i class="iconfont ic-radiochecked" v-show="radio"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'newRadio',
    props: {
      radio: {
        type: Boolean,
        default: true
      },
      disabled: {
        default: true
      }
    },
    methods: {
      onRadio() {
        if (this.disabled !== '') {
          this.radio = !this.radio;
          this.$emit('update:radio', this.radio);
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .iconfont{
    font-size: 28px;
  }
  .ic-radiochecked:before {
    color: $themeColor;
  }
  .ic-radiobox:before {
    color: $themeColor;
  }
</style>
