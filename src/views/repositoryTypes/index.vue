<template>
  <div class="container">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push('/messageTypes')"
      ref="header"
    >
      <van-icon slot="right" name="chat"/>
    </van-nav-bar>
    <div class="container-list">
      <div v-for="(repositoryType,index) in repositoryTypeList" :key="index"
           class="container-list-item"
            @click="$router.push({path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}})">
        <div>
          <img :src="require('../../assets/image/' + repositoryType.icon + '.png')"/>
        </div>
        <div>
          {{ repositoryType.name }}
        </div>
        <div>
          <i class="iconfont ic-youjiantou"></i>
        </div>
      </div>
    </div>
    <new-no-data v-if="loadingComplete"></new-no-data>
  </div>
</template>

<script>
  export default {
    name: 'repositoryTypes',
    data() {
      return {
        repositoryTypeList: [],
        loadingComplete: false
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.$http.get('/repositoryTypes')
          .then((res) => {
            if (res.data.length > 0) {
              this.repositoryTypeList = res.data;
            } else {
              this.loadingComplete = true;
            }
          })
          .catch(err => {
            this.exception(err);
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .container {
    width: 720px;
    height: 100vh;
    &-list {
      &-item {
        display: flex;
        padding: 20px;
        position: relative;
        >div {
          &:nth-child(1) {
            width: 80px;
            img {
              vertical-align: middle;
              width: 100%;
            }
          }
          &:nth-child(2) {
            align-self: center;
            padding-left: 10px;
            font-size: 30px;
          }
          &:nth-child(3) {
            position: absolute;
            right: 0;
            top: 40px;
            .ic-youjiantou {
              font-size: 40px;
            }
          }
        }
      }
    }
  }

  .type-list {
    height: 80px;
    background: rgba(255, 255, 255, 1);
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
  }

  .icon-img {
    width: 58px;
    height: 58px;
    margin-left: 40px;
  }

  .type-title {
    width: 720px;
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
    margin-left: 17px;
    display: block;
  }

</style>
