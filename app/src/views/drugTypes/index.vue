<template>
  <new-layout
              centerColor="white"
  >
    <template slot="center">
      <van-tabs v-model="active"
                swipeable
                color="#F60000"
      >
        <van-tab :title="item.type"
                 v-for="(item,index) in list"
                 :key="index"
                 class="container"
        >
          <div
            v-for="item in item.drugType"
            :key="item.id"
            class="wrapper"
            @click="$router.push({name:'/drugs',params:{typeId:item.id}})"
          >
            <img v-lazy="getImgURL(item.fileId,'MIDDLE_LOGO')"/>
            <div>{{item.type}}</div>
          </div>
        </van-tab>
      </van-tabs>
    </template>
    <template slot="bottom">
      <footer-entry :value="2"/>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  /deep/ .van-tabs {
    &__wrap {
      height: 100px !important;
      position: fixed;
    }
    &--line {
      padding-top: 100px;
    }
    .van-tab {
      color: black!important;
      &--active {
        color: $theme !important;
      }
      span {
        line-height: 100px !important;
        font-size: 25px !important;
      }
    }
  }
  .container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    .wrapper {
      background-color: white;
      padding: 20px;
      display: flex;
      flex-flow: column;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
      }
      div {
        margin-top: 10px;
        font-size: 25px;
      }
    }
  }
</style>
<script>
  import footerEntry from '@/components/footerEntry';
  export default {
    components: {
      footerEntry
    },
    name: 'drugTypes',
    data() {
      return {
        list: [],
        active: 0
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.list = await this.$http.get('/api/drugTypes');
      }
    }
  };
</script>
