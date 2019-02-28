<template>
    <div class="loading" @touchmove.prevent @scroll.prevent>
      <img src="../assets/gif/loading.gif">
    </div>
</template>

<script>
	export default {
	  name: 'loading',
	  mixins: [],
	  watch: {},
	  computed: {},
	  data() {
	    return {};
	  },
	  created() {
	  },
	  mounted() {
	  },
	  methods: {}
	};
</script>

<style scoped type="text/scss" lang="scss">
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 720px;
    height: 100vh;
    background-color: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    img {
      width: 200px;
    }
  }
</style>
