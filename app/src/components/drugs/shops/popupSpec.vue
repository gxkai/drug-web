<template>
  <van-popup class="popup" v-model="show1" position="bottom">
    <new-drug :item="drugSpec" />
    <header>
      选择规格
    </header>
    <ul>
      <li v-for="(item, index) in drugSpecs" :key="index">
        <info-cell
          :title="item.spec"
          is-radio
          :checked="drugSpec === item"
          @click.native="
            $emit('update:drugSpec', item);
            show1 = false;
          "
        />
      </li>
    </ul>
    <new-white-space size=".5rem" />
  </van-popup>
</template>
<style scoped type="text/scss" lang="scss">
.popup {
  min-height: 400px;
  header {
    padding: 5px 20px;
    font-size: $size-small;
  }
}
</style>
<script>
import infoCell from '@/components/drugs/infoCell';
export default {
  components: {
    infoCell
  },
  model: {
    prop: 'show',
    event: 'show'
  },
  props: {
    drugInfo: {},
    show: {},
    drugSpecs: {},
    drugSpec: {}
  },
  name: '',
  mixins: [],
  watch: {
    show1(n) {
      this.$emit('show', n);
    },
    show(n) {
      this.show1 = n;
    }
  },
  computed: {},
  data() {
    return {
      show1: this.show
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
