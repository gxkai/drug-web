<template>
    <div class="wrapper">
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
        <img src="../.././assets/img/rxs/enabled.png" v-if="item.state==='ENABLED'">
        <img src="../.././assets/img/rxs/disabled.png" v-else>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      item: {}
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  .wrapper {
    background-color: #ffffff;
    width: 690px;
    min-height: 273px;
    margin: 10px auto;
    display: grid;
    grid-template-columns: 1fr 200px;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .line {
        padding: 0 30px;
        display: grid;
        grid-template-columns: 100px 1fr;
        grid-column-gap: 20px;
        .left {
          justify-self: start;
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

</style>
