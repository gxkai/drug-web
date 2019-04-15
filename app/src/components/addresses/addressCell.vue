<template>
  <div class="wrapper hairline-bottom">
    <div class="left">
      <span></span>
    </div>
    <div class="right">
      <div class="line1">
        {{ item.name }}
      </div>
      <div class="line2">
        {{ item.address || `${item.distance / 1000}km` }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    item: {}
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
.wrapper {
  background-color: white;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-column-gap: 20px;
  padding: 20px;
  .left {
    word-break: break-word;
    span {
      display: block;
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background-color: #d7000e;
    }
  }
  .right {
    word-break: break-word;
    .line2 {
      margin-top: 15px;
      font-size: $size-mini;
      color: $gray-light;
    }
  }
}
</style>
