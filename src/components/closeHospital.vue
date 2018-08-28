<template>
  <div>
    <new-header bgColor="white" height="low" leftSize="small" leftColor="black" line-height="1rem">
      <div slot="left">
        <i class="iconfont ic-yaodian"></i>
      </div>
      <span slot="left" class="text-l-30"> {{hospitalInfo.hospital}}</span>
    </new-header>
    <div class="slide-content" v-for="item in hospitalInfo.list">
      <div class="image">
        <img v-lazy="">
      </div>
      <div class="text">
        <div class="top">
          <div class="name elps">{{item.name}}</div>
          <div class="spec elps">{{item.spec}}</div>
        </div>
        <div class="bottom">
          <div class="price">
            <span>¥{{item.price}}</span>
          </div>
          <div class="quantity">
            <div>
              <span>x{{item.quantity}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewCloseNormal',
    props: ['hospitalInfo'],
    created() {
    }
  };
</script>

<style scoped>
  /*块样式*/
  .slide-content {
    width: 720px;
    height: 215px;
    background-color: rgba(241, 239, 240, 1);
    display: flex;
    margin-bottom: 10px;
    padding-left: 60px;
  }

  .slide-content .image {
    width: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 1px rgba(102, 102, 102, 0.3);
    align-self: center;
  }
  .slide-content .image img {
    max-width: 100%;
  }

  .slide-content .text {
    padding-left: 20px;
  }

  .slide-content .text .top {
    height: 105px;
    width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .slide-content .text .top .name {
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .slide-content .text .top .spec {
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .slide-content .text .bottom {
    height: 110px;
    width: 460px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .slide-content .text .bottom .price {
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 0, 0, 1);
    align-self: center;
  }

  .slide-content .text .bottom .quantity {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 10px;
  }

  .slide-content .text .bottom .quantity div:nth-child(1) {
    align-self: flex-end;
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }
</style>
