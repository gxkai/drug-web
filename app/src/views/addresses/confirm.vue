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
          <bm-marker :position="center"
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
      },
      async center(n) {
        this.nearbyPositions = await this.getNearbyPosition(n);
      }
    },
    computed: {},
    data() {
      return {
        placeholder: '\ue643搜索小区/写字楼',
        center: {
        },
        name: '',
        address: '',
        zoom: 20,
        show: true,
        nearbyPositions: [],
        keyword: '',
        keyPositions: [],
        position: this.$route.params.location
      };
    },
    created() {
    },
    mounted() {
      this.getLocation();
    },
    beforeRouteLeave(to, from, next) {
      to.params.position = this.position;
      next();
    },
    methods: {
      search() {
        this.getKeyLocation();
        this.show = false;
      },
      async getClickInfo(e) {
        const point = {
          lat: e.point.lat,
          lng: e.point.lng
        };
        this.center = await this.getCurrentPosition(point);
      },
      async syncCenterAndZoom(e) {
        const { lng, lat } = e.target.getCenter();
        this.zoom = e.target.getZoom();
        const point = {
          lat: lat,
          lng: lng
        };
        this.center = await this.getCurrentPosition(point);
      },
      setPosition(position) {
        const data = {
          name: position.name,
          lat: position.location.lat,
          lng: position.location.lng
        };
        this.position = data;
        this.$router.go(-1);
      },
      async getLocation() {
        if (this.position === undefined) {
          this.center = await this.getCurrentPosition();
        } else {
          this.center = await this.getCurrentPosition(this.position);
        }
      },
      async getKeyLocation() {
        this.keyPositions = await this.getKeyPosition(this.keyword);
      }
    }
  };
</script>
