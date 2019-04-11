<template>
    <div class="wrapper">
      <div class="left" @click="$emit('click-left')">
        <van-icon :name="leftIcon" v-if="leftIcon !== undefined"/>
        <span class="left-text" v-if="leftText !== undefined">
          {{leftText}}
        </span>
      </div>
      <div class="right" @click="$emit('click-right')">
        <van-icon :name="rightIcon" v-if="rightIcon !== undefined"/>
        <span class="right-text" v-if="rightText !== undefined">
          {{rightText}}
        </span>
      </div>
    </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    props: {
      leftIcon: {},
      leftText: {},
      rightIcon: {},
      rightText: {}
    },
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
    grid-template-columns: 1fr auto;
    grid-column-gap: 20px;
    background-color: white;
    padding: 10px 15px;
    .left {
      .left-text {
        font-size: $size-mini;
      }
    }
  }
</style>
