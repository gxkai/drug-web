<template>
  <div>
    <left-title leftText="家庭常用" />
    <div class="horizon-wrapper">
      <div
        class="item"
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
            image: require('@/assets/img/home/感冒.png'),
            name: '感冒',
            introduce: '清热解毒',
            typeId: 'cMLo_cCMRyKrd46oISOJRQ'
          },
          {
            image: require('@/assets/img/home/抗过敏.png'),
            name: '抗过敏',
            introduce: '皮炎湿疹',
            typeId: 'Nc10FphRTviCxz7vGiVr6A'
          },
          {
            image: require('@/assets/img/home/止咳.png'),
            name: '止咳化痰',
            introduce: '肺热咳嗽',
            typeId: '74exCUknTDe0qnag36LRCQ'
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
  .horizon-wrapper {
    background-color: white;
    display: grid;
    grid-template-columns: repeat(3, 207px);
    justify-content: space-evenly;
    .item {
      img {
        height: 196px;
        width: 207px;
      }
    }
  }
</style>
