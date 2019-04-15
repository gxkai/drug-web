<template>
  <new-layout>
    <template slot="center">
      <new-white-space />
      <div
        v-for="(item, index) in list"
        :key="index"
        class="wrapper hairline-bottom"
        @click="onClick(item)"
      >
        <div class="left">
          <div :class="`icon${index}`" class="icon">
            <van-icon :name="icons[index]" color="white" size="0.56rem" />
          </div>
        </div>
        <div class="right">
          <div class="line line1">
            <span class="name">
              {{ item.name }}
            </span>
            <span class="date">
              {{ item.date | dateFmt('YYYY-MM-DD hh:mm:ss') }}
            </span>
          </div>
          <div class="line line2">
            <span>
              {{ item.message || '暂无' }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
.wrapper {
  display: grid;
  padding: 10px 15px;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  background-color: white;
  .left {
    .icon {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .icon0 {
      background-color: rgb(136, 86, 159);
    }
    .icon1 {
      background-color: rgb(250, 158, 36);
    }
    .icon2 {
      background-color: rgb(137, 201, 151);
    }
  }
  .right {
    display: grid;
    grid-row-gap: 10px;
    .line1 {
      display: flex;
      justify-content: space-between;
      .date {
        font-size: $size-small;
        color: $gray-light;
      }
    }
    .line2 {
      span {
        font-size: $size-mini;
        color: $gray-light;
      }
    }
  }
}
</style>
<script>
export default {
  name: 'MessageTypes',
  data() {
    return {
      title: '消息类型',
      list: [],
      icons: ['xitongxiaoxi-', 'dingdanxiaoxi-', 'chufang-']
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.list = await this.$http.get('/api/messageTypes');
    },
    onClick(item) {
      this.loadPageMessages(item.name, item.messageType);
    }
  }
};
</script>
