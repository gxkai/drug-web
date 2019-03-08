<template>
  <div class="wing-blank" :style="styleObject">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {
    },
    props: {
      row: {
        default: '2em'
      },
      column: {
        default: '1em'
      }
    },
    data() {
      return {
        styleObject: {
          padding: `${this.column} ${this.row}`
        }
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped>
  .wing-blank {
    width: 100%;
  }
</style>
