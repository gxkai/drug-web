<template>
  <div class="info-cell hairline-bottom">
    <div class="left">
      <span> {{ title }}： </span>
    </div>
    <div class="right">
      <span>
        {{ desc }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: ['title', 'desc'],
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
  grid-template-columns: 150px 1fr;
  padding: 33px;
  div {
    word-break: break-word;
  }
  .left {
    span {
      font-size: $size-small;
    }
  }
  .right {
    span {
      font-size: $size-small;
      color: $gray;
    }
  }
}
</style>
