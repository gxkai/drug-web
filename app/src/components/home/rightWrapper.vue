<template>
  <div>
    <left-title left-text="风湿关节" left-color="#1cace8" />
    <div class="right-wrapper van-hairline--top">
      <div
        v-for="(item, index) in list"
        :class="`item${index + 1}`"
        :key="index"
        class="item"
        @click="loadPageDrugs(item.typeId)"
      >
        <img v-lazy="item.image" />
      </div>
    </div>
  </div>
</template>

<script>
import leftTitle from '@/components/home/leftTitle';
export default {
  name: '',
  components: {
    leftTitle
  },
  mixins: [],
  data() {
    return {
      list: [
        {
          image: require('@/assets/img/home/right1.png'),
          name: '关节炎',
          introduce: '跌打损伤',
          typeId: 'S2BIwR09QN6MNstlWcTrvQ'
        },
        {
          image: require('@/assets/img/home/right2.png'),
          name: '肩周炎',
          introduce: '骨质疏松',
          typeId: 'C1Rlu40JRlS7VuxopGxA-A'
        },
        {
          image: require('@/assets/img/home/right3.png'),
          name: '腰肌劳损',
          introduce: '骨质增生',
          typeId: 'xsE5-eyYTfC3RXEoLjCxgg'
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped type="text/scss" lang="scss">
.right-wrapper {
  width: 720px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 143px 143px;
  .item {
    background-color: white;
  }
  .item1,
  .item2 {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item1 {
    grid-area: 1/1/2/2;
  }
  .item2 {
    grid-area: 2/1/3/2;
  }
  .item3 {
    grid-area: 1/2/3/3;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
