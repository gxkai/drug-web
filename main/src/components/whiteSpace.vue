<template>
  <div class="white-space" :style="styleObject">
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
          marginTop: `${this.size}em`
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
