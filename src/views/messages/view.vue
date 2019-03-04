<template>
  <div>
    <new-layout>
      <template slot="top">
        <van-nav-bar
          :title="title"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </template>
      <template slot="center">
        <new-wing-blank py="3em" class="item">
          <div class="item1">
           <span>
              {{item.title}}
           </span>
          </div>
          <div class="item2">
           <span>
              {{timeConvert(item.createdDate)}}
           </span>
          </div>
          <div class="item3">
            <span>
              {{item.content}}
            </span>
          </div>
        </new-wing-blank>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .item {
    display: grid;
    grid-template-columns: auto 250px;
    background-color: white;
    .item1 {
      grid-row: 1/2;
      grid-column: 1/2;
      span {
        font-size: 20px;
        font-weight:normal;
        color:rgba(51,51,51,1);
      }
    }
    .item2 {
      grid-row: 2/3;
      grid-column: 1/2;
      span {
        font-size:20px;
        font-weight:normal;
        color:rgba(102,102,102,1);
      }
    }
    .item3 {
      grid-row: 1/3;
      grid-column: 2/3;
      span {
        font-size: 20px;
        color: $themeColor;
      }
    }
  }
</style>
<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        title: '消息详情',
        messageId: this.$route.params.messageId,
        item: {
        }
      };
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        this.item = await this.$http.get(`/messages/${this.messageId}`);
      }
    }
  };
</script>
