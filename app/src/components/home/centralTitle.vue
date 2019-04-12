<template>
  <div class="wrapper">
    <div class="item item1">
      <span></span>
    </div>
    <div class="item item2">
      <van-icon :name="icon" size=".5rem" :color="iconColor"/>
      <span :style="{color: textColor}">{{text}}</span>
    </div>
    <div class="item item3">
      <span></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CentralTitle',
    props: {
      text: {},
      textColor: {
        default: 'red'
      },
      icon: {},
      iconColor: {
        default: 'red'
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  /deep/.van-icon {
    padding-bottom: 10px;
  }
  .wrapper {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;
    grid-column-gap: 10px;
    padding: 20px 0;
    .item2 {
      display: flex;
      align-items: center;
      span {
        font-size: $size-normal;
      }
    }
    .item1, .item3 {
      display: flex;
      align-items: center;
      span {
        display: block;
        width: 117px;
        height: 1Px;
        background-color: $gray-light;
      }
    }
  }
</style>
