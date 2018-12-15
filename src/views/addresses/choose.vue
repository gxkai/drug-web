<template>
  <new-layout
    centerColor="white"
    class="address-choose"
  >
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        right-text="管理"
        @click-left="$router.go(-1)"
        @click-right="$router.push('/addresses')"
      />
    </template>
    <template slot="center">
      <div class="address-choose--current">
        <div class="address-choose--current--title">
          当前定位
        </div>
        <div class="address-choose--current--content">
          <div class="address-choose--current--content__left">
            <van-icon name="paper-airplane" color="blue" size="3em"></van-icon>
            <span>{{position.name}}</span>
          </div>
          <div class="address-choose--current--content__right"
          @click="getLocation"
          >
            重新定位
          </div>
        </div>
      </div>
      <baidu-map class="address-choose--map" :center="position.location" :zoom="15">
        <bm-marker :position="position.location" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
      </baidu-map>
      <div class="address-choose--receive">
        <div class="address-choose--receive--title">
          收货地址
        </div>
        <div class="address-choose--receive--item van-hairline--bottom"
             v-for="address in addresses"
             :key="address.id"
             @click="setPosition(address)"
        >
          <div class="address-choose--receive--item--address">
            {{address.address}}
          </div>
          <div class="address-choose--receive--item__contact">
              <span class="address-choose--receive--item__contact--name">
                {{address.consignee}}
              </span>
            <span class="address-choose--receive--item__contact--phone">
                {{address.phone}}
              </span>
          </div>
        </div>
        <div class="address-choose--receive--add"
             @click="$router.push('/addresses/edit')"
        >
          <div class="address-choose--receive--add__left"
          >
            新增地址
          </div>
          <div class="address-choose--receive--add__right">
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  .address-choose {
    &--receive {
      &--add {
        display: flex;
        justify-content: space-between;
        padding: 20px 40px;
        align-items: center;
        &__left {
          font-size: 23px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(9, 138, 255, 1);
        }
      }
      &--title {
        padding: 0 20px;
        margin-top: 20px;
        font-size: 23px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      &--item {
        padding: 20px 40px;
        &--address {
          font-size: 25px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
        &__contact {
          margin-top: 10px;
          span {
            font-size: 23px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          &--phone {
            margin-left: 20px;
          }
        }
      }
    }
    &--map {
      width: 100%;
      height: 500px;
    }
    &--current {
      padding: 0 20px;
      margin-top: 20px;
      &--title {
        font-size: 23px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      &--content {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        &__left {
          span {
            font-size: 29px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
        }
        &__right {
          font-size: 23px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(9, 138, 255, 1);
        }
      }
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
</style>

<script>
  import BMap from 'BMap';
  import { setReceivedPosition } from '../../storage';

  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        searchIcon: '\ue64c搜索小区/写字楼',
        addresses: [],
        position: {
          location: {
            lat: 31,
            lng: 130
          },
          name: '定位中...'
        }
      };
    },
    created() {
      this.getAddresses();
    },
    mounted() {
      this.getLocation();
    },
    methods: {
      async getAddresses() {
        this.addresses = await this.$http.get('/addresses');
      },
      setPosition(address) {
        const position = {
          id: address.id,
          name: address.address,
          position: {
            lat: address.lat,
            lng: address.lng
          }
        };
        setReceivedPosition(position);
        this.$router.push('/home');
      },
      getLocation() {
        new BMap.Geolocation().getCurrentPosition(async (r) => {
          const data = await this.$http.get(`${this.$outside}/baidu/maps.json?lat=${r.latitude}&lng=${r.longitude}&coordType=bd09ll&poi=true`);
          this.position = data.pois[0];
        });
      }
    }
  };
</script>
