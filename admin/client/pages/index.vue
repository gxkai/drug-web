<template>
  <div>
    <baidu-map
      class="map"
      :center="center"
      :mapStyle="mapStyle"
      style="display: flex; flex-direction: column"
    >
      <bm-boundary
        name="江苏省昆山市"
        :strokeWeight="1"
        strokeColor="#007fff"
      ></bm-boundary>
      <bm-view style="width: 100%; flex: 1"></bm-view>
      <bm-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.point"
        @click="infoWindowOpen(marker)"
      >
        <bm-info-window
          :position="marker.point"
          :title="marker.title"
          :show="marker.show"
          @close="infoWindowClose(marker)"
          @open="infoWindowOpen(marker)"
        >
          <p>{{marker.introduction}}</p>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
    <div class="container">
      <div class="wrapper1 wrapper">
        <el-row>
          <el-col>
            <span>
              评价指数
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <ve-radar :data="radarData" :settings="radarSettings"></ve-radar>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper2">

      </div>
      <div class="wrapper3 wrapper">
        <el-row>
          <el-col>
            <span>
              用户群体
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <ve-scatter :data="scatterData"></ve-scatter>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper4 wrapper">

      </div>
      <div class="wrapper5 wrapper">

      </div>
      <div class="wrapper6 wrapper">

      </div>
      <div class="wrapper7 wrapper">

      </div>
      <div class="wrapper8 wrapper">

      </div>
    </div>
  </div>
</template>

<script>
import Component from 'class-component'

@Component({
  components: {}
})
export default class Home {
  center = '昆山';
  mapStyle = {
    styleJson: [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: {
          hue: '#007fff',
          saturation: 89
        }
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: {
          color: '#ffffff'
        }
      }
    ]
  };
  markers = [];
  radarData= {
    columns: ['对象', '咨询', '包装', '描述', '服务', '配送'],
    rows: [
      { '对象': '药房(33)', '咨询': 5, '包装': 5, '描述': 5, '服务': 5, '配送': 5 },
      { '对象': '药店(22)', '咨询': 3, '包装': 3, '描述': 3, '服务': 3, '配送': 3 },
      { '对象': '全部(55)', '咨询': 4, '包装': 4, '描述': 4, '服务': 4, '配送': 4 }
    ]
  }
  radarSettings = {
    dimension: ['对象'],
    metrics: ['咨询', '包装', '描述', '服务', '配送']
  }
  scatterData= {
    columns: ['日期', '访问用户', '下单用户', '年龄'],
    rows: [
      { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
      { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344 },
      { '日期': '1/3', '访问用户': 7123, '年龄': 9, '下单用户': 3245 },
      { '日期': '1/4', '访问用户': 4123, '年龄': 12, '下单用户': 4355 },
      { '日期': '1/5', '访问用户': 3123, '年龄': 15, '下单用户': 4564 },
      { '日期': '1/6', '访问用户': 2323, '年龄': 20, '下单用户': 6537 }
    ]
  }
  mounted () {
    this.addPoints()
  }
  infoWindowClose (e) {
    e.show = false
  }
  infoWindowOpen (e) {
    e.show = true
  }
  addPoints () {
    this.markers = [
      { show: false, title: '百家惠大药房', introduction: '百家惠大药房', point: { lng: '120.897189', lat: '31.404902' } },
      { show: false, title: '同德堂大药房', introduction: '同德堂大药房', point: { lng: '120.956095', lat: '31.397078' } }
    ]
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(100vh - 60px);
  }
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    .wrapper1 {
      grid-area: 1/1/2/2;
    }
    .wrapper3 {
      grid-area: 2/1/3/2
    }
    .wrapper {
      background-color: white;
      z-index: 1;
      opacity: .9;
    }
  }
</style>
