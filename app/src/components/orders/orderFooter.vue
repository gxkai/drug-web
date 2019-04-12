<template>
  <footer class="hairline-bottom">
          <span>
            {{`共${quantity}件商品`}}
          </span>
    <span>
            合计：
            <i>
              {{`￥${amount}`}}
            </i>
          </span>
  </footer>
</template>

<script>
  export default {
    props: {
      quantity: {},
      amount: {}
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  footer {
    background-color: white;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    *{
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
