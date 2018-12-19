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
        default: false
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

<style scoped>
  .iconfont{
    font-size: 28px;
  }
  .ic-radiochecked:before {
    color: rgba(19, 193, 254, 1);
  }
</style>
