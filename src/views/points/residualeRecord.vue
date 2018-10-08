<template>
  <div class="residule_record">
    <van-nav-bar
      title="积分详情"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />

    <ul>

      <li v-for="(items,index) in temporary">
        <dvi class="timeReset">{{timeReset(items[0].createdDate)}}</dvi>
        <div v-for="item in items" style="width: 100%;display: block;overflow: hidden">
          <div class="residule_icon"><i class="iconfont ic-jifen01 text-FD6666"></i></div>
          <div class="residule_date">
            <p>{{item.type | TYPE}}</p>
            <p>{{timeConvert(item.createdDate)}}</p>
          </div>
          <div class="residule_points">
            {{item.point}}积分
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        pageNum: 1,
        pageSize: 15,
        temporary: []
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
      this.loadingStart();
      let _this = this;
      window.onscroll = function () {
        if (_this.getScrollTop() + _this.getClientHeight() === _this.getScrollHeight()) {
          _this.loadingStart();
        }
      };
    },
    methods: {
      getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        return scrollTop;
      },
      getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
      },
      getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      },
      timeReset(timer) {
        let date = new Date(timer);
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        return Y + '-' + M;
      },
      loadingStart() {
        let _this = this;
        _this.list = [];
        _this.$http.get('/pointRecords?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            if (_this.pageNum <= res.data.pages) {
              _this.pageNum++;
              _this.list = _this.list.concat(res.data.list);
              let times = [];
              _this.list.forEach(item => {
                times.push(_this.timeReset(item.createdDate));
              });
              times = [...new Set(times)];
              times.forEach(item => {
                let list = [];
                _this.list.forEach(item2 => {
                  if (_this.timeReset(item) === _this.timeReset(item2.createdDate)) {
                    list.push(item2);
                  }
                });
                _this.temporary.push(list);
              });
            }
            ;
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .timeReset {
    margin-left: 36px;
    font-size: 24px;
    font-weight: 400;
    color: #666666;
  }

  .iconfont {
    font-size: 100px;
  }

  .text-FD6666 {
    color: #FD6666;
  }

  .text-B7B2FA {
    color: #B7B2FA;
  }

  .residule_dates {
    display: none;
  }

  .residule_dates:first-child {
    text-indent: 16px;
    height: 65px;
    font-size: 24px;
    line-height: 65px;
    display: block !important;
  }

  .residule_record {
    width: 720px;
    background: #f5f5f5;
    height: 100vh;
    ul {
      li {
        background: white;
        width: 100%;
        overflow: hidden;
        .residule_icon {
          float: left;
          display: inline-block;
          line-height: 138px;
        }
        .residule_date {
          float: left;
          display: inline-block;
          line-height: 39px;
          margin-top: 25px;
          margin-left: 12px;
          p:first-child {
            font-size: 24px;
            font-weight: 400;
            color: rgba(85, 85, 85, 1);
            line-height: 39px;
          }
          p:nth-child(2) {
            font-size: 18px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        .residule_points {
          font-size: 30px;
          color: #FF0000;
          font-weight: 400;
          float: right;
          line-height: 138px;
          margin-right: 18px;
        }
      }
    }
  }
</style>
