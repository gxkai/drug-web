<template>
  <new-layout
    class="address-confirm"
    centerColor="white"
  >
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <!--<div class="address-confirm&#45;&#45;nearby&#45;&#45;search">-->
        <!--<input-->
          <!--:placeholder="searchIcon"-->
          <!--class="address-confirm&#45;&#45;nearby&#45;&#45;search__input iconfont"-->
          <!--@focus="isNearby = !isNearby"-->
        <!--&gt;-->
      <!--</div>-->
      <div class="address-confirm--filter--search">
        <form action="" onsubmit="return false;">
          <input
            :placeholder="searchIcon"
            class="address-confirm--filter--search__input iconfont"
            v-model="key"
            type="search"
            @keypress="search"
            @focus="isNearby = !isNearby"
          >
        </form>
        <!--<div class="address-confirm&#45;&#45;filter&#45;&#45;search__cancel"-->
             <!--@click="isNearby = !isNearby"-->
        <!--&gt;-->
          <!--取消-->
        <!--</div>-->
      </div>
      <div class="address-confirm--nearby" v-if="isNearby">
        <baidu-map class="address-confirm--nearby--map"
                   :center="center"
                   :zoom="zoom"
                   :scroll-wheel-zoom="true"
                   @click="getClickInfo"
        >
          <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
          </bm-marker>
        </baidu-map>
        <div class="address-confirm--nearby--content">
          <div class="address-confirm--nearby--content--item"
               @click="setPosition2()"
          >
            <div class="address-confirm--nearby--content--item__left">
              <van-icon name="location" size="3em" color="#098AFF"></van-icon>
            </div>
            <div class="address-confirm--nearby--content--item__right">
              <div class="address-confirm--nearby--content--item__right--first">
                {{name}}
              </div>
            </div>
          </div>
          <div class="address-confirm--nearby--content--item"
               v-for="nearbyPosition in nearbyPositions"
               :key="nearbyPosition.id"
               @click="setPosition(nearbyPosition)"
          >
            <div class="address-confirm--nearby--content--item__left">
              <van-icon name="radiobox" size="2em"></van-icon>
            </div>
            <div class="address-confirm--nearby--content--item__right">
              <div class="address-confirm--nearby--content--item__right--first" style="color:rgb(88, 88, 88);">
                {{nearbyPosition.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="address-confirm--filter" v-else>
        <div class="address-confirm--filter--content">
          <div class="address-confirm--filter--content--item van-hairline--top"
               v-for="keyPosition in keyPositions"
               :key="keyPosition.uid"
               @click="setPosition(keyPosition)"
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
<style scoped type="text/scss" lang="scss">
  .address-confirm {
    &--nearby {
      &--content {
        &--item {
          display: flex;
          align-items: center;
          padding: 20px 20px;
          width: 700px;
          margin: auto;
          border-bottom: 1px solid #f5f5f5;
          &__left {
            padding: 0 20px;
          }
          &__right {
            width: 550px;
            &--first {
              font-size: 27px;
              font-family: MicrosoftYaHei;
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
          font-size: 25px;
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
          font-size: 25px;
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
        center: {
          lat: 31,
          lng: 120
        },
        name: '',
        address: '',
        zoom: 15,
        isNearby: true,
        nearbyPositions: [],
        key: '',
        keyPositions: [],
        choosePosition: this.$route.params.location
      };
    },
    created() {
    },
    mounted() {
      this.getLocation();
    },
    beforeRouteLeave(to, from, next) {
      to.query.position = this.choosePosition;
      next();
    },
    methods: {
      search(e) {
        if (e.keyCode === 13) {
          this.getKeyLocation();
        }
      },
      async getClickInfo(e) {
        const params = {
          lat: e.point.lat,
          lng: e.point.lng
        };
        const data = await this.$api.getPois(params);
        this.center = data.pois[0].location;
        this.name = data.pois[0].name;
        this.nearbyPositions = data.pois;
      },
      async syncCenterAndZoom(e) {
        const { lng, lat } = e.target.getCenter();
        this.zoom = e.target.getZoom();
        const params = {
          lat: lat,
          lng: lng
        };
        const data = await this.$api.getPois(params);
        this.center = data.pois[0].location;
        this.name = data.pois[0].name;
        this.nearbyPositions = data.pois;
      },
      setPosition(position) {
        const data = {
          name: position.name,
          lat: position.location.lat,
          lng: position.location.lng
        };
        this.choosePosition = data;
        this.$router.go(-1);
      },
      setPosition2() {
        const data = {
          name: this.name,
          lat: this.center.lat,
          lng: this.center.lng
        };
        this.choosePosition = data;
        this.$router.go(-1);
      },
      async getLocation() {
        if (this.choosePosition === undefined) {
          new BMap.Geolocation().getCurrentPosition(async (r) => {
            const params = {
              lat: r.latitude,
              lng: r.longitude
            };
            this.$toast.loading({duration: 0, forbidClick: true});
            const data = await this.$api.getPois(params);
            this.$toast.clear();
            this.center = data.pois[0].location;
            this.name = data.pois[0].name;
            data.pois.splice(0, 1);
            this.nearbyPositions = data.pois;
          });
        } else {
          this.$toast.loading({duration: 0, forbidClick: true});
          const data = await this.$api.getPois(this.choosePosition);
          this.$toast.clear();
          this.center = data.pois[0].location;
          this.name = data.pois[0].name;
          data.pois.splice(0, 1);
          this.nearbyPositions = data.pois;
        }
      },
      getKeyLocation() {
        new BMap.Geolocation().getCurrentPosition(async (r) => {
          this.$toast.loading({duration: 0, forbidClick: true});
          const data = await this.$http.get(`${process.env.OUTSIDE_ROOT}/baidu/places.json?query=${this.key}&lng=${r.longitude}&lat=${r.latitude}`);
          this.$toast.clear();
          this.keyPositions = data.result;
        });
      }
    }
  };
</script>
