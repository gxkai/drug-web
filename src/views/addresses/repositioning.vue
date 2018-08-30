<template>
  <div id="repositioning">
    <new-header>
      <div  slot="left">
      <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
      </div>
      <input v-model="inputVal" slot="center" class="header-input iconfont" :placeholder="searchIcon" @keyup.enter="search()">
      <span slot="right" @click="search()" class="text-l-25">搜索</span>
    </new-header>
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
        <li v-for="(library,index) in libraryList" :key="index" @click="onLibrary(index)">
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
          lng: this.$store.getters.position.lng,
          lat: this.$store.getters.position.lat
        },
        zoom: 3,
        Maps: false,
        Librarys: false,
        inputVal: '',
        positionList: [],
        libraryList: [],
        searchIcon: '\ue64c 地理位置'
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
        var url = this.$outside + '/baidu/places.json?query=' + this.inputVal;
        this.$http.get(url).then((res) => {
          this.libraryList = res.data.result;
          this.showMap(false);
        }).catch(error => {
          this.exception(error);
        });
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
        var url = this.$outside + '/baidu/maps.json?lat=' + this.center.lat + '&lng=' + this.center.lng + '&poi=true';
        this.$http.get(url).then(res => {
          this.positionList = res.data.pois;
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

<style scoped >
  .header-input{
    width: 548px;
    height: 53px;
    background: white;
    border-radius: 27px;
    border: 0;
    outline: none;
    color: black;
    padding: 0 30px;
    font-size: 25px;
  }

  .map {
    width: 720px;
    height: 563px;
  }

  .nearby {
    width: 720px;
    height: calc(100vh - 130px - 563px);
    background: rgba(255, 255, 255, 1);
    overflow: auto;
  }

  .library {
    width: 720px;
    height: calc(100vh - 128px);
    background: rgba(255, 255, 255, 1);
    overflow: auto;
  }

  .nearby .title {
    margin-left: 21px;
    margin-top: 27px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    line-height: 70px;
  }

  .line1 {
    padding: 10px 0;
  }

  .line1 i {
    color: #13C1FE;
    margin-left: 21px;
    font-size: 30px;
  }

  .line1 span {
    font-size: 26px;
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
</style>
