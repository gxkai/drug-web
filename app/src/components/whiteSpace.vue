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
        default: '.2rem'
      },
      color: {
        default: '#f5f5f5'
      }
    },
    data() {
      return {
        styleObject: {
          marginTop: `${this.size}`,
          backgroundColor: `${this.color}`
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
