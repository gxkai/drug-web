<template>
  <div></div>
</template>

<script>
  import { getReceivedPosition } from '../assets/js/auth';

  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
      if (getReceivedPosition() === undefined) {
        this.$router.push('/addresses/choose');
      } else {
        this.$router.push('/index');
      }
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped>

</style>
