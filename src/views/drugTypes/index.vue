<template>
  <div class="container">
    <new-header>
      <router-link tag="i" to="/" class="iconfont ic-arrow-right" slot="left"></router-link>
      <router-link tag="i" to="/messageTypes" class="iconfont ic-xiaoxi" slot="right"></router-link>
    </new-header>

    <div class="container-main">
      <div class="drug-types">
        <div class="drug-type" v-for="(item,index) in drugkind" @click="leftLi(index)"
             v-bind:class="{'active':index==qwere}">
          {{item.type}}
        </div>
      </div>
      <div class="drugs-details-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <div v-for="item in drugkindtwo" class="drugs-details">
          <router-link :to="{path:'/drugs',query:{showDrugTitle:item.type, typeId:item.id, pageFrom:'drugType'}}">
            <img :src="getImgURL(item.fileId,'MIDDLE_LOGO')" class="img-circle"/>
            <div class="drugs-name">{{item.type}}</div>
          </router-link>
        </div>
      </div>
    </div>

    <new-footer :urlRouter="$route.path"></new-footer>
  </div>
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
      'allBottom': this.allBottom,
      'searchHeader': this.searchHeader
    },
    created: function () {
      let accounts = JSON.parse(localStorage.getItem('account'));
      if (accounts === null) {
        return false;
      } else {
        this.loadMore();
      }
    },
    methods: {
      leftLi(index) {
        this.qwere = index;
        this.drugkindtwo = this.drugkind[index].drugType;
      },
      loadMore() {
        this.$http.get('/drugTypes')
          .then((res) => {
            this.drugkind = res.data;
            this.drugkindtwo = this.drugkind[0].drugType;
          });
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
    margin: auto;
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
    height: 125px;
    border-radius: 50%;
    border: 1px solid #13C1FE;
    display: block;
    margin: auto;
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
