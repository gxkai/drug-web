<template>
  <div>
    <left-title left-text="腹泻呕吐" left-color="#2f69d4" />
    <div class="left-wrapper">
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
          image: require('@/assets/img/home/left1.png'),
          name: '胃炎',
          introduce: '清热解毒',
          typeId: 'apqD-f6ESl25k5bJG7qIeQ'
        },
        {
          image: require('@/assets/img/home/left2.png'),
          name: '消化不良',
          introduce: '胃肠解痉',
          typeId: 'lks1M2u5SVa216t6x35E3w'
        },
        {
          image: require('@/assets/img/home/left3.png'),
          name: '腹泻',
          introduce: '肺热咳嗽',
          typeId: '6NOZUuyVTT6dzMaogWGXOg\n'
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
.left-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 157px);
  .item {
    background-color: white;
  }
  .item2,
  .item3 {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item2 {
    grid-area: 1/2/2/3;
  }
  .item3 {
    grid-area: 2/2/3/3;
  }
  .item1 {
    grid-area: 1/1/3/2;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
