<template>
  <div class="main">
    <div class="header1">
      <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
      <span class="span1">咨询列表</span>
      <router-link tag="i" to="/messageTypes" class="iconfont ic-lingdang"></router-link>
    </div>
    <ul class="item">
      <li class="line" v-for="(item,index) in list" :key="index">
        <img :src="item.shopImage">
        <div>
          <ul>
            <li>
            <span>
            {{item.shopName}}
            </span>
            </li>
            <li>
            <span>
              {{item.lastModifiedDate}}
            </span>
            </li>
            <li>
            <span>
              {{item.message}}
            </span>
            </li>
          </ul>
        </div>
        <router-link :to="{path:'/chats/view',query:{chatId:item.id,shopId:item.shopId}}" tag="i" class="iconfont ic-youjiantou"></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        pageNum: 1,
        pageSize: 15,
        list: []
      };
    },
    created: function () {
      this.getList();
    },
    methods: {
      getList() {
        var url = '/chats?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
        this.$http.get(url).then(res => {
          this.list = res.data.list;
          this.list.forEach(e => {
            e.shopImage = this.getImgURL(e.shopImage, 'LARGE_LOGO');
            e.lastModifiedDate = this.timeConvert(e.lastModifiedDate);
          });
        });
      }
    }
  };
</script>

<style scoped>
  .main {
    background-color: whitesmoke;
    width: 720px;
    height: 100vh;
  }

  .header1 {
    width: 720px;
    height: 130px;
    font-size: 36px;
    background: rgba(19, 193, 254, 1);
    font-family: HiraginoSansGB-W3;
    color: rgba(254, 254, 254, 1);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }

  .ic-arrow-right:before {
    font-size: 50px;
  }

  .ic-lingdang:before {
    font-size: 50px;
  }
  .item {
    height: calc(100vh - 130px);
    overflow: scroll;
  }

  .item .line{
    display: inline-flex;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    justify-content: space-between;
    width: 720px;
    margin-top: 15px;
  }

  .item .line img {
    height: 149px;
  }
  .item .line ul {
    width: 400px;
  }
  .ic-youjiantou {
    font-size: 50px;
    line-height: 150px;
  }
  .item .line ul li:nth-child(1) span{
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    line-height:36px;
  }

  .item .line ul li:nth-child(2) span:nth-child(1){
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
    line-height:36px;
  }
  .item .line ul li:nth-child(2) span:nth-child(2){
    font-size:22px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    line-height:36px;
  }

  .item .line ul li:nth-child(3) span{
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(153,153,153,1);
    line-height:36px
  }

  .item .line ul li:nth-child(4) span{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
    line-height:36px;
  }
</style>
