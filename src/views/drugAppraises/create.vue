<template>
  <new-layout class="drug-appraise-create">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        right-text="发布"
        @click-left="$router.go(-1)"
        @click-right="commit()"
      />
    </template>
    <template slot="center">
      <div class="drug-appraise-create__part-1"
           v-for="(item,index) in list" :key="index">
        <div class="drug-appraise-create__part-1__item">
          <div class="drug-appraise-create__part-1__item__header van-hairline--bottom">
            <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')"
                 class="drug-appraise-create__part-1__item__header--logo">
            <new-star size="middle" :score.sync="item.score"
                      class="drug-appraise-create__part-1__item__header--star"></new-star>
          </div>
        </div>
        <div class="drug-appraise-create__part-1__item__content">
          <textarea placeholder="宝贝满足你的期待吗？说说它的优点和不足的地方吧。" maxlength="200" v-model="item.content"></textarea>
        </div>
      </div>
      <div class="drug-appraise-create__part-2">
        <div class="drug-appraise-create__part-2__header">
          <van-icon name="shangchuanmoban" size="3em"></van-icon>
          <span>店铺评分</span>
        </div>
        <div class="drug-appraise-create__part-2__content">
          <div class="drug-appraise-create__part-2__content__item">
            <span class="drug-appraise-create__part-2__content__item-name">配送速度</span>
            <van-rate v-model="deliveryScore" color="red"
                      class="drug-appraise-create__part-2__content__item-rate"/>
          </div>
          <div class="drug-appraise-create__part-2__content__item">
            <span class="drug-appraise-create__part-2__content__item-name">服务态度</span>
            <van-rate v-model="serviceScore" color="red"
                      class="drug-appraise-create__part-2__content__item-rate"/>
          </div>
          <div class="drug-appraise-create__part-2__content__item">
            <span class="drug-appraise-create__part-2__content__item-name">描述相符</span>
            <van-rate v-model="describeScore" color="red"
                      class="drug-appraise-create__part-2__content__item-rate"/>
          </div>
          <div class="drug-appraise-create__part-2__content__item">
            <span class="drug-appraise-create__part-2__content__item-name">商品包装</span>
            <van-rate v-model="packageScore" color="red"
                      class="drug-appraise-create__part-2__content__item-rate"/>
          </div>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  /deep/.van-rate__item {
    width: 30px!important;
  }
</style>
<style scoped type="text/scss" lang="scss">
  .drug-appraise-create {
    &__part-2 {
      background-color: white;
      padding: 20px;
      &__header {
        span {
          font-size: 26px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
      }
      &__content {
        margin-top: 20px;
        &__item {
          display: flex;
          padding: 5px 0;
          &-rate {
            margin-left: 20px;
            margin-top: 10px;
          }
          &-name {
            font-size: 25px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }
    &__part-1 {
      background-color: white;
      margin-bottom: 20px;
      &__item {
        &__header {
          display: flex;
          align-items: center;
          padding: 20px;
          &--logo {
            width: 100px;
            height: 100px;
          }
          &--star {
            margin-left: 50px;
          }
        }
        &__content {
          textarea {
            width: 100%;
            height: 400px;
            resize: none;
            outline: none;
            padding: 40px;
            font-size: 30px;
            &::placeholder {
              font-size: 26px;
              font-family: HiraginoSansGB-W3;
              font-weight: normal;
              color: rgba(204, 204, 204, 1);
            }
          }
        }
      }
    }
  }
</style>
<script>
  import {getAccount} from '@/storage';

  export default {
    name: 'myAppraise',
    data() {
      return {
        orderId: this.$route.query.orderId,
        list: [{ score: 5 }],
        deliveryScore: 5,
        serviceScore: 5,
        describeScore: 5,
        packageScore: 5,
        account: getAccount(),
        shopId: '',
        drugs: []
      };
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        this.list = await this.$http.get('/orders/' + this.orderId + '/appraise');
        this.list.forEach(e => {
          e.score = 5;
          e.content = '';
        });
        if (this.list && this.list.length > 0) {
          this.shopId = this.list[0].shopId;
        }
      },
      async commit() {
        this.list.forEach(e => {
          let data = {
            'orderItemId': e.orderItemId,
            'drugId': e.drugId,
            'shopDrugId': e.shopDrugId,
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
        await this.$http.post('/drugAppraises', data);
        this.$router.replace('/drugAppraises/success');
      }
    }
  };
</script>
