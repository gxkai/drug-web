<template>
  <div>
    <van-icon name="pingjia-2" :size="size" v-for="(item,index) in arr" :key="index" @click="change(item,index)"  :color="item?'#ffae21':'#999999'"/>
  </div>
</template>
<script>
export default {
  props: {
    score: {
      default: 5
    },
    size: {
      default: '0.46rem'
    },
    disabled: {}
  },
  name: 'newStar',
  data() {
    return {
      arr: [false, false, false, false, false],
      defaultArr: [false, false, false, false, false],
      newScore: this.score
    };
  },
  created() {
    for (let i = 0; i < this.newScore; i++) {
      this.arr[i] = true;
    }
  },
  watch: {
    score(value) {
      for (let i = 0; i < value; i++) {
        this.arr[i] = true;
      }
    },
    size(value) {

    },
    newScore(value) {
      this.$emit('update:score', value);
    }
  },
  methods: {
    change(item, index) {
      if (typeof this.disabled === 'undefined' || this.disabled !== '') {
        if (this.arr[index + 1]) {
          this.arr = this.defaultArr.map((e, i) => {
            if (i <= index) {
              return true;
            } else {
              return false;
            }
          });
          this.newScore = index + 1;
        } else if (this.arr[index] && !this.arr[index + 1]) {
          this.arr = this.defaultArr;
          this.newScore = 0;
          if (this.newScore === 0) {
            this.newScore = 1;
            this.arr[0] = true;
          }
        } else if (!this.arr[index]) {
          this.arr = this.defaultArr.map((e, i) => {
            if (i <= index) {
              return true;
            } else {
              return false;
            }
          });
          this.newScore = index + 1;
        }
      }
    }
  },
  mounted() {
  },
  computed: {
  }
};
</script>
<style scoped="scoped" type="text/scss" lang="scss">

</style>
