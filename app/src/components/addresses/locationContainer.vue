<template>
  <div class="location-wrapper">
    <header>
      当前定位
    </header>
    <article>
      <div class="left"
           @click="$emit('click-left')"
      >
        <van-icon name="dizhi-" color="#d7000e"/>
        <span>
              {{center.name}}
            </span>
      </div>
      <div class="right"
           @click="$emit('click-right')"
      >
            <span
            >
              重新定位
            </span>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    props: {
      center: {}
    },
    name: '',
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
  @mixin padding {
    padding: 10px 26px;
  }
  @mixin padding-x {
    padding: 0 26px;
  }
  @mixin padding-y {
    padding: 10px 0;
  }
  @mixin header {
    font-size: $size-mini;
    color: $gray;
    @include padding-x;
    padding-top: 5px;
    background-color: white;
  }
  .location-wrapper {
    background-color: white;
    header {
      @include header;
    }
    article {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-column-gap: 20px;
      @include padding-x;
      div {
        word-break: break-word;
      }
      .right {
        span {
          font-size: 20px;
          color: $theme;
        }
      }
    }
  }
</style>
