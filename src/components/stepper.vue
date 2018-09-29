<template>
  <div class="new-stepper">
    <button class="new-stepper__minus"
    @click="minus">-</button>
    <input type="number" class="new-stepper__input" v-model="number" :style="{width: inputWidth}" readonly>
    <button class="new-stepper__plus"
    @click="plus">+</button>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      value: {
        default: 1
      },
      min: {
        default: 1
      },
      max: {
        default: 9999999
      }
    },
    mixins: [],
    watch: {
      number(newValue) {
        this.$emit('input', newValue);
        this.inputWidth = newValue.toString().length * 0.5 + 'rem';
        console.log(this.inputWidth);
      }
    },
    computed: {},
    data() {
      return {
        inputWidth: '0.5rem',
        number: this.value
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      minus() {
        if (this.number > this.min) {
          this.number--;
        }
      },
      plus() {
        if (this.number < this.max) {
          this.number++;
        }
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .new-stepper {
    display: flex;
    &__minus, &__plus {
      -webkit-appearance: none;
      border: 1PX solid #999999;
      width: 30px;
      height: 30px;
      line-height: 20px;
      background-color: white;
      font-size: 25px;
    }
    &__input {
      -webkit-appearance: none;
      border: 1PX solid #999999;
      border-width: 1PX 0;
      height: 30px;
      text-align: center;
      font-size: 25px;
      max-width: 70px;
    }
  }
</style>
