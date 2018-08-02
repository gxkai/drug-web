<template>
  <div class="container">
    <new-header title="知识库查阅">
      <router-link tag="i" to="/" class="icon-font ic-arrow-right" slot="left"></router-link>
      <router-link tag="i" to="/messaypes" class="icon-font ic-xiaoxi" slot="right"></router-link>
    </new-header>
    <div class="types">
      <router-link class="type-list" v-for="(repositoryType,index) in repositoryTypeList" :key="index"
                   :to="{path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}}">
        <img v-lazy="'../assets/image/'+repositoryType.icon+'.png'" class="icon-img"/>
        <span class="type-title">{{ repositoryType.name }}</span>
        <i class="icon-font ic-youjiantou "></i>
      </router-link>
    </div>
    <new-no-data v-if="repositoryTypeList.length===0"></new-no-data>
  </div>
</template>

<script>
  export default {
    name: 'repositoryTypes',
    data() {
      return {
        repositoryTypeList: []
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.$http.get('/repositoryTypes')
          .then((res) => {
            this.repositoryTypeList = res.data;
          });
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
  }

  .container {
    width: 720px;
    height: 100vh;
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
