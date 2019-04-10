<template>
  <new-layout>
    <template slot="top">
      <new-search-bar :placeholder="placeholder" v-model="keyword" @search="search"/>
    </template>
    <template slot="center">
      <div v-if="show">
        <baidu-map
          class="baidu-map"
          center="昆山市"
          :zoom="zoom"
          @click="getClickInfo"
          @moveend="syncCenterAndZoom"
          :scroll-wheel-zoom="false"
        >
          <bm-view style="width: 100%; height:100%; flex: 1"></bm-view>
          <bm-marker :position="{lng: center.lng, lat: center.lat}"
                     :dragging="false"
                     animation="BMAP_ANIMATION_BOUNCE"
          >
          </bm-marker>
        </baidu-map>
        <new-white-space/>
        <address-cell
          v-for="(item,index) in nearbyPositions" :key="index"
          @click.native="setPosition(item)"
          :item="item"
        />
      </div>
      <div v-else>
        <address-cell
          v-for="(item,index) in keyPositions"
          :key="index"
          @click.native="setPosition(item)"
          :item="item"
        />
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .baidu-map {
    display: flex; flex-direction: column; height: 439px;width: 688px;margin: 0 auto;
  }
  .wrapper {
    background-color: white;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-column-gap: 20px;
    padding: 20px;
    .left {
      word-break: break-word;
      span {
        display: block;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        background-color: #d7000e;
      }
    }
    .right {
      word-break: break-word;
      .line2 {
        margin-top: 15px;
        font-size: $size-mini;
        color: $gray-light;
      }
    }
  }
</style>
<script>
  import addressCell from '@/components/addresses/addressCell';
  import BMap from 'BMap';

  export default {
    name: '',
    mixins: [],
    components: {
      addressCell
    },
    watch: {
      keyword(n) {
        if (n === '') {
          this.show = true;
        }
      }
    },
    computed: {},
    data() {
      return {
        placeholder: '\ue643搜索小区/写字楼',
        center: {
          lat: 31,
          lng: 120
        },
        name: '',
        address: '',
        zoom: 20,
        show: true,
        nearbyPositions: [],
        keyword: '',
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
      to.params.position = this.choosePosition;
      next();
    },
    methods: {
      search() {
        this.getKeyLocation();
        this.show = false;
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
            this.center = data.pois[0].location;
            this.name = data.pois[0].name;
            data.pois.splice(0, 1);
            this.nearbyPositions = data.pois;
          });
        } else {
          this.$toast.loading({duration: 0, forbidClick: true});
          const data = await this.$api.getPois(this.choosePosition);
          this.center = data.pois[0].location;
          this.name = data.pois[0].name;
          data.pois.splice(0, 1);
          this.nearbyPositions = data.pois;
        }
      },
      getKeyLocation() {
        new BMap.Geolocation().getCurrentPosition(async (r) => {
          const data = await this.$http.get(`${process.env.OUTSIDE_ROOT}/baidu/places?query=${this.keyword}&lng=${r.longitude}&lat=${r.latitude}`);
          this.keyPositions = data.result;
        });
      }
    }
  };
</script>
