<template>
  <div class="info-cell hairline-bottom">
    <div class="left">
      <span> {{ label }}： </span>
    </div>
    <div class="right van-ellipsis">
      <input
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled !== undefined"
        class="van-ellipsis"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: ['label', 'value', 'placeholder', 'disabled'],
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
  grid-template-columns: 140px auto;
  padding: 33px;
  align-items: center;
  .left {
    span {
      font-size: $size-small;
    }
  }
  .right {
    word-break: break-word;
    input {
      width: 100%;
    }
    span {
      font-size: $size-small;
      color: $gray;
    }
  }
}
</style>
