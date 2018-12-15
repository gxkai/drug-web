<template>
  <div class="about">
    <van-nav-bar
    :title="$route.name"
    left-arrow
    @click-left="$router.go(-1)"
    />
    <div
    class="about--content"
    >
    <div class="about--content--bg">
      <div class="about--content--text">
        {{projectInfo.introduction}}
      </div>
      <img src="../assets/image/qrcode.jpg" class="about--content--qrcode"/>
    </div>
    </div>
    <div
      class="about--footer">
      <div>{{projectInfo.copyright}}</div>
      <div>{{projectInfo.company}}</div>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .about {
    display: flex;
    flex-flow: column;
    height: 100vh;
    background-color: #f5f5f5;
    &--content {
      flex: 1;
      overflow: auto;
      &--text {
        padding: 20px 40px;
        color: white;
        font-size: 25px;
        font-weight: 200;
      }
      &--qrcode {
        position: absolute;
        height: 250px;
        width: 250px;
        left: calc((720px - 250px)/2);
        bottom: -100px;
      }
      &--bg {
        position: relative;
        background-color: #13C1FE;
        height: 400px;
        border-bottom-left-radius: 300px ;
        border-bottom-right-radius: 300px ;
      }
    }
    &--footer {
      padding: 20px;
      &>div {
        text-align: center;
        font-size: 25px;
        color: #999999;
      }
    }
  }
</style>
<script>
  export default {
    name: 'about',
    computed: {
      projectInfo() {
        return this.$store.state.projectInfo;
      }
    }
  };
</script>
