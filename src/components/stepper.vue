<template>
  <div class="item">
    <div class="item1" @click="minus">
      <span>-</span>
    </div>
    <div class="item2">
      <span>{{number}}</span>
    </div>
    <div class="item3" @click="plus">
      <span>+</span>
    </div>
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
  .item {
    display: grid;
    grid-template-rows: 50px;
    grid-template-columns: 50px auto 50px;
    background-color: #999999;
    .item1 {
      grid-column: 1/2;
    }
    .item2 {
      grid-column: 2/3;
      padding: 0 20px;
    }
    .item3 {
      grid-column: 3/4;
    }
    .item1, .item2, .item3 {
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 30px;
      }
    }

  }
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
