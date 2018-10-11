<template>
  <div>
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      id="header"
    />
    <div :style="contentStyle" class="body">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">

          <div v-for="pages in list">
            <div v-for="drug in pages.drugs">
              <new-drug-refund class="mt-l-25"
                               :pages="pages" :drug="drug"></new-drug-refund>
            </div>
          </div>
          <new-no-data v-if="finished"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderRefundList',
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        contentStyle: {
          height: 0,
          overflow: 'auto'
        }
      };
    },
    created() {
    },
    mounted() {
      this.contentStyle.height = (document.documentElement.clientHeight - document.getElementById('header').clientHeight) + 'px';
    },
    methods: {
      onRefresh() {
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      onLoad() {
        this.pageNum++;
        this.$http.get('/orderRefunds', {
          params: {
            'pageNum': this.pageNum,
            'pageSize': this.pageSize
          }
        })
          .then(res => {
            this.isLoading = false;
            this.loading = false;
            this.list = this.list.concat(res.data.list);
            console.log(this.list);
            if (res.data.list.length === 0) {
              this.finished = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>
