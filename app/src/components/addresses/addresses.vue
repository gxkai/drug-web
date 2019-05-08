<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <new-white-space />
      <div class="wrapper">
        <header class="hairline-bottom">
          <div class="line1">
            <div class="left">
              <span>
                {{ `收件人：${item.consignee}` }}
              </span>
            </div>
            <div class="right">
              <span>
                {{ item.phone }}
              </span>
            </div>
          </div>
          <div class="line2">
            {{ `${item.address}${item.room}` }}
          </div>
        </header>
        <footer>
          <span @click="edit(item)">
            <van-icon name="bianji" />
            编辑
          </span>
          <span @click="del(item.id, index)">
            <van-icon name="shanchu-" />
            删除
          </span>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    list: {}
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    del(id, index) {
      this.$dialog.confirm({ message: '确定删除？' }).then(async () => {
        this.$toast.loading({ duration: 0, forbidClick: true });
        await this.$http.delete('/api/app/addresses/' + id);
        this.list.splice(index, 1);
      });
    },
    edit(item) {
      this.loadPageAddressesEdit(item.id);
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.wrapper {
  background-color: white;
  header {
    padding: 25px;
    .line1 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 10px;
      .left {
        word-break: break-word;
        span {
          font-size: $size-large;
        }
      }
      .right {
        justify-self: right;
        word-break: break-word;
        span {
          font-size: $size-large;
        }
      }
    }
    .line2 {
      margin-top: 20px;
      font-size: 26px;
      color: $gray;
    }
  }
  footer {
    padding: 25px;
    display: flex;
    justify-content: flex-end;
    span {
      font-size: $size-mini;
      margin-left: 10px;
    }
  }
}
</style>
