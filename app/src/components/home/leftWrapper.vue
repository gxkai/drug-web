<template>
  <div>
    <left-title leftText="腹泻呕吐" leftColor="#2f69d4" />
    <div class="left-wrapper">
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
            image: require('@/assets/img/home/胃炎.png'),
            name: '胃炎',
            introduce: '清热解毒',
            typeId: 'apqD-f6ESl25k5bJG7qIeQ'
          },
          {
            image: require('@/assets/img/home/消化不良.png'),
            name: '消化不良',
            introduce: '胃肠解痉',
            typeId: 'lks1M2u5SVa216t6x35E3w'
          },
          {
            image: require('@/assets/img/home/腹泻.png'),
            name: '腹泻',
            introduce: '肺热咳嗽',
            typeId: '6NOZUuyVTT6dzMaogWGXOg\n'
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
