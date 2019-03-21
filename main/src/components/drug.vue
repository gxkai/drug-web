<template>
  <new-wing-blank class="wrapper">
    <div class="left">
      <new-rx-image :url="getImgURL(item.fileId)" :rx="!item.otc"/>
    </div>
    <div class="right">
      <div class="line line1">
              <span>
                {{item.name}}
              </span>
        <!--<span>-->
        <!--使用方法-->
        <!--</span>-->
      </div>
      <div class="line line2">
              <span>
                规格：{{item.spec||item.specName}}
              </span>
      </div>
      <div class="line line3">
              <span>
                ¥{{item.price}}
              </span>
        <span>
                共{{item.quantity}}件
              </span>
      </div>
    </div>
  </new-wing-blank>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    props: {
      item: {}
    },
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
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
    background-color: white;
    .right {
      display: grid;
      align-content: space-evenly;
      .line {
        display: flex;
        justify-content: space-between;
      }
      .line1 {
        span {
          font-size:20px;
          font-weight:400;
          &:nth-child(2) {
            color: $themeColor;
          }
        }
      }
      .line2 {
        span {
          font-size:20px;
          color: $greyColorLighter;
        }
      }
      .line3 {
        span {
          font-size:20px;
          font-weight:400;
          &:nth-child(1) {
            color: $themeColor;
          }
          &:nth-child(2) {
            color: $greyColorLighter;
          }
        }
      }
    }
  }
</style>
