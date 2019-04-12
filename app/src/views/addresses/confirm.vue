<template>
  <new-layout>
    <template slot="top">
      <new-search-bar :placeholder="placeholder" v-model="keyword" @search="search"/>
    </template>
    <template slot="center">
      <div v-if="show">
        <baidu-map
          class="baidu-map"
          :center="center"
          :zoom="zoom"
          @click="getClickInfo"
          @moveend="syncCenterAndZoom"
          :scroll-wheel-zoom="false"
        >
          <bm-view style="width: 100%; height:100%; flex: 1"></bm-view>
          <bm-marker :position="center"
                     :dragging="false"
                     animation="BMAP_ANIMATION_DROP"
                     :zIndex="100"
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
</style>
<script>
  import addressCell from '@/components/addresses/addressCell';
  import overlay from '@/components/baidumap/overlay';
  export default {
    name: '',
    mixins: [],
    components: {
      addressCell,
      overlay
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
          lat: 0,
          lng: 0
        },
        name: '',
        address: '',
        zoom: 18,
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
    },
    beforeRouteLeave(to, from, next) {
      to.params.position = this.position;
      next();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.position = vm.$route.params.position;
        vm.getLocation();
      });
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
        console.log(`position:${this.position}`);
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
