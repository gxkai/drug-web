<template>
  <div class="position">
    <div class="position--search">
      <van-icon name="arrow-left" color="white" size="3em" @click="$router.go(-1)"></van-icon>
      <input v-model="value" slot="center" class="position--search--input iconfont"
             :placeholder="searchIcon"
             @keyup.enter="search()">
      <div class="position--search--right">搜索</div>
    </div>
    <div v-show="show">
      <baidu-map class="position--map" :center="center" :zoom="15">
        <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
      </baidu-map>
      <div class="position--nearby">
        <div class="position--nearby--title">附近地址</div>
        <div class="position--nearby--list">
          <div
            class="position--nearby--item"
            v-for="(position,index) in positionList" :key="index" @click="near(index)">
            <div class="position--nearby--item__top">
              <van-icon name="weizhi" color="#1AB6FD" size="3em"></van-icon>
              <span class="position--nearby--item__top--name">{{position.name}}</span>
            </div>
            <div class="position--nearby--item--bottom">
              {{position.address}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="position--library" v-show="!show">
      <div class="position--library--list">
        <div
          class="position--library--item"
          v-for="(library,index) in libraryList" :key="index" @click="onLibrary(index)">
          <div class="position--library--item__top">
            <van-icon name="weizhi" color="#1AB6FD" size="3em"></van-icon>
            <span class="position--library--item__top--name">{{library.name}}</span>
          </div>
          <div class="position--library--item--bottom">
            {{library.district}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .position {
    background: #f5f5f5;
    height: 100vh;
    &--library {
      &--list {
        height: calc(100vh - 80px);
        overflow: auto;
      }
      &--item {
        padding: 10px 20px;
        background: white;
        margin-top: 10px;
        &__top {
          display: flex;
          align-items: baseline;
          &--name {
            font-size: 25px;
            margin-left: 10px;
          }
        }
        &--bottom {
          margin-top: 10px;
          font-size: 25px;
        }
      }
    }
    &--nearby {
      &--title {
        font-size: 25px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        background: white;
      }
      &--list {
        height: calc(100vh - 40px - 80px - 563px);
        overflow: auto;
      }
      &--item {
        padding: 10px 20px;
        background: white;
        margin-top: 10px;
        &__top {
          display: flex;
          align-items: baseline;
          &--name {
            font-size: 25px;
            margin-left: 10px;
          }
        }
        &--bottom {
          margin-top: 10px;
          font-size: 25px;
        }
      }
    }
    &--map {
      height: 563px;
    }
    &--search {
      display: flex;
      height: 80px;
      align-items: center;
      padding: 0 20px;
      &--input {
        flex: 1;
        margin: 0 20px;
        height: 40px;
        font-size: 25px;
        padding: 0 20px;
        border-radius: 20px;
        border: none;
        outline: none;
        -webkit-appearance: none;
        &::placeholder {
          text-align: center;
          font-size: 25px;
        }
      }
      &--right {
        color: white;
        font-size: 25px;
        font-weight: normal;
      }
      background-color: #1AB6FD;
    }
  }
</style>
<script>
  export default {
    name: 'position',
    data() {
      return {
        center: this.$store.getters.position,
        zoom: 3,
        value: '',
        positionList: [],
        libraryList: [],
        searchIcon: '\ue64c 手动定位'
      };
    },
    computed: {
      show() {
        if (this.value.length > 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    created() {
      this.getPositionList();
    },
    methods: {
      async search() {
        const res = await this.$http.get(this.$outside + '/baidu/places.json?query=' + this.value);
        this.libraryList = res.result;
      },
      onLibrary(index) {
        let lat = this.libraryList[index].location.lat;
        let lng = this.libraryList[index].location.lng;
        let name = this.libraryList[index].name;
        let position = {
          'lat': lat,
          'lng': lng,
          'name': name
        };
        this.$store.commit('SET_POSITION', position);
        this.$router.go(-1);
      },
      near(index) {
        let lat = this.positionList[index].location.lat;
        let lng = this.positionList[index].location.lng;
        let name = this.positionList[index].name;
        let position = {
          'lat': lat,
          'lng': lng,
          'name': name
        };
        this.$store.commit('SET_POSITION', position);
        this.$router.go(-1);
      },
      async getPositionList() {
        const res = this.$http.get(this.$outside + '/baidu/maps.json?lat=' + this.center.lat + '&lng=' + this.center.lng + '&poi=true' + '&coordType=bd09ll');
        this.positionList = res.pois;
      }
    }
  };
</script>
