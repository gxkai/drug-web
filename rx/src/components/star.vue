<template>
  <div class="star">
    <i class="iconfont ic-xingxing default-color"  :class="[{active:item},size]"  v-for="(item,index) in arr" :key="index"
       @click="change(item,index)"></i>
  </div>
</template>
<script>
export default {
  props: {
    score: {
      default: 5
    },
    size: {
      default: 'small'
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
<style scoped="scoped" type="text/less" lang="less">
  .default-color {
    color: #CCCCCC;
  }
  .active {
    color: red;
  }
  .smaller {
    font-size: 20px;;
  }
  .small {
    font-size: 30px;
  }

  .middlerr{
    font-size: 35px;
    margin-bottom: 5px;
    display: inline-block;
  }
  .middler {
    font-size: 40px;
  }
  .middle {
    font-size: 50px;
  }
  .large {
    font-size: 70px;
  }
</style>
