<template>
  <new-layout class="repository-types">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="repository-types--item"
           v-for="(item,index) in list" :key="index"
           @click="$router.push({name:'/repositories',params:{repositoryTypeId:item.id,title:item.name}})"
      >
        <div class="repository-types--item__left">
       <img v-lazy="require('../../assets/image/' + item.icon + '.png')"/>
          <div>{{ item.name }}</div>
        </div>
        <div class="repository-types--item__right">
          <van-icon name="arrow" size=".5rem"></van-icon>
        </div>
      </div>
      <new-no-data v-if="finished"></new-no-data>
    </template>
  </new-layout>
</template>

<script>
  export default {
    name: 'repositoryTypes',
    data() {
      return {
        list: [],
        finished: false
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        const data = await this.$http.get('/repositoryTypes');
        if (data.length > 0) {
          this.list = data;
        } else {
          this.finished = true;
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .repository-types {
    &--item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      margin-top: 20px;
      background-color: white;
      &__left {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
          width: 100px;
          height: 100px;
        }
        &>div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 30px;
          padding: 0 20px;
        }
      }
    }
  }
</style>
