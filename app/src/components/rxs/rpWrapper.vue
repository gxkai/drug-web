<template>
  <div class="drug-wrapper">
    <header>
      RP:
    </header>
    <article>
      <div v-for="(item, index) in list" :key="index">
        <div class="wrapper">
          <div class="left">
            <div class="line1">
              <span>
                {{ `${index + 1}、${item.name}` }}
              </span>
            </div>
            <div class="line2">
              <span>
                {{ `(用法：${item.usage}${item.frequency}${item.dosage})` }}
              </span>
            </div>
          </div>
          <div class="right">
            <span>
              {{ `${item.quantity}*${item.spec}` }}
            </span>
          </div>
        </div>
      </div>
    </article>
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
  methods: {}
};
</script>

<style scoped type="text/scss" lang="scss">
.drug-wrapper {
  background-color: white;
  padding: 10px 15px;
  header {
    margin-top: 20px;
    size: $size-normal;
    color: #ff0000;
  }
  article {
    border: 1px solid #7d7d7d;
    overflow: auto;
    padding: 0 20px;
    .wrapper {
      display: grid;
      grid-template-columns: 400px 220px;
      padding: 20px 20px;
      .left {
        .line1 {
          span {
            font-size: $size-small;
          }
        }
        .line2 {
          span {
            font-size: $size-mini;
            color: $gray;
          }
        }
      }
      .right {
        word-wrap: break-word;
        span {
          font-size: $size-mini;
        }
      }
    }
  }
}
</style>
