<template>
  <div class="hairline-bottom wrapper">
    <div @click="$emit('back')">
      <van-icon name="arrow-left" color="#999999"  size=".46rem" v-show="showBack !== undefined" />
    </div>
          <span class="center">
            {{title}}
          </span>
      <div @click="$emit('close')">
        <van-icon name="close" color="#999999"  size=".46rem" v-show="showClose !== undefined" />
      </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      title: {},
      showBack: {},
      showClose: {}
    },
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
  .wrapper {
    display: grid;
    grid-template-columns: 100px 1fr 100px;
    grid-template-rows: 100px;
    grid-column-gap: 20px;
    align-items: center;
    justify-items: center;
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
