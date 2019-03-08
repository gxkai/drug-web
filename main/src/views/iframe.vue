<template>
  <new-layout>
    <template slot="top">
      <van-nav-bar
        :title="this.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
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
        url: this.$route.params.url,
        name: this.$route.params.name
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
