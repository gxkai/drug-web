<template>
  <div></div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
      if (this.$store.getters.receivedPosition === undefined) {
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
