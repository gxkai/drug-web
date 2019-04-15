<template>
  <van-popup v-model="show1" position="bottom" class="pop">
    <div class="refund-wrapper">
      <div v-if="active === 0">
        <refund-header title="退单原因" show-close @close="show1 = false" />
        <ul>
          <li
            v-for="(item, index) in reasons"
            :key="index"
            class="hairline-bottom"
            @click="clickItem(item)"
          >
            <span>
              {{ item }}
            </span>
            <new-radio :radio="reason === item" />
          </li>
        </ul>
      </div>
      <div v-else>
        <refund-header title="其他原因" show-back @back="active = 0" />
        <article>
          <textarea v-model="desc" placeholder="请输入退单原因" />
        </article>
      </div>
      <footer>
        <span @click="confirm">
          确定
        </span>
      </footer>
    </div>
  </van-popup>
</template>

<script>
import refundHeader from '@/components/orders/refundHeader';
export default {
  name: '',
  components: {
    refundHeader
  },
  mixins: [],
  model: {
    prop: 'show',
    event: 'show'
  },
  props: {
    show: {}
  },
  data() {
    return {
      active: 0,
      show1: this.show,
      reason: '',
      desc: '',
      reasons: ['商品降价', '质量问题', '商品损坏', '缺少件', '其他原因']
    };
  },
  computed: {},
  watch: {
    show1(n) {
      this.active = 0;
      this.$emit('show', n);
    },
    show(n) {
      this.show1 = n;
    }
  },
  created() {},
  mounted() {},
  methods: {
    confirm() {
      this.show1 = false;
      this.$emit('refundConfirm');
    },
    clickItem(item) {
      if (this._.eq(item, '其他原因')) {
        this.active = 1;
      }
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.refund-wrapper {
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    span {
      width: 500px;
      height: 80px;
      background-color: #d7000e;
      border-radius: 25px;
      font-size: 36px;
      color: #ffffff;
      text-align: center;
      line-height: 80px;
    }
  }
  ul {
    li {
      display: grid;
      grid-template-columns: 1fr auto;
      padding: 20px 22px;
      span {
        color: $gray-dark;
        font-size: 27px;
      }
    }
  }
  article {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    textarea {
      padding: 26px 28px;
      border: none;
      outline: none;
      -webkit-appearance: none;
      width: 658px;
      height: 236px;
      background-color: #eeeeee;
    }
  }
}
</style>
