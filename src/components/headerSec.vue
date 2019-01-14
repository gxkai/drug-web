<template>
  <div class="header-second">
    <div class="header-second__content">
      <div class="header-second__content__left"></div>
      <div class="header-second__content__center">
        <slot></slot>
      </div>
      <div class="header-second__content__right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'newHeader',
    props: ['title', 'leftIcon']
  };
</script>

<style scoped type="text/scss" lang="scss">
  .header-second {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    &__content {
      display: flex;
      align-items: center;
      &__center {
        font-family: HiraginoSansGB-W3;
        font-weight: normal;
        color: #F60032;
        margin: 0 20px;
        div {
          font-size: 28px;
        }
      }
      &__left, &__right {
        width: 117px;
        height: 1PX;
        border: 1PX solid rgba(191, 191, 191, 1);
      }
    }
  }
</style>
