<template>
  <div>
    <new-layout>
      <template slot="top">
        <header>
          <div class="wrapper">
            <img v-lazy="getImgURL(account.fileId, 'SMALL_LOGO')" />
            <div class="right">
              <div class="line1">
              <span class="name">
                {{ `${account.name}` }}
              </span>
                <span class="gender">
                {{ `${$t(account.gender)}` }}
              </span>
                <span class="age">
                {{ `${account.age}岁` }}
              </span>
              </div>
              <div class="line2">
              <span>
                {{ `${account.identityNumber}` }}
              </span>
              </div>
            </div>
          </div>
          <div class="search">
            <form action="" onsubmit="return false;">
              <input
                class="van-icon"
                :placeholder="placeholder"
                v-model="keyword"
                type="search"
                @keypress="search"
              />
            </form>
          </div>
        </header>
      </template>
      <template slot="center">
        <article>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <div
                class="item hairline-bottom"
                v-for="item in list"
                :key="item.id"
                @click="
               clickItem(item)
              "
              >
                <div class="left">
                  <div class="line line1 van-ellipsis">
                    <div class="left">
                    <span>
                    医院
                  </span>
                    </div>
                    <div class="right van-ellipsis">
                    <span class="van-ellipsis">
                    {{item.hospital}}
                  </span>
                    </div>
                  </div>
                  <div class="line line2 van-ellipsis">
                    <div class="left">
                    <span class="title">
                    日期
                  </span>
                    </div>
                    <div class="right van-ellipsis">
                    <span class="desc van-ellipsis">
                    {{item.rxDate|dateFmt("YYYY-MM-DD")}}
                  </span>
                    </div>
                  </div>
                  <div class="line line3 van-ellipsis">
                    <div class="left">
                    <span class="title">
                    诊断
                  </span>
                    </div>
                    <div class="right van-ellipsis">
                    <span class="desc van-ellipsis">
                    {{item.illness}}
                  </span>
                    </div>
                  </div>
                  <div class="line line4 van-ellipsis">
                    <div class="left">
                    <span class="title">
                    倒计时
                  </span>
                    </div>
                    <div class="right van-ellipsis">
                     <span class="desc van-ellipsis" v-if="item.leftTime >0">
                        <i>
                        {{item.leftTime|dateFilter("dd")}}
                      </i>
                       :
                      <i>
                        {{item.leftTime|dateFilter("hh")}}
                      </i>
                       :
                       <i>
                         {{item.leftTime|dateFilter("mm")}}
                       </i>
                       :
                       <i>
                         {{item.leftTime|dateFilter("ss")}}
                       </i>
                    </span>
                      <span v-else>
                      改处方已失效
                    </span>
                    </div>
                  </div>
                </div>
                <div class="right">
                <span>
                    {{ item.number }}
                </span>
                  <img src="../.././assets/img/rxs/处方有效.png" v-if="item.state==='ENABLED'">
                  <img src="../.././assets/img/rxs/处方无效.png" v-else>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </article>
      </template>
      <template slot="bottom">
        <van-tabbar :value="1" :fixed="false">
          <van-tabbar-item icon="shouye-" to="/home">首页</van-tabbar-item>
          <van-tabbar-item icon="chufang-" to="/rxs">处方单</van-tabbar-item>
          <van-tabbar-item icon="fenlei-" to="/drugTypes">分类</van-tabbar-item>
          <van-tabbar-item icon="gouwuche-" to="/carts"
          >购物车
          </van-tabbar-item>
          <van-tabbar-item icon="wo-" to="/accounts">我</van-tabbar-item>
        </van-tabbar>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
article {
  margin-top: 30px;
  .item {
    background-color: #ffffff;
    width: 690px;
    height: 273px;
    margin: 10px auto 0;
    display: grid;
    grid-template-columns: 1fr 200px;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .line {
        padding: 0 30px;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-column-gap: 20px;
        .left {
          justify-self: center;
          span {
            font-size: $size-normal;
            color: $gray;
          }
        }
        .right {
          justify-self: left;
          span {
            color: #010000;
            font-size: $size-mini;
          }
        }
      }
      .line4 {
        .right {
          span {
            color: #d71a17;
            i {
              display: inline-block;
              width: 50px;
              height: 24px;
              background-color: #d71a17;
              border-radius: 5px;
              color: #ffffff;
              font-size: 20px;
              text-align: center;
            }
          }
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      img {
        width: 165px;
        height: 169px;
      }
      span {
        font-size: 20px;
        color: #d71a17;
      }
    }
  }
}
header {
  background-image: url("../.././assets/img/rxs/我的处方背景图.png");
  background-size: cover;
  height: 220px;
  position: relative;
  .search {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 15px;
    top: 190px;
    z-index: 2;
    input {
      width: 690px;
      background-color: #ffffff;
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.27);
      border-radius: 12px;
      border: none;
      outline: none;
      -webkit-appearance: none;
      padding: 10px 20px;
      font-size: $size-small;
      line-height: 40px;
      &::placeholder {
        text-align: center;
        color: #cccccc;
      }
    }
  }
  .wrapper {
    img {
      width: 112px;
      height: 112px;
      border-radius: 50%;
    }
    padding: 60px 95px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    align-items: center;
    .right {
      .line1 {
        span {
          color: #fefefe;
        }
        .gender {
          margin-left: 10px;
        }
        .age {
          margin-left: 20px;
        }
      }
      .line2 {
        margin-top: 20px;
        span {
          color: #fefefe;
        }
      }
    }
  }
}
/deep/.van-nav-bar {
  .van-nav-bar__title, .van-nav-bar__text {
    color: white;
  }
  .van-nav-bar__arrow {
    &:before {
      color: white;
    }
  }
}
</style>
<script>
import list from '@/mixins/list';
export default {
  data() {
    return {
      keyword: '',
      placeholder: '\ue643 请输入诊断搜索'
    };
  },
  mixins: [list],
  computed: {},
  watch: {
    keyword(n) {
      if (n.trim() === '') {
        this.onRefresh();
      }
    }
  },
  created() {
  },
  mounted() {
    setInterval(() => {
      this.list.map(e => {
        this.$set(e, 'leftTime', this.countDownTime(e.rxDate));
      });
    });
  },
  methods: {
    countDownTime(input) {
      // 获取当前时间
      var date = new Date();
      var now = date.getTime();
      // 设置截止时间
      var endDate = new Date(input + 3 * 24 * 60 * 60 * 1000);
      var end = endDate.getTime();
      // 时间差
      var leftTime = end - now;
      return leftTime;
    },
    search(e) {
      if (e.keyCode === 13) {
        this.onRefresh();
      }
    },
    async onLoad() {
      this.loadMore();
      const params = {
        keyword: this.keyword
      };
      const data = await this.$http.get('/api/rxs', this.getParams(params));
      this.pushToList(data.list);
    },
    clickItem(item) {
      this.loadPageRxsView(item.id);
    }
  }
};
</script>
