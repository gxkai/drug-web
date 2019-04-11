<template>
  <new-layout>
    <template slot="center">
      <iframe :src="url" height="100%" width="100%">
      </iframe>
    </template>
  </new-layout>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        url: this.$route.query.url,
        name: this.$route.query.name
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
