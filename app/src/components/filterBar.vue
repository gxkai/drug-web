<template>
  <div class="filter-bar">
        <span :style="{color: active_===index ? '#454545': '#999999'}"
              v-for="(item, index) in filters" :key="index"
              @click="onClick(index)"
        >
          {{item}}
        </span>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    props: {
      filters: {
        type: Array
      },
      active: {
        default: 0
      }
    },
    watch: {},
    computed: {},
    data() {
      return {
        active_: this.active
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onClick(index) {
        this.active_ = index;
        this.$emit('update:active', index);
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .filter-bar {
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
    padding: 0 40px;
  }
</style>
