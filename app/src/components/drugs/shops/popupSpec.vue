<template>
  <van-popup v-model="show1" class="popup" position="bottom">
    <new-drug :item="drugSpec" />
    <header>
      选择规格
    </header>
    <ul>
      <li v-for="(item, index) in drugSpecs" :key="index">
        <info-cell
          :title="item.spec"
          :checked="drugSpec === item"
          is-radio
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
  name: '',
  components: {
    infoCell
  },
  mixins: [],
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
  data() {
    return {
      show1: this.show
    };
  },
  computed: {},
  watch: {
    show1(n) {
      this.$emit('show', n);
    },
    show(n) {
      this.show1 = n;
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
