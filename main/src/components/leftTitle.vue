<template>
  <new-wing-blank class="wrapper van-hairline--bottom">
    <div class="item1">
      <new-line width="4px" height=".5rem" :color="lineColor" />
    </div>
    <div class="item2">
            <span :style="{color: textColor}">
              {{text}}
            </span>
    </div>
  </new-wing-blank>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    props: {
      lineColor: {
        default: 'red'
      },
      text: {},
      textColor: {
        default: 'red'
      }
    },
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
    background-color: white;
    display: grid;
    grid-template-columns: 10px auto;
    grid-template-rows: 40px;
    grid-column-gap: 20px;
    .item1 {
      display: flex;
      align-items: center;
    }
    .item2 {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
        color: #56d0fb;
      }
    }
  }
</style>
