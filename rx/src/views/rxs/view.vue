<template>
  <new-layout class="rxs_view"
              centerColor="white"
  >
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      slot="top"
    />
    <div class="rxs_view-content" slot="center">
      <div class="rxs_view-content-header"
           @click="submit()"
      >
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
            </div>
            <div>
              用法：{{item.usage}} {{item.frequency}} {{item.dosage}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rxs_view-footer" slot="bottom"
         @click="submit()"
         :style="{backgroundColor: rx.state === 'ENABLED'? '#1AB6FD' : 'gray'}">
      购药
    </div>
  </new-layout>
</template>

<script>
  import { getAccount } from '../../assets/js/auth';
  import BMap from 'BMap';
  export default {
    data() {
      return {
        rxId: this.$route.query.rxId,
        state: '',
        rx: []
      };
    },
    computed: {
      account() {
        return getAccount();
      }
    },
    created() {
      this.getRx();
    },
    mounted() {
      this.startLocation();
    },
    methods: {
      async getRx() {
        this.rx = await this.$http.get('/rxs/' + this.rxId);
        console.log(this.rx);
      },
      submit() {
        if (this.rx.state === 'ENABLED') {
          this.$router.push({ path: '/rxs/shops', query: { rxId: this.rxId, hospitalId: this.rx.hospitalId } });
        }
      },
      startLocation() {
        new BMap.Geolocation().getCurrentPosition(async (r) => {
          const res = await this.$http.get(this.$outside + '/baidu/maps.json?lat=' + r.latitude + '&lng=' + r.longitude + '&coordType=bd09ll' + '&poi=true');
          console.log('经纬度获取成功');
          console.log(res);
          console.log(res.pois[0].location.lng, res.pois[0].location.lat, res.pois[0].name);
          let position = {};
          position.lat = res.pois[0].location.lat;
          position.lng = res.pois[0].location.lng;
          position.name = res.pois[0].name;
          this.$store.commit('SET_POSITION', position);
        });
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
      font-size: 40px;
      text-align: center;
      line-height: 80px;
      color: white;
    }
  }
</style>
