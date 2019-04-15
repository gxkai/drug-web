<template>
  <div>
    <new-layout>
      <template slot="center">
        <nav-bar
          v-for="(item, index) in list"
          :item="item"
          :key="index"
          @click.native="clickItem(item)"
        />
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss"></style>
<script>
import navBar from '@/components/repositories/navBar';
export default {
  name: '',
  components: {
    navBar
  },
  mixins: [],
  data() {
    return {
      list: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      this.list = await this.$http.get('/api/repositories/home');
      console.log(this.list);
    },
    clickItem(item) {
      this.loadPageRepositoriesView(item.id);
    }
  }
};
</script>
