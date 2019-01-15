<template>
  <new-layout class="point-record">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      slot="top"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad()"
      slot="center"
    >
      <div class="point-record__item van-hairline--bottom"
           v-for="(item,index) in list"
           :key="index"
      >
        <div class="point-record__item--left">
          <van-icon name="jifen01" size="8em" :color="item.type === 'EXCHANGE' ? '#B7B2FA' : '#FD6666'"></van-icon>
        </div>
        <div class="point-record__item--center">
          <div class="point-record__item--center--type">
            {{item.type|TYPE}}
          </div>
          <div class="point-record__item--center--date">
            {{timeConvert(item.createdDate)}}
          </div>

        </div>
        <div class="point-record__item--right">
            <span v-text="item.type === 'EXCHANGE' ? '-': '+' ">
            </span>
          <span>
              {{item.point}}积分
            </span>
        </div>
      </div>
      <new-no-data v-show="finished === true"></new-no-data>
    </van-list>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .point-record {
    background-color: #f5f5f5;
    &__item {
      display: flex;
      padding: 20px;
      background-color: white;
      &--left {
        align-self: center;
      }
      &--center {
        width: 400px;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        &--type {
          font-size: 24px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(85, 85, 85, 1);
        }
        &--date {
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      &--right {
        align-self: center;
        span {
          font-size: 30px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: $themeColor;
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        pageNum: 0,
        pageSize: 15
      };
    },
    filters: {
      TYPE(data) {
        if (data === 'AWARD') {
          return '奖励';
        }
        ;
        if (data === 'EXCHANGE') {
          return '兑换';
        }
        ;
        if (data === 'SIGN_IN') {
          return '签到';
        }
        ;
        if (data === 'ORDERS') {
          return '下单';
        }
        ;
      }

    },
    created() {
    },
    mounted() {
    },
    methods: {
      onLoad() {
        this.pageNum++;
        this.$axios.get('/pointRecords/', {
          params: {
            'pageNum': this.pageNum,
            'pageSize': this.pageSize
          }
        })
          .then(res => {
            this.loading = false;
            this.list = this.list.concat(res.data.list);
            console.log(res.data.list);
            if (res.data.list.length === 0) {
              this.finished = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>
