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
      mx: {
        default: '2em'
      },
      my: {
        default: '1em'
      },
      px: {
        default: '2em'
      },
      py: {
        default: '1em'
      }
    },
    data() {
      return {
        styleObject: {
          padding: `${this.py} ${this.px}`,
          margin: `${this.my} ${this.mx}`,
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
