<template>
  <div class="item">
    <div class="item-title">
      <div>
        {{item.username|asterisk}}
      </div>
      <div>
        {{timeConvert(item.createdDate)}}
      </div>
    </div>
    <div class="item-container">
      <div>
        <new-star size="smaller" :score="item.score" disabled></new-star>
      </div>
      <div>
        {{item.content||'无文字评价'}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'appraiseItem',
    props: ['item'],
    created() {}
  };
</script>

<style scoped type="text/less" lang="less">
  .item {
    width: 100%;
    background-color: white;
    margin-top: 15px;
    &-title {
      width: 100%;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1PX solid rgba(199, 199, 199, 1);
      > div {
        font-size: 20px;
        font-family: HiraginoSansGB-W3;
        color: rgba(153, 153, 153, 1);
      }
    }
    &-container {
      width: 100%;
      height: 100px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
</style>
