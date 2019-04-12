<template>
    <div class="wrapper">
      <div>
        健康资讯
      </div>
      <div>
      </div>
      <van-icon name="gonggao-" color="#F63016" size=".5rem" />
      <div class="van-ellipsis">
        <hooper :autoPlay="true" :playSpeed="5000" :transition="500" :vertical="true" v-if="repositories.length>0">
          <slide v-for="(item, index) in repositories" :key="index" @click.native="clickItem(item)" class="van-ellipsis">
            <span>{{item.title}}</span>
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
    components: {
      Hooper,
      Slide
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        repositories: []
      };
    },
    async created() {
      this.repositories = await this.$http.get('/api/repositories/home');
    },
    mounted() {
    },
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
  &>div {
    *{
      border: none!important;
      outline: none!important;
    }
    &:nth-child(1) {
      font-family: FZZCHJW--GB1-0 !important;
      font-style: italic;
      color: $theme;
    }
    &:nth-child(2) {
      width: 1Px;
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
