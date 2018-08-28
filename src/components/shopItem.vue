<template>
  <div class="item" @click="$router.push({path:'/shops/view',query:{shopId:item.id}})">
    <div class="item-image">
      <img v-lazy=""/>
    </div>
    <div class="item-text">
      <div>
        {{item.name}}
      </div>
      <div>
        <new-star :score="item.score" disabled></new-star>
      </div>
      <div>
        电话：{{item.phone}}
      </div>
      <div>
        地址：{{item.address}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shopItem',
    props: ['item']
  };
</script>

<style scoped type="text/less" lang="less">
  .item {
    width: 720px;
    height: 278px;
    display: flex;
    padding-left: 20px;
    align-items: center;
    &-image {
      img {
        width: 300px;
        height: 249px;
      }
    }
    &-text {
      margin-left: 20px;
      div:nth-child(1) {
        font-size: 30px;
        font-family: HiraginoSansGB-W3;
        color: rgba(69, 69, 69, 1);
      }
      div:nth-child(3) {
        font-size: 22px;
        font-family: HiraginoSansGB-W3;
        color: rgba(51, 51, 51, 1);
      }
      div:nth-child(4) {
        font-size: 22px;
        font-family: HiraginoSansGB-W3;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
</style>
