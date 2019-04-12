<template>
  <div class="entry-wrapper van-hairline--bottom">
    <div
      class="item"
      v-for="(item, index) in jumps"
      :key="index"
      @click="$router.push(item.url)"
    >
      <div class="icon" :class="`icon${index}`">
        <van-icon name="yibaoqia-" color="white" size="0.46rem"/>
      </div>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        jumps: [
          {
            icon: 'chufang-',
            name: '我的处方',
            url: '/rxs'
          },
          {
            icon: 'yibaoqia-',
            name: '我的医保',
            url: '/account/info'
          },
          {
            icon: 'zhishiku-',
            name: '知识库',
            url: '/repositoryTypes'
          },
          {
            icon: 'yaofang-',
            name: '药房',
            url: '/shops'
          }
        ]
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  .entry-wrapper {
    padding: 20px 0;
    display: grid;
    background-color: white;
    grid-template-columns: repeat(4, 1fr);
    .item {
      display: grid;
      grid-row-gap: 10px;
      .icon {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: center;
      }
      .icon3 {
        background-image: linear-gradient(0deg,
          #70c993 0%,
          #a6d766 100%),
        linear-gradient(
            #cb8097,
            #cb8097);
        background-blend-mode: normal,
        normal;
      }
      .icon2 {
        background-image: linear-gradient(0deg,
          #f78c3d 2%,
          #fdd455 100%),
        linear-gradient(
            #cb8097,
            #cb8097);
        background-blend-mode: normal,
        normal;
      }
      .icon1 {
        background-image: linear-gradient(0deg,
          #b1fdff 0%,
          #759dff 100%),
        linear-gradient(
            #cb8097,
            #cb8097);
        background-blend-mode: normal,
        normal;
      }
      .icon0 {
        background-image: linear-gradient(0deg,
          #d7000e 2%,
          #f4a9ae 100%),
        linear-gradient(
            #cb8097,
            #cb8097);
        background-blend-mode: normal,
        normal;
      }
      span {
        font-size: $size-mini;
        justify-self: center;
      }
    }
  }
</style>
