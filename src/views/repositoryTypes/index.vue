<template>
  <div class="f-body">
    <mt-header title="知识库查阅">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/messageTypes" slot="right">
        <i class="icon iconfont ic-xiaoxi"></i>
      </router-link>
    </mt-header>
    <div class="f-types">
      <router-link class="f-typeList" v-for="(repositoryType,index) in repositoryTypeList" :key="index"
                   :to="{path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}}">
        <img :src="'../assets/image/'+repositoryType.icon+'.png'" class="f_icon_img"/>
        <span class="f-title">{{ repositoryType.name }}</span>
        <i class="iconfont ic-youjiantou "></i>
      </router-link>
    </div>
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
  *{
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box
  }
  .f-body {
    width: 720px;
    height: 100vh;
  }


  .f-typeList {
    height: 80px;
    background: rgba(255, 255, 255, 1);
    width: 100%;
    display: flex;/*左对齐*/
    flex-direction: row;/**/
    align-items: center;/**/
    margin-bottom: 15px;
  }

  .f_icon_img {
    width: 58px;
    height: 58px;
    margin-left: 40px;
  }

.f-title{
  width:720px;
  font-size:28px;
  font-family:HiraginoSansGB-W3;
  color:rgba(51,51,51,1);
  margin-left: 17px;
  display: block;
}

/*.ic-rep{*/
  /*margin-right: 2px;*/
/*}*/


</style>
