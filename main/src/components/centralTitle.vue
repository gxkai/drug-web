<template>
  <!--<div class="header-second">-->
    <!--<div class="header-second__content">-->
      <!--<div class="header-second__content__left"></div>-->
      <!--<div class="header-second__content__center">-->
        <!--<slot></slot>-->
      <!--</div>-->
      <!--<div class="header-second__content__right"></div>-->
    <!--</div>-->
  <!--</div>-->
  <div class="wrapper">
    <div class="item item1">
      <span></span>
    </div>
    <div class="item item2">
      <van-icon :name="icon" size="3em" :color="iconColor"/>
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
    padding: 10px 0;
    .item2 {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
      }
    }
    .item1, .item3 {
      display: flex;
      align-items: center;
      span {
        display: block;
        width: 100px;
        height: 1Px;
        background-color: black;
      }
    }
  }
</style>
