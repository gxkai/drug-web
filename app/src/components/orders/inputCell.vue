<template>
  <div class="info-cell hairline-bottom">
    <div class="left">
      <span> {{ label }}： </span>
    </div>
    <div class="right">
      <input
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    label: {},
    value: {},
    placeholder: {}
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped type="text/scss" lang="scss">
.info-cell {
  background-color: white;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 22px 34px;
  align-items: center;
  align-content: center;
  .left {
    span {
      font-size: $size-small;
    }
  }
  .right {
    input {
      font-size: $size-small;
      width: 100%;
    }
  }
}
</style>
