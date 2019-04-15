<template>
  <div class="item">
    <div class="item1" @click.stop="minus">
      <span>-</span>
    </div>
    <div class="item2">
      <span>{{ number }}</span>
    </div>
    <div class="item3" @click.stop="plus">
      <span>+</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
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
  data() {
    return {
      number: this.value
    };
  },
  computed: {},
  watch: {
    number(newValue) {
      this.$emit('input', newValue);
      this.$emit('change', newValue);
    }
  },
  created() {},
  mounted() {},
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
$color: #010000;
$border-color: $color;
.item {
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 50px;
  .item1 {
    grid-column: 1/2;
    span {
      font-size: 45px;
    }
  }
  .item2 {
    grid-column: 2/3;
    padding: 0 15px;
    background-color: gainsboro;
    span {
      font-size: 30px;
    }
  }
  .item3 {
    grid-column: 3/4;
    span {
      font-size: 32px;
      font-weight: 600;
    }
  }
  .item1,
  .item2,
  .item3 {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      color: $color;
    }
  }
}
</style>
