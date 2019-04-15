<template>
  <div class="filter-bar">
    <span
      v-for="(item, index) in filters"
      :style="{ color: active_ === index ? '#454545' : '#999999' }"
      :key="index"
      @click="onClick(index)"
    >
      {{ item }}
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
  data() {
    return {
      active_: this.active
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
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
