<template>
  <footer>
    <div
      @click="loadPageShopsDrugs(shopId)"
    >
           <span>
        全部商品
      </span>
    </div>
    <div
      @click="loadPageShopsInfo(shopId)"
    >
          <span>
        商家介绍
      </span>
    </div>
  </footer>
</template>

<script>
  export default {
    props: {
      shopId: {}
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 100px;
    grid-column-gap: 2px;
    background-color: #F5F5F5;
    div {
      background-color: white;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
