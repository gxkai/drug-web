<template>
  <div class="wrapper">
    <div class="left" @click="$emit('click-left')">
      <van-icon v-if="leftIcon !== undefined" :name="leftIcon" />
      <span v-if="leftText !== undefined" class="left-text">
        {{ leftText }}
      </span>
    </div>
    <div class="right" @click="$emit('click-right')">
      <van-icon v-if="rightIcon !== undefined" :name="rightIcon" />
      <span v-if="rightText !== undefined" class="right-text">
        {{ rightText }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    leftIcon: {},
    leftText: {},
    rightIcon: {},
    rightText: {}
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
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 20px;
  background-color: white;
  padding: 10px 15px;
  .left {
    .left-text {
      font-size: $size-mini;
    }
  }
}
</style>
