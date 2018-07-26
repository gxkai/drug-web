<template>
  <div  contenteditable="canEdit" placeholder="宝贝满足你的期待吗？说说它的优点和不足的地方吧。" v-html="innerText"
        :contenteditable="canEdit"
        @focus="isLocked"
        @blur="!isLocked"
        @input="changeText">
  </div>
</template>

<script>
	export default {
  name: 'newEditdiv',
  props: {
    value: {
      type: String,
      default: ''
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerText: this.value,
      isLocked: false
    };
  },
  watch: {
    'value'() {
      debugger;
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value;
      }
    }
  },
  methods: {
    changeText() {
      this.$emit('input', this.$el.innerHTML);
    }
  }
	};
</script>

<style scoped>
  div{
    height: 300px;
    word-break: break-all;
    word-wrap: break-word;
    outline: none;
  }

  div:empty::before{
    color: lightgrey;
    content: attr(placeholder);
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(204,204,204,1);
  }
</style>
