<template>
  <div>
    <div @click="onRadio()">
      <i class="icon-font ic-radiobox" v-show="!radio"></i>
      <i class="icon-font ic-radiochecked" v-show="radio"></i>
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

<style scoped>
  .ic-radiochecked:before {
    color: rgba(19, 193, 254, 1);
  }
</style>
