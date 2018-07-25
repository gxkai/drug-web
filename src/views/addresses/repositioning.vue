<template>
  <div id="repositioning">
    <div class="header1">
      <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
      <input v-model="inputVal">
      <span class="span2" @click="search()">搜索</span>
    </div>
    <div v-show="Maps">
      <baidu-map class="map" :center="center" :zoom="15">
        <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
      </baidu-map>
      <div class="nearby">
        <span class="title">附近地址</span>
        <ul>
          <li v-for="(postion,index) in positionList" :key="index" @click="near(index)">
            <div class="line1">
              <i class="iconfont ic-weizhi"></i>
              <span>{{postion.name}}</span>
            </div>
            <div class="line2">
              <span>{{postion.address}}</span>
            </div>
            <div class="dividing"></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="library" v-show="Librarys">
      <ul>
        <li v-for="(library,index) in libraryList" :key="index" @click="library(index)">
          <div class="line1">
            <i class="iconfont ic-weizhi"></i>
            <span>{{library.name}}</span>
          </div>
          <div class="line2">
            <span>{{library.district}}</span>
          </div>
          <div class="dividing"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // import {MessageBox} from 'mint-ui';

  export default {
    name: 'repositioning',
    data() {
      return {
        center: {
          lng: this.$route.query.lat,
          lat: this.$route.query.lng
        },
        zoom: 3,
        Maps: false,
        Librarys: false,
        inputVal: '',
        positionList: [],
        libraryList: []
      };
    },
    watch: {
      inputVal: function (value) {
        if (!value) {
          this.showMap(true);
        }
      }
    },
    methods: {
      search() {
        var url = '/baidu/places?query=' + this.inputVal;
        this.$http.get(url).then((res) => {
          console.log(res.data.result);
          this.libraryList = res.data.result;
          this.showMap(false);
        });
      },
      library(index) {
        let name = this.libraryList[index].name;
        let lat = this.libraryList[index].location.lat;
        let lng = this.libraryList[index].location.lng;
        let district = this.libraryList[index].district;
        let position = {
          'lat': lat,
          'lng': lng
        };
        this.$store.commit('SETPOSITION', position);
        this.$router.push({path: '/', query: {address: name, lat: lat, lng: lng, district: district}});
      },
      near(index) {
        let lat = this.pois[index].location.lat;
        let lng = this.pois[index].location.lng;
        let district = this.pois[index].address + '昆山市';
        let name = this.pois[index].name;
        let position = {
          'lat': lat,
          'lng': lng
        };
        this.$store.commit('SETPOSITION', position);
        this.$router.push({path: '/', query: {address: name, lat: lat, lng: lng, district: district}});
      },
      // getLocation() {
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
      //   } else {
      //     MessageBox('提示', '浏览器不支持获取地理位置');
      //   }
      // },
      // showPosition(position) {
      //   this.center.lat = position.coords.latitude;
      //   this.center.lng = position.coords.longitude;
      //   this.showMap(true);
      //   this.getPositionList();
      // },
      // showError(error) {
      //   switch (error.code) {
      //     case error.PERMISSION_DENIED:
      //       MessageBox('提示', 'User denied the request for Geolocation.');
      //       break;
      //     case error.POSITION_UNAVAILABLE:
      //       MessageBox('提示', 'Location information is unavailable.');
      //       break;
      //     case error.TIMEOUT:
      //       MessageBox('提示', 'The request to get user location timed out.');
      //       break;
      //     case error.UNKNOWN_ERROR:
      //       MessageBox('提示', 'An unknown error occurred.');
      //       break;
      //   }
      // },
      getPositionList() {
        var url = '/baidu/maps?lat=' + this.center.lat + '&lng=' + this.center.lng + '&poi=true';
        this.$http.get(url).then(res => {
          this.positionList = res.data.body.pois;
          this.showMap(true);
        }).catch(error => {
          this.exception(error);
        });
      },
      showMap(state) {
        this.Maps = state;
        this.Librarys = !state;
      }
    },
    created() {
      this.getPositionList();
    }
  };
</script>

<style scoped>
  .header1 {
    width: 720px;
    height: 128px;
    font-size: 36px;
    background: rgba(255, 255, 255, 1);
    font-family: HiraginoSansGB-W3;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }

  .ic-arrow-right:before {
    font-size: 50px;
  }

  .header1 input {
    width: 548px;
    height: 53px;
    background: rgba(210, 210, 210, 1);
    opacity: 0.18;
    border-radius: 27px;
    border: 0;
    outline: none;
  }

  .header1 .span2 {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(19, 193, 254, 1);
    line-height: 70px;
    padding-right: 11px;
  }

  .map {
    width: 720px;
    height: 563px;
  }

  .nearby {
    width: 720px;
    height: calc(100vh - 128px - 563px);
    background: rgba(255, 255, 255, 1);
    overflow: scroll;
  }

  .library {
    width: 720px;
    height: calc(100vh - 128px);
    background: rgba(255, 255, 255, 1);
    overflow: scroll;
  }

  .nearby .title {
    margin-left: 21px;
    margin-top: 27px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    line-height: 70px;
  }

  .line1 i {
    color: #13C1FE;
    margin-left: 21px;
  }

  .line2 span {
    margin-left: 21px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .dividing {
    width: 680px;
    height: 2px;
    background: rgba(229, 229, 229, 1);
    margin-left: 19px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  /*.bm-view {*/
  /*width: 100%;*/
  /*height: 280px;*/
  /*}*/
  /*.ic-ditu{color: #1AB6FD;}*/
  /*.opcaity0{opacity: 0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;}*/
  /*.ellpisos{width: 100%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}*/
  /*.nearAddress{width: 96%;margin: auto;}*/
  /*.nearAddress div{height: 3rem;line-height: 3rem;}*/
  /*.nearAddress p{height: 2rem;line-height: 2rem;}*/
  /*.top{color: #333333;}*/
  /*.bottom{color: #999999;}*/
  /*.nearLi{border-bottom: 1px solid #e5e5e5;margin-top: 0.5rem;padding-bottom: 0.5rem;}*/
  /*#d_library{position:absolute;top:4rem;background:white;color:#333333;z-index:9999;width:100%;text-align:left;text-indent: 1rem;width: 96%;}*/
  /*#d_library li{border-bottom: 1px solid #e5e5e5;height: 3.5rem;margin-top: 0.5rem;margin-bottom: 0.5rem;}*/
</style>
