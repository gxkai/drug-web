<template>
  <div class="wing-blank" :style="styleObject">
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
      size: {
        default: 1
      }
    },
    data() {
      return {
        styleObject: {
          margin: `0 ${this.size}em`
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
</style>
