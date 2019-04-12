<template>
  <div class="wrapper">
    <div>
      <span>
        {{content}}
      </span>
    </div>
    <div @click="$emit('click')">
      <span>
        {{name}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    props: {
      content: {},
      name: {}
    },
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
    grid-template-columns: repeat(2, 1fr);
    div {
      padding: 40px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      &:nth-child(1) {
        span {
          color: #f01b2d;
          font-size: 36px;
        }
      }
      &:nth-child(2) {
        background-color: #ff0000;
        span {
          color: white;
        }
      }
    }
  }
</style>
