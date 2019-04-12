<template>
  <new-layout>
    <template slot="center">
      <new-white-space/>
      <div class="location-wrapper">
        <header>
          当前定位
        </header>
        <article>
          <div class="left"
          @click="setPosition(center)"
          >
            <van-icon name="dizhi-" color="#d7000e"/>
            <span>
              {{center.name}}
            </span>
          </div>
          <div class="right">
            <span
              @click="resetLocation"
            >
              重新定位
            </span>
          </div>
        </article>
      </div>
      <new-white-space/>
      <div class="rec-container">
        <header>
          收货地址
        </header>
        <div class="rec-wrapper hairline-bottom"
             v-for="item in addresses"
             :key="item.id"
             @click="setPosition(item)"
        >
          <div class="left">
            <van-icon name="dizhi-" color="#d7000e"/>
          </div>
          <div class="right">
            <div class="line1">
              {{item.room}}
            </div>
            <div class="line2">
              {{item.address}}
            </div>
            <div class="line3">
              {{`${item.consignee}    ${item.phone}`}}
            </div>
          </div>
        </div>
        <div class="add-wrapper"
             @click="loadPageAddressesEdit"
        >
          <span>
            新增
          </span>
          <van-icon name="arrow"/>
        </div>
      </div>
      <new-white-space/>
      <div class="nearby-container">
        <header>
          附近地址
        </header>
        <div class="nearby-wrapper">
          <span
            v-for="(item,index) in nearbyAddresses"
            :key="index"
            @click="setPosition(item)"
          >
          {{item.name}}
        </span>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style type="text/scss" lang="scss">
  @mixin padding {
    padding: 10px 26px;
  }
  @mixin padding-x {
    padding: 0 26px;
  }
  @mixin padding-y {
    padding: 10px 0;
  }
  @mixin header {
    font-size: $size-mini;
    color: $gray;
    @include padding-x;
    padding-top: 5px;
    background-color: white;
  }
  .nearby-container {
    header {
      @include header;
    }
    .nearby-wrapper {
      background-color: white;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      @include padding-y;
      span {
        background-color: #f5f5f5;
        border-radius: 5px;
        padding: 10px 15px;
        margin-top: 10px;
        margin-left: 20px;
        font-size: $size-mini;
      }
    }
  }
  .rec-container {
    background-color: white;
    header {
      @include header;
    }
    .rec-wrapper {
      margin-top: 20px;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 20px;
      @include padding;
      .right {
        .line2, .line3 {
          margin-top: 15px;
          font-size: $size-mini;
          color: $gray;
        }
      }
    }
    .add-wrapper {
      @include padding;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: $size-mini;
        color: $theme;
      }
    }
  }
  .location-wrapper {
    background-color: white;
    header {
      @include header;
    }
    article {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-column-gap: 20px;
      @include padding-x;
      div {
        word-break: break-word;
      }
      .right {
        span {
          font-size: 20px;
          color: $theme;
        }
      }
    }
  }
</style>
<script>
  import BMap from 'BMap';
  import { setCurrentAddress } from '@/storage';
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        addresses: [],
        nearbyAddresses: [],
        center: {
          lng: 120,
          lat: 31,
          name: '定位中'
        }
      };
    },
    created() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getAddresses();
      });
    },
    mounted() {
      this.getLocation();
    },
    methods: {
      async getAddresses() {
        this.addresses = await this.$http.get('/api/addresses');
      },
      setPosition(item) {
        const position = {
          name: item.address || item.name,
          lat: item.lat || item.location.lat,
          lng: item.lng || item.location.lng
        };
        setCurrentAddress(position);
        this.loadPageHome();
      },
      async getLocation() {
        const params = {
          lat: this.currentAddress.lat,
          lng: this.currentAddress.lng
        };
        const data = await this.$api.getPois(params);
        this.center = data.pois[0].location;
        this.center.name = data.pois[0].name;
        this.nearbyAddresses = data.pois;
      },
      async resetLocation() {
        new BMap.Geolocation().getCurrentPosition(async (r) => {
          this.$toast.loading({ duration: 0, forbidClick: true });
          console.log(r.point);
          const params = {
            lat: r.point.lat,
            lng: r.point.lng
          };
          const data = await this.$api.getPois(params);
          this.center = data.pois[0].location;
          this.center.name = data.pois[0].name;
          this.nearbyAddresses = data.pois;
        });
      }
    }
  };
</script>
