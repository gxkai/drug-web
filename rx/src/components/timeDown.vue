<template>
  <div id="times">
    <span class="d_Downtime">{{hour}}</span>:
    <span class="d_Downtime">{{min}}</span>:
    <span class="d_Downtime">{{second}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time: '',
        flag: false,
        day: '',
        hour: '',
        min: '',
        second: '',
        timer: ''
      };
    },
    mounted() {
      this.timer = setInterval(() => {
        if (this.flag) {
          clearInterval(this.timer);
        }
        this.timeDown();
      }, 500);
    },
    props: {
      endTime: {
        default: new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
      }
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    methods: {
      timeDown() {
        const endTime = new Date(this.endTime);
        const nowTime = new Date();
        let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
        let d = parseInt(leftTime / (24 * 60 * 60));
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24));
        let m = this.formate(parseInt(leftTime / 60 % 60));
        let s = this.formate(parseInt(leftTime % 60));
        if (leftTime <= 0) {
          this.flag = true;
          this.$emit('time-end');
        }
        this.time = `${d}天${h}小时${m}分${s}秒`;
        this.day = d;
        this.hour = h;
        this.min = m;
        this.second = s;
      },
      formate(time) {
        if (time >= 10) {
          return time;
        } else {
          return `0${time}`;
        }
      }
    }
  };
</script>
<style>
  .d_Downtime{
    background:rgba(0,0,0,1);
    border-radius:10%;
    color: white;
    font-size: 25px;
  }
  /*#times{*/
    /*display: contents;border:none;display:inline-block;*/
  /*}*/
</style>
