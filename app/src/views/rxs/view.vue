<template>
  <div>
    <new-layout>
      <template slot="center">
        <div class="info-wrapper">
          <header>
          <span class="name">
            {{ rx.hospital }}
          </span>
            <span class="tag">
            普通处方
          </span>
          </header>
          <article>
            <div class="line">
              <span> NO：{{ rx.number }} </span>
              <span> 处方日期：{{ rx.rxDate | dateFmt("YYYY年MM月DD日") }} </span>
            </div>
            <div class="line">
              <span> 姓名：{{ account.name }} </span>
              <span> 电话：{{ rx.mobilePhone }} </span>
            </div>
            <div class="line">
              <span> 性别：{{ $t(account.gender) }} </span>
              <span> 年龄：{{ account.age }} </span>
            </div>
            <div class="line">
              <span> 门诊病历号：{{ rx.clinicNo }} </span>
              <span> 科别：{{ rx.office }} </span>
            </div>
            <div class="line1">
              <span> 地址：{{ rx.place }}111111111111111 </span>
            </div>
            <div class="line1">
              <span> 临床（初步）诊断：{{ rx.illness }} </span>
            </div>
          </article>
        </div>
        <new-wing-blank class="drug-wrapper">
          <header>
            RP:
          </header>
          <article>
            <div v-for="(item,index) in rx.list" :key="index">
              <div class="wrapper">
                <div class="left">
                  <div class="line1">
                  <span>
                    {{`${index+1}、${item.name}`}}
                  </span>
                  </div>
                  <div class="line2">
                  <span>
                            {{`(用法：${item.usage}${item.frequency}${item.dosage})`}}
                </span>
                  </div>
                </div>
                <div class="right">
                <span>
                            {{`${item.quantity}*${item.spec}`}}
                </span>
                </div>
              </div>
            </div>
          </article>
        </new-wing-blank>
      </template>
      <template slot="bottom">
        <div class="submit-button"
             v-show="!hideButton"
             @click="submit"
             :style="{backgroundColor: rx.state === 'ENABLED'? '#d7000e' : '#999999'}">
        <span>
          购药
        </span>
        </div>
      </template>
    </new-layout>
  </div>
</template>
<style type="text/scss" lang="scss" scoped>
@mixin border {
  border-bottom: 1px solid #000000;
}
.submit-button {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #fefefe;
    font-size: $size-large;
  }
}
.drug-wrapper {
  background-color: white;
  header {
    margin-top: 20px;
    size: $size-normal;
    color: #ff0000;
  }
  article {
    border: 1px solid #7d7d7d;
    overflow: auto;
    padding: 0 20px;
    .wrapper {
      display: grid;
      grid-template-columns: 400px 220px;
      padding: 20px 20px;
      .left {
        .line1 {
          span {
            font-size: $size-small;
          }
        }
        .line2 {
          span {
            font-size: $size-mini;
            color: $gray;
          }
        }
      }
      .right {
        word-wrap: break-word;
        span {
          font-size: $size-mini;
        }
      }
    }
  }
}
.info-wrapper {
  padding: 10px 15px;
  background-color: white;
  .line {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    span {
      font-size: $size-small;
      color: $gray-light;
      @include border;
    }
  }

  .line1 {
    @include border;
    margin-top: 50px;
    span {
      font-size: $size-small;
      color: $gray-light;
    }
  }
  header {
    padding: 40px 0;
    position: relative;
    text-align: center;
    @include border;
    .name {
      letter-spacing: -2px;
      font-size: $size-large;
    }
    .tag {
      position: absolute;
      right: 18px;
      width: 60px;
      height: 51px;
      border: solid 1PX #ff0000;
      font-size: 22px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      color: #ff0000;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      rxId: this.$route.query.rxId,
      state: '',
      rx: [],
      hideButton: this.$route.query.hideButton || false
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      this.rx = await this.$http.get('/api/rxs/' + this.rxId);
      console.log(this.rx);
    },
    submit() {
      if (this.rx.state === 'ENABLED') {
        this.loadPageRxsShops(this.rxId, this.rx.hospitalId);
      } else {
        this.$toast('处方单已失效');
      }
    }
  }
};
</script>
