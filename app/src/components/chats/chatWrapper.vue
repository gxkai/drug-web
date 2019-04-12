<template>
  <div class="wrapper">
    <div class="left">
      <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')" />
    </div>
    <div class="right">
      <div class="line1">
        <div class="left">
          <span class="name">
            {{ item.name }}
          </span>
          <span class="tag">
            执业药师
          </span>
        </div>
        <div class="right">
          <span>
            咨询
          </span>
        </div>
      </div>
      <div class="line2">
        <new-star score="5" size=".3.8rem" disabled />
        <span class="rate">5.0</span>
        <span class="count">
          咨询量：99人
        </span>
      </div>
      <div class="line3">
        {{ item.introduce }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {}
  },
  name: '',
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped type="text/scss" lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  padding: 26px 15px;
  background-color: white;
  position: relative;
  .left {
    img {
      width: 152px;
      height: 136px;
    }
  }
  .right {
    display: grid;
    grid-row-gap: 10px;
    .line1 {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .name {
          font-size: $size-large;
        }
        .tag {
          margin-left: 10px;
          padding: 4px 10px;
          border-radius: 5px;
          border: solid 1px $theme;
          font-size: 20px;
          color: $theme;
        }
      }
      .right {
        span {
          padding: 4px 20px;
          background-color: #d7000e;
          border-radius: 15px;
          font-size: $size-mini;
          color: #ffffff;
          text-align: center;
          line-height: 30px;
        }
      }
    }
    .line2 {
      display: flex;
      align-items: center;
      .rate {
        font-size: $size-mini;
        color: $theme;
        margin-left: 5px;
      }
      .count {
        margin-left: 10px;
        font-size: 20px;
        color: $gray;
      }
    }
    .line3 {
      font-size: 20px;
      color: $gray;
    }
  }
}
</style>
