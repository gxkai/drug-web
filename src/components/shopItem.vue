<template>
  <div class="item" @click="$router.push({path:'/shops/view',query:{shopId:item.id}})">
    <div class="item-left">
      <img v-lazy="item.fileId"/>
    </div>
    <div class="item-right">
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
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &-left{
      width: 200px;
      padding: 10px;
      img{
        width: 100%;
      }
    }
    &-right {
      padding: 20px;
      div {
        font-size: 25px;
      }
    }
  }
</style>
