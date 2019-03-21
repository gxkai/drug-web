<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <!--<new-appraise-item :item="item" v-for="(item,index) in list" :key="index"></new-appraise-item>-->
        <new-wing-blank v-for="(item,index) in list" :key="index" class="item">
          <div class="item1">
            <span>{{item.username|asterisk}}</span>
            <span>{{timeConvert(item.createdDate)}}</span>
          </div>
          <div class="item2">
            <new-star size="small" :score="item.score" disabled/>
          </div>
          <new-white-space/>
          <div class="item3">
            <span>
              {{item.content||'无文字评价'}}
            </span>
          </div>
        </new-wing-blank>
        <new-no-data v-if="finished"></new-no-data>
      </van-list>
    </van-pull-refresh>
  </div>

</template>

<script>
  export default {
    name: 'drugAppraise',
    props: ['shopDrug'],
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: []
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onRefresh() {
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      async onLoad() {
        this.pageNum++;
        const params = {
          'pageNum': this.pageNum,
          'pageSize': this.pageSize,
          'shopDrugId': this.shopDrug.id
        };
        const data = await this.$http.get('/drugAppraises', params);
        this.isLoading = false;
        this.loading = false;
        this.list = this.list.concat(data.list);
        console.log(this.list);
        if (data.list.length === 0) {
          this.finished = true;
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .item {
    display: grid;
    border-bottom: 1Px solid #999999;
    background-color: white;
    .item1 {
      display: flex;
      justify-content: space-between;
      span {
        color: rgba(51, 51, 51, 1);
        font-size: 20px;
        &:last-child {
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .item3 {
       span {
         font-size: 20px;
       }
    }
  }
</style>
