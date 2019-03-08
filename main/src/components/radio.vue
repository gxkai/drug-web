<template>
  <div>
    <div @click="onRadio()">
      <van-icon name="radiobox" v-show="!radio" :size="size"></van-icon>
      <van-icon name="radiochecked" v-show="radio" :size="size"></van-icon>
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
        default: '2em'
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
    &-radiochecked, &-radiobox {
      color: $themeColor;
    }
  }
</style>
