<template>
  <footer class="hairline-bottom">
    <span>
      {{ `共${quantity}件商品` }}
    </span>
    <span>
      合计：
      <i>
        {{ `￥${amount}` }}
      </i>
    </span>
  </footer>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    quantity: {},
    amount: {}
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
footer {
  background-color: white;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  * {
    font-size: $size-mini;
  }
  span {
    color: #010000;
    i {
      color: #ff0000;
    }
  }
}
</style>
