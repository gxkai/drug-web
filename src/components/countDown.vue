<template>
  <span v-if="msec >0">
     {{`${day}天${hr}小时${min}分${sec}秒结束` }}
  </span>
  <span v-else>
    结束
  </span>
</template>

<script>
  export default {
    name: 'countDown',
    props: ['endTime'],
    data() {
      return {
        day: 0,
        hr: 0,
        min: 0,
        sec: 0,
        msec: 0
      };
    },
    mounted: function () {
      this.countdown();
    },
    created() {
      this.endTime = this.timeConvert(this.endTime);
    },
    methods: {
      countdown: function () {
        const end = Date.parse(new Date(this.endTime));
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
          const that = this;
          setTimeout(function () {
            that.countdown();
          }, 1000);
        }
      }
    }
  };
</script>

<style scoped>

</style>
