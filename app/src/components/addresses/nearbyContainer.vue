<template>
  <div class="nearby-container">
    <header>
      附近地址
    </header>
    <div class="nearby-wrapper">
      <span
        v-for="(item, index) in nearbyAddresses"
        :key="index"
        @click="$emit('click-item', item)"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    nearbyAddresses: {}
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
@mixin padding {
  padding: 10px 26px;
}
@mixin padding-x {
  padding: 0 26px;
}
@mixin padding-y {
  padding: 10px 0;
}
@mixin header {
  font-size: $size-mini;
  color: $gray;
  @include padding-x;
  padding-top: 5px;
  background-color: white;
}
.nearby-container {
  header {
    @include header;
  }
  .nearby-wrapper {
    background-color: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @include padding-y;
    span {
      background-color: #f5f5f5;
      border-radius: 5px;
      padding: 10px 15px;
      margin-top: 10px;
      margin-left: 20px;
      font-size: $size-mini;
    }
  }
}
</style>
