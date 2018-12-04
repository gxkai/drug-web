<template>
  <new-layout class="pharmacist">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="pharmacist__item"
             v-for="(item, key) in list"
             :key="key"
        >
          <div class="pharmacist__item__first">
            <div class="pharmacist__item__first__left">
              <img v-lazy="getImgURL(item.fileId, 'LOGO')">
            </div>
            <div class="pharmacist__item__first__right">
              <div class="pharmacist__item__first__right__first">
                <span class="pharmacist__item__first__right__first__name">{{item.name}}</span>
              </div>
              <div class="pharmacist__item__first__right__second">
                多年执教经验
              </div>
            </div>
          </div>
          <div class="pharmacist__item__third">
            <span class="pharmacist__item__third__button"
            @click="$router.push({path:'/chats/view', query: {user: JSON.stringify(item)}})"
            >咨询药师</span>
          </div>
        </div>
        <new-no-data v-show="finished === true"></new-no-data>
      </van-list>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  .pharmacist {
    &__item {
      background-color: white;
      padding: 20px;
      margin-top: 20px;
      &__third {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        &__button {
          background-color: #1AB6FD;
          color: white;
          font-size: 30px;
          font-weight: 200;
          width: 200px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 5PX;
        }
      }
      &__second {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top: 20px;
        &__item {
          border: #1AB6FD 1PX solid;
          color: #1AB6FD;
          font-size: 20px;
          padding: 0 20px;
          border-radius: 10PX;
        }
      }
      &__first {
        display: flex;
        &__left {
          img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
          }
        }
        &__right {
          display: flex;
          flex-flow: column;
          justify-content: center;
          margin-left: 20px;
          flex: 1;
          overflow: hidden;
          &__first {
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &__name {
              font-size: 35px;
              font-weight: 500;
            }
            &__tag {
              border: #1AB6FD 1PX solid;
              color: #1AB6FD;
              font-size: 20px;
              padding: 0 20px;
              margin-left: 20px;
            }
          }
          &__second {
            margin-top: 10px;
            font-size: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
          }

        }
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
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: []
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      async onLoad() {
        this.pageNum++;
        const params = {
          'pageNum': this.pageNum,
          'pageSize': this.pageSize
        };
        const data = await this.$http.get('/adminPharmacists', params);
        this.isLoading = false;
        this.loading = false;
        this.list = this.list.concat(data.list);
        if (data.list.length === 0) {
          this.finished = true;
        }
      }
    }
  };
</script>
