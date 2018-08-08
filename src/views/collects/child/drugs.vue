<!-- FIXME 字体大小 -->
<template>
  <div class="drug-container">
    <router-link v-for="(item,index) in pageList"
                 :to="{path:'/shopDrugSpecs?id=1',query:{shopDrugSpecId:item.shopDrugSpecId}}"
                 :key="index">
      <div class="collect-drug">
        <div class="collect-drug-left">
          <img v-lazy="item.imgUrl" class="is-208x149" alt="Image">
        </div>
        <div class="collect-drug-right">
          <div class="collect-drug-rightTop">
            <span>[{{item.name}}]</span>
            <span>{{item.spec}}</span>
          </div>
          <div class="collect-drug-rightBottom">
            <span class="collect-drug-shop">商家：{{item.shopName}}</span>
            <span class="text-red">￥{{item.price}}</span>
          </div>

        </div>
      </div>
    </router-link>
    <new-no-data v-if="pageList.length===0"></new-no-data>
    <new-loading v-if="process"></new-loading>
    <new-all-data v-if="pageList.length!=0"></new-all-data>
  </div>
</template>
<script>
  export default {
    name: 'collectDrugs',
    data() {
      return {
        pageNum: 0,
        pageSize: 15,
        pages: null,
        pageList: [],
        loading: false,
        process: false,
        accountId: this.$store.getters.account.id
      };
    },
    created() {
      this.loadMore();
    },
    methods: {
      loadMore() {
        if (this.pages === null || this.pageNum < this.pages) {
          this.pageNum++;
          this.loadData();
        } else {
          this.loading = true;
          this.loadData();
        }
      },
      loadData() {
        this.$http.get('/collects/drug?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            this.pages = res.data.pages;
            if (this.pages === 0) {
              this.loading = true;
              return false;
            }
            this.pageList = this.pageList.concat(res.data.list);
            this.pageList.forEach(e => {
              e.imgUrl = this.$http.get(this.getImgURL(e.fileId, 'LOGO'));
            });
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

  .drug-container {
    width: 720px;
    height: 100vh;
  }

  .collect-drug {
    width: 720px;
    padding-left: 20px;
    padding-right: 20px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    margin-bottom: 60px;
  }

  .collect-drug-left img {
    width: 208px;
    height: 149px;
    margin-right: 45px;
  }

  .collect-drug-rightTop > :nth-child(1) {
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
  }

  .collect-drug-rightTop > :last-child {
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
  }

  .collect-drug-rightBottom span {
    display: block;
  }

  .collect-drug-rightBottom > :first-child {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    margin-top: 13px;
  }

  .collect-drug-rightBottom > :last-child {
    font-size: 28px;
    color: rgba(255, 0, 0, 1);
    margin-top: 27px;
  }

</style>
