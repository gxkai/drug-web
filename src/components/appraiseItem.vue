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
        <van-rate v-model="item.score"  disabled  disabled-color="red" :size="14"></van-rate>
      </div>
      <div class="text-l-25">
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

<style scoped type="text/scss" lang="scss">
  .item {
    width: 100%;
    background-color: white;
    margin-top: 15px;
    padding: 20px;
    &-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1PX solid rgba(199, 199, 199, 1);
      > div {
        font-size: 25px;
        font-family: HiraginoSansGB-W3;
        color: rgba(153, 153, 153, 1);
      }
    }
    &-container {
      padding-top: 20px;
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .item-title{border-bottom: 1px solid #f5f5f5;}
</style>
