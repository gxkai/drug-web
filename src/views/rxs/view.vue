<template>
  <div class="rxs_view">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      id="header"
    />
    <div class="rxs_view-content" :style="contentStyle">
      <div class="rxs_view-content-header">
        处方筏
      </div>
      <div class="rxs_view-content-list">
        <div class="rxs_view-content-list-item">
          <div>
            NO：{{rx.number}}
          </div>
          <div>
            处方日期：{{timeConvert(rx.rxDate)}}
          </div>
        </div>
        <div class="rxs_view-content-list-item">
          <div>
            姓名：{{account.name}}
          </div>
          <div>
            性别：{{getGender(account.gender)}}
          </div>
          <div>
            年龄：{{account.age}}
          </div>
        </div>
        <div class="rxs_view-content-list-item">
          <div>
            医院：{{rx.hospital}}
          </div>
          <div>
            科室：{{rx.office}}
          </div>
        </div>
        <div class="rxs_view-content-list-item">
          <div>
            临床（初步）诊断：{{rx.illness}}
          </div>
        </div>
      </div>
      <div class="rxs_view-content-rp">
        <div class="rxs_view-content-rp-header">
          RP:
        </div>
        <div class="rxs_view-content-rp-content">
          <div v-for="(item,index) in rx.list" :key="index"
               class="rxs_view-content-rp-content-item">
            <div>
              {{index}}、{{item.name}} {{item.spec}} {{item.quantity}}件
              <span
                v-if="item.state ==='ENABLED'"
                class="to_use">
                可使用
              </span>
              <span
                v-else
                class="used">
                不可用
              </span>
            </div>
            <div>
              用法：{{item.usage}} {{item.frequency}} {{item.dosage}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rxs_view-footer" id="footer"
         @click="submit"
         :style="{backgroundColor: rx.state === 'ENABLED'? '#1AB6FD' : 'gray'}">
      购药
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rxId: this.$route.query.rxId,
        state: '',
        rx: [],
        account: this.$store.getters.account,
        contentStyle: {
          overflow: 'auto',
          height: 0
        }
      };
    },
    created() {
      this.$http.get('/rxs/' + this.rxId).then(
        res => {
          this.rx = res.data;
        }).catch(error => {
        this.exception(error);
      });
    },
    mounted() {
      this.contentStyle.height = (document.documentElement.clientHeight - document.getElementById('header').clientHeight - document.getElementById('footer').clientHeight) + 'px';
    },
    methods: {
      submit() {
        if (this.rx.state === 'ENABLED') {
          this.$router.push({ path: '/rxs/shops', query: { rxId: this.rxId, hospitalId: this.rx.hospitalId } });
        }
      }
    }
  };
</script>

<style type="text/less" lang="less" scoped>
  .border-bottom {
    border-bottom: 1PX solid #555555;
  }

  .border {
    border: 2PX solid #cccccc;
  }

  .to_use {
    background-color: #ef4f4f;
    border-radius: 20px;
    padding: 1px 10px;
    font-size: 25px;
  }

  .used {
    background-color: #a6a6a6;
    border-radius: 20px;
    padding: 1px 10px;
    font-size: 25px;
  }

  .rxs_view {
    &-content {
      width: 720px;
      &-header {
        width: 100%;
        padding: 10px 0;
        text-align: center;
        font-size: 40px;
        font-weight: normal;
        font-weight: 300;
        .border-bottom();
      }
      &-list {
        &-item {
          padding: 30px 30px;
          display: flex;
          justify-content: space-between;
          &>div {
            font-size: 25px;
            .border-bottom();
          }
        }
      }
      &-rp {
        padding: 20px;
        &-header {
          font-size: 40px;
          color: red;
        }
        &-content {
          .border();
          min-height: 600px;
          padding: 30px;
          &-item {
            margin-top: 10px;
            & > div {
              &:nth-child(1) {
                font-size: 30px;
                & > span {
                  margin-left: 10px;
                }
              }
              &:nth-child(2) {
                font-size: 25px;
                color: #a6a6a6;
                margin-left: 45px;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
    &-footer {
      width: 100%;
      height: 80px;
      position: fixed;
      bottom: 0;
      font-size: 40px;
      text-align: center;
      line-height: 80px;
      color: white;
    }
  }
</style>
