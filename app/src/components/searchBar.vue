<template>
  <div class="nav-bar">
    <form action="" onsubmit="return false;">
      <input
        class="van-icon"
        :placeholder="placeholder"
        type="search"
        :value="value"
        @input="updateValue($event.target.value)"
        @keypress="search"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    placeholder: {},
    value: {}
  },
  computed: {},
  data() {
    return {};
  },
  created() {
    console.log(this.value);
  },
  mounted() {},
  methods: {
    search(e) {
      if (e.keyCode === 13) {
        if (this.value === '') {
          this.$toast('请输入关键字');
        } else {
          this.$emit('search');
        }
      }
    },
    updateValue(val) {
      this.$emit('input', val);
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.nav-bar {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  input {
    width: 600px;
    background-color: #f6f6f6;
    border-radius: 10px;
    border: none;
    outline: none;
    -webkit-appearance: none;
    font-size: $size-small;
    line-height: 40px;
    &::placeholder {
      text-align: center;
    }
    padding: 10px 20px;
  }
}
</style>
