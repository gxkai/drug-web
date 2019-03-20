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
      px: {
        default: '.5rem'
      },
      py: {
        default: '.5rem'
      },
      mx: {
        default: '0'
      },
      my: {
        default: '0'
      }
    },
    data() {
      return {
        styleObject: {
          padding: `${this.py} ${this.px}`,
          margin: `${this.my} ${this.mx}`
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
