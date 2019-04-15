<template>
  <div class="wrapper">
    <div>
      健康资讯
    </div>
    <div></div>
    <van-icon name="gonggao-" color="#F63016" size=".5rem" />
    <div class="van-ellipsis">
      <hooper
        v-if="repositories.length > 0"
        :auto-play="true"
        :play-speed="5000"
        :transition="500"
        :vertical="true"
      >
        <slide
          v-for="(item, index) in repositories"
          :key="index"
          class="van-ellipsis"
          @click.native="clickItem(item)"
        >
          <span>{{ item.title }}</span>
        </slide>
      </hooper>
    </div>
    <div @click="clickMore">
      更多>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
export default {
  name: '',
  components: {
    Hooper,
    Slide
  },
  mixins: [],
  data() {
    return {
      repositories: []
    };
  },
  computed: {},
  watch: {},
  async created() {
    this.repositories = await this.$http.get('/api/repositories/home');
  },
  mounted() {},
  methods: {
    clickItem(item) {
      this.loadPageRepositoriesView(item.id);
    },
    clickMore() {
      this.loadPageRepositoriesHome();
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: auto auto auto 1fr auto;
  grid-column-gap: 10px;
  padding: 10px 15px;
  background-color: white;
  align-items: center;
  .hooper {
    height: 30px;
  }
  & > div {
    * {
      border: none !important;
      outline: none !important;
    }
    &:nth-child(1) {
      font-family: FZZCHJW--GB1-0 !important;
      font-style: italic;
      color: $theme;
    }
    &:nth-child(2) {
      width: 1px;
      height: 30px;
      background-color: black;
      display: inline-block;
    }
    &:last-child {
      color: $gray;
      font-size: $size-mini;
    }
  }
}
</style>
