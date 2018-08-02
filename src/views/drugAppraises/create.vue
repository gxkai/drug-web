<template>
  <div class="main">
    <new-header title="发表评论">
      <i class="icon-font ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
      <span slot="right" @click="commit()">发布</span>
    </new-header>
    <div class="body">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div class="line1">
            <img src="item.logo">
            <new-star class="star" size="middle" :score.sync="item.score"></new-star>
          </div>
          <div class="line"></div>
          <div class="line2">
            <new-edit-div v-model="item.content"></new-edit-div>
          </div>
          <div class="line3">
            <i class="icon-font ic-zhaoxiangji"></i>
            <span>你的评价能帮助其他小伙伴哦</span>
          </div>
        </li>
      </ul>
      <footer>
        <div class="title1">
          <i class="icon-font ic-shangchuanmoban"></i>
          <span>店铺评分</span>
        </div>
        <div class="content1">
          <div class="line1">
            <span>配送速度</span>
            <new-star size="small" :score.sync="deliveryScore"></new-star>
          </div>
          <div class="line2">
            <span>服务态度</span>
            <new-star size="small" :score.sync="serviceScore"></new-star>
          </div>
          <div class="line3">
            <span>描述相符</span>
            <new-star size="small" :score.sync="describeScore"></new-star>
          </div>
          <div class="line4">
            <span>商品包装</span>
            <new-star size="small" :score.sync="packageScore"></new-star>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'myAppraise',
    data() {
      return {
        orderId: this.$route.query.orderId,
        list: [],
        deliveryScore: 5,
        serviceScore: 5,
        describeScore: 5,
        packageScore: 5,
        account: this.$store.getters.account,
        shopId: '',
        drugs: []
      };
    },
    created() {
      this.$http.get('/orders/' + this.orderId + '/appraise')
        .then(res => {
          this.list = res.data;
          this.list.forEach(e => {
            e.logo = this.getImgURL(e.fileId, 'lARGE_LOGO');
            e.score = 5;
            e.content = '';
          });
          if (this.list && this.list.length > 0) {
            this.shopId = this.list[0].shopId;
          }
        });
    },
    methods: {
      commit() {
        this.list.forEach(e => {
          let data = {
            'orderItemId': e.orderItemId,
            'drugSpecId': e.drugSpecId,
            'shopDrugSpecId': e.shopDrugSpecId,
            'score': e.score,
            'content': e.content
          };
          this.drugs.push(data);
        });
        let data = {
          'accountId': this.account.id,
          'orderId': this.orderId,
          'shopId': this.shopId,
          'deliveryScore': this.deliveryScore,
          'describeScore': this.describeScore,
          'packageScore': this.packageScore,
          'serviceScore': this.serviceScore,
          'drugs': this.drugs
        };
        this.$http.post('/drugAppraises', data).then(res => {
          this.$router.push('/drugAppraises/success');
        }).catch(error => {
          this.exception(error);
        });
      }
    }
  };
</script>

<style scoped>
  .main {
    background: rgba(241, 239, 240, 1);
    width: 720px;
    height: 100vh;
  }

  .body {
    width: 720px;
    height: calc(100vh - 130px);
    overflow: scroll;
  }

  li {
    width: 720px;
    height: 620px;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 20px;
  }

  li .line {
    width: 720px;
    height: 2px;
    background: rgba(199, 199, 199, 1);
    opacity: 0.4;
  }

  li .line1 {
    display: flex;
    align-items: center;
    padding: 20px;
  }

  li .line1 img {
    height: 98px;
  }

  li .line1 .star {
    margin-left: 20px;
  }

  li .line2 {
    padding: 20px;
    height: 340px;
    background: rgba(255, 255, 255, 1);
  }

  li .line3 {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
  }

  .ic-zhaoxiangji:before {
    font-size: 70px;
    color: #CCCCCC;
  }

  li .line3 span {
    font-size: 26px;
    font-family: HiraginoSansGB-W3;
    color: rgba(204, 204, 204, 1);
  }

  .ic-shangchuanmoban {
    font-size: 50px;
    color: #CCCCCC;
  }

  footer {
    background: rgba(255, 255, 255, 1);
    padding: 20px;
  }

  footer .title1 span {
    font-size: 26px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  footer .content1 div {
    padding: 10px;
  }

  footer .content1 div {
    display: flex;
    align-items: center;
  }

</style>
