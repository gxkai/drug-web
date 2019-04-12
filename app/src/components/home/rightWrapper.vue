<template>
  <div>
    <left-title leftText="风湿关节" leftColor="#1cace8" />
    <div class="right-wrapper van-hairline--top">
      <div
        class="item"
        :class="`item${index + 1}`"
        v-for="(item, index) in list"
        :key="index"
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
    components: {
      leftTitle
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        list: [
          {
            image: require('@/assets/img/home/关节炎.png'),
            name: '关节炎',
            introduce: '跌打损伤',
            typeId: 'S2BIwR09QN6MNstlWcTrvQ'
          },
          {
            image: require('@/assets/img/home/肩周炎.png'),
            name: '肩周炎',
            introduce: '骨质疏松',
            typeId: 'C1Rlu40JRlS7VuxopGxA-A'
          },
          {
            image: require('@/assets/img/home/腰肌劳损.png'),
            name: '腰肌劳损',
            introduce: '骨质增生',
            typeId: 'xsE5-eyYTfC3RXEoLjCxgg'
          }
        ]
      };
    },
    created() {
    },
    mounted() {
    },
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
