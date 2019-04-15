<template>
  <div class="info-cell hairline-bottom">
    <div class="left">
      <van-icon
        v-show="leftIcon !== undefined"
        :name="leftIcon"
        color="#d7000e"
        size="0.46rem"
      />
      <span>
        {{ title }}
      </span>
    </div>
    <div class="right">
      <span>
        {{ desc }}
      </span>
      <van-icon v-show="isLink !== undefined" name="arrow" color="#b9b9b9" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    title: {},
    desc: {},
    leftIcon: {},
    isLink: {}
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
  grid-column-gap: 20px;
  padding: 30px 41px;
  div {
    word-break: break-word;
  }
  .left {
    span {
      font-size: $size-normal;
    }
  }
  .right {
    justify-self: right;
    span {
      font-size: $size-small;
      color: $gray;
    }
  }
}
</style>
