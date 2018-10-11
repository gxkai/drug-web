<template>
  <div class="container">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />

    <div class="container-main">
      <div class="drug-types">
        <div class="drug-type" v-for="(item,index) in drugkind" @click="leftLi(index)"
             :class="{'active':index==qwere}">
          {{item.type}}
        </div>
      </div>
      <div class="drugs-details-list">
        <div v-for="item in drugkindtwo" class="drugs-details">
          <router-link :to="{path:'/drugs',query:{showDrugTitle:item.type, typeId:item.id, pageFrom:'drugType'}}">
            <img v-lazy="getImgURL(item.fileId,'MIDDLE_LOGO')" class="img-circle"/>
            <div class="drugs-name">{{item.type}}</div>
          </router-link>
        </div>
      </div>
    </div>

    <van-tabbar
      :value="2"
      ref="footer"
    >
      <van-tabbar-item icon="icon"
                       to="/">首页
      </van-tabbar-item>
      <van-tabbar-item icon="chufang"
                       to="/rxs">处方单
      </van-tabbar-item>
      <van-tabbar-item icon="fenlei"
                       to="/drugTypes">分类
      </van-tabbar-item>
      <van-tabbar-item icon="gouwuche2"
                       to="/carts">购物车
      </van-tabbar-item>
      <van-tabbar-item icon="wo"
                       to="/accounts">我
      </van-tabbar-item>
    </van-tabbar>  </div>
</template>

<script>
  export default {
    name: 'drugTypes',
    data() {
      return {
        qwere: 0,
        drugkind: [],
        drugkindtwo: []
      };
    },
    components: {
    },
    created() {
      this.$http.get('/drugTypes')
        .then((res) => {
          this.drugkind = res.data;
          this.drugkindtwo = this.drugkind[this.qwere].drugType;
        }).catch(err => {
          this.exception(err);
        });
    },
    methods: {
      leftLi(index) {
        this.qwere = index;
        this.drugkindtwo = this.drugkind[index].drugType;
      }
    }
  };
</script>

<style lang="scss" scoped>
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

  .drug-query {
    width: 560px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: absolute;
  }

  .container-main {
    width: 682px;
    margin: 0 auto 100px;
    background: rgba(255, 255, 255, 1);
  }

  .active {
    border-bottom: 5px #1AB6FD solid !important;
    color: #1AB6FD;
  }

  .drug-types {
    display: block;
    height: 75px;
    margin-top: 20px;
    margin-bottom: 40px;
    width: 680px;
  }

  .drug-type {
    height: 60px;
    font-size: 24px;
    display: inline-block;
    margin-right: 15px;
  }

  .img-circle {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    border: 1PX solid #13C1FE;
  }

  .drugs-name {
    display: flex;
    justify-content: center;
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
  }

  .drugs-details-list {
    display: block;
    margin-top: 37px;
    overflow: auto;
  }

  .drugs-details {
    width: 140px;
    height: 150px;
    float: left;
    display: block;
    margin-right: 30px;
    margin-bottom: 75px;
  }

</style>
