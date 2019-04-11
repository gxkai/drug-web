<template>
  <div>
    <div @click="onRadio()">
      <van-icon name="xuanze-" v-show="!radio" :size="size"></van-icon>
      <van-icon name="wancheng-" v-show="radio" :size="size" color="#d7000e"></van-icon>
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
        type: Boolean,
        default: false
      },
      size: {
        default: '.5rem'
      }
    },
    methods: {
      onRadio() {
        if (this.disabled === false) {
          this.$emit('update:radio', !this.radio);
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .van-icon {
     &-radiobox {
      color: $gray-light;
    }
    &-radiochecked {
      color: $theme;
    }
  }
</style>
