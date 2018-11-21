<template>
  <new-layout
    class="address-confirm"
    centerColor="white"
  >
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="address-confirm--nearby" v-if="isNearby">
        <div class="address-confirm--nearby--search">
          <input
            :placeholder="searchIcon"
            class="address-confirm--nearby--search__input iconfont"
            @focus="isNearby = !isNearby"
          >
        </div>
        <baidu-map class="address-confirm--nearby--map" :center="position.location" :zoom="15">
          <bm-marker :position="position.location" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
          </bm-marker>
        </baidu-map>
        <div class="address-confirm--nearby--content">
          <div class="address-confirm--nearby--content--item">
            <div class="address-confirm--nearby--content--item__left">
              <van-icon name="location" size="3em" color="#098AFF"></van-icon>
            </div>
            <div class="address-confirm--nearby--content--item__right">
              <div class="address-confirm--nearby--content--item__right--first" style="color:rgba(35,149,255,1);">
                {{position.name}}
              </div>
              <div class="address-confirm--nearby--content--item__right--second">
                {{position.address}}
              </div>
            </div>
          </div>
          <div class="address-confirm--nearby--content--item"
               v-for="nearbyPosition in nearbyPositions"
               :key="nearbyPosition.id"
          >
            <div class="address-confirm--nearby--content--item__left">
              <van-icon name="radiobox" size="2em"></van-icon>
            </div>
            <div class="address-confirm--nearby--content--item__right">
              <div class="address-confirm--nearby--content--item__right--first" style="color:rgba(0,0,0,1);">
                {{nearbyPosition.name}}
              </div>
              <div class="address-confirm--nearby--content--item__right--second">
                {{nearbyPosition.address}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="address-confirm--filter" v-else>
        <div class="address-confirm--filter--search">
          <input
            :placeholder="searchIcon"
            class="address-confirm--filter--search__input iconfont"
            v-model="key"
            @keyup.enter="getKeyLocation"
          >
          <div class="address-confirm--filter--search__cancel"
               @click="isNearby = !isNearby"
          >
            取消
          </div>
        </div>
        <div class="address-confirm--filter--content">
          <div class="address-confirm--filter--content--item van-hairline--top"
          v-for="keyPosition in keyPositions"
               :key="keyPosition.uid"
          >
            <div class="address-confirm--filter--content--item--first">
              <div class="address-confirm--filter--content--item--first__left">
                {{keyPosition.name}}
              </div>
              <div class="address-confirm--filter--content--item--first__right">
                {{keyPosition.distance/1000}}km
              </div>
            </div>
          </div>
        </div>
      </div>

    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  .address-confirm {
    &--nearby {
      &--content {
        &--item {
          display: flex;
          align-items: center;
          padding: 20px 20px;
          &__left {
            padding: 0 20px;
          }
          &__right {
            width: 550px;
            &--first {
              font-size: 27px;
              font-family: MicrosoftYaHei;
              font-weight: bold;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            &--second {
              font-size: 23px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(143, 143, 143, 1);
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
      &--map {
        margin-top: 20px;
        width: 100%;
        height: 500px;
      }
      &--search {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        &__input {
          width: 681px;
          height: 60px;
          background: rgba(210, 210, 210, 0.18);
          border: 1px solid rgba(220, 220, 220, 1);
          border-radius: 30px;
          padding: 0 40px;
          font-size: 23px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          &::placeholder {
            text-align: center;
          }
        }
      }
    }
    &--filter {
      &--content {
        margin-top: 20px;
        &--item {
          padding: 20px;
          &--first {
            display: flex;
            &__left {
              flex: 1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 27px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(0, 0, 0, 1);
            }
            &__right {
              font-size: 23px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(143, 143, 143, 1);
            }
          }
          &--second {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 23px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(143, 143, 143, 1);
          }
        }
      }
      &--search {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        align-items: center;
        &__input {
          width: 630px;
          height: 60px;
          background: rgba(210, 210, 210, 0.18);
          border: 1px solid rgba(220, 220, 220, 1);
          border-radius: 30px;
          padding: 0 40px;
          font-size: 23px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          &::placeholder {
            text-align: center;
          }
        }
        &__cancel {
          width: 80px;
          text-align: center;
          font-size: 23px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
        }
      }
    }
  }
</style>
<script>
  import BMap from 'BMap';

  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        searchIcon: '\ue64c搜索小区/写字楼',
        position: {
          name: '',
          address: '',
          location: {
            lat: '',
            lng: ''
          }
        },
        isNearby: true,
        nearbyPositions: [],
        key: '',
        keyPositions: []
      };
    },
    created() {
    },
    mounted() {
      this.getLocation();
    },
    methods: {
      getLocation() {
        new BMap.Geolocation().getCurrentPosition(async (r) => {
          const data = await this.$http.get(this.$outside + '/baidu/maps.json?lat=' + r.latitude + '&lng=' + r.longitude + '&coordType=bd09ll' + '&poi=true');
          console.log(data);
          this.position = data.pois[0];
          data.pois.splice(0, 1);
          this.nearbyPositions = data.pois;
        });
      },
      getKeyLocation() {
        new BMap.Geolocation().getCurrentPosition(async (r) => {
          const data = await this.$http.get(`${this.$outside}/baidu/places.json?query=${this.key}&lng=${r.longitude}&lat=${r.latitude}`);
          this.keyPositions = data.result;
        });
      }
    }
  };
</script>

<style scoped>

</style>
