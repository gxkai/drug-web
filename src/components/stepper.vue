<template>
  <div class="new-stepper">
    <button class="new-stepper__minus"
    @click="minus">-</button>
    <button  class="new-stepper__input" readonly>{{number}}</button>
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
        this.$emit('change', newValue);
      }
    },
    computed: {},
    data() {
      return {
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

<style scoped type="text/scss" lang="scss">
  .new-stepper {
    display: flex;
    &__minus, &__plus {
      -webkit-appearance: none;
      border: 1PX solid #eaeaea;
      width: 40px;
      height: 43px;
      line-height: 43px;
      background-color: white;
      font-size: 25px;
    }
    &__input {
      -webkit-appearance: none;
      border: 1PX solid #eaeaea;
      height: 30px;
      line-height: 5px;
      padding: 20px 20px;
      background-color: white;
      font-size: 25px;
      border-left: none;
      border-right: none;
    }
  }
</style>
