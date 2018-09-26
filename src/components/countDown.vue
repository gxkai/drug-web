<template>
  <span v-if="msec >0" class="text-l-25">
     {{`${day}天${hr}小时${min}分${sec}秒` }}
  </span>
  <span v-else class="text-l-25">
    倒计时结束
  </span>
</template>

<script>
  export default {
    name: 'countDown',
    props: {
      endTime: {},
      durationDay: {
        default: 0
      },
      durationMin: {
        default: 0
      }
    },
    data() {
      return {
        day: 0,
        hr: 0,
        min: 0,
        sec: 0,
        msec: 0,
        endTimeLocal: this.endTime + this.durationDay * 86400000 + this.durationMin * 60
      };
    },
    mounted() {
      this.countdown();
    },
    created() {
    },
    methods: {
      countdown() {
        const end = this.endTimeLocal;
        const now = Date.parse(new Date());
        const msec = end - now;
        this.msec = msec;
        if (msec > 0) {
          let day = parseInt(msec / 1000 / 60 / 60 / 24);
          let hr = parseInt(msec / 1000 / 60 / 60 % 24);
          let min = parseInt(msec / 1000 / 60 % 60);
          let sec = parseInt(msec / 1000 % 60);
          this.day = day;
          this.hr = hr > 9 ? hr : '0' + hr;
          this.min = min > 9 ? min : '0' + min;
          this.sec = sec > 9 ? sec : '0' + sec;
          setTimeout(() => {
            this.countdown();
          }, 1000);
        }
      }
    }
  };
</script>

<style scoped>

</style>
