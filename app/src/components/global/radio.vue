<template>
  <div>
    <div @click="onRadio()">
      <van-icon v-show="!radio" :size="size" name="xuanze-"></van-icon>
      <van-icon
        v-show="radio"
        :size="size"
        name="wancheng-"
        color="#d7000e"
      ></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewRadio',
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
