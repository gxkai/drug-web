<template>
  <div>
    <baidu-map
      class="map"
      :center="center"
      :mapStyle="mapStyle"
      style="display: flex; flex-direction: column"
      :map-type="mapType"
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
          <p>{{ marker.introduction }}</p>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
    <div class="container">
      <div class="wrapper1 wrapper">
        <el-card>
          <div slot="header">
            <span>评价指数</span>
          </div>
          <el-row>
            <el-col>
              <ve-radar :data="radarData" :settings="radarSettings"></ve-radar>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div class="wrapper2 wrapper">
        <el-card>
          <div slot="header">
            <span>各类目占比</span>
          </div>
          <el-row>
            <el-col>
              <ve-ring :data="ringData1"></ve-ring>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div class="wrapper3 wrapper">
        <el-card>
          <div slot="header">
            <span>用户群体</span>
          </div>
          <el-row>
            <el-col>
              <ve-scatter :data="scatterData"></ve-scatter>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div class="wrapper4 wrapper">
        <el-card>
          <div slot="header">
            <span>药品品类占比</span>
          </div>
          <el-row>
            <el-col>
              <ve-ring :data="ringData2" :settings="ringSettings2"></ve-ring>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div class="wrapper5 wrapper">
        <el-card>
          <div slot="header">
            <span>药品监管服务平台</span>
          </div>
          <el-row>
            <el-col>
              <div class="plat">
                <div
                  class="wrapper"
                  v-for="(item, index) in platData"
                  :key="index"
                >
                  <div class="item item1">
                    <span :class="[index < 3 ? 'top' : 'bottom']">
                      {{ index }}
                    </span>
                  </div>
                  <div class="item item2">
                    <span class="ellipsis">
                      {{ item.name }}
                    </span>
                  </div>
                  <div class="item item3">
                    <span>
                      {{ item.count }}
                    </span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div class="wrapper6 wrapper"></div>
      <div class="wrapper7 wrapper"></div>
      <div class="wrapper8 wrapper"></div>
    </div>
  </div>
</template>

<script>
import Component from 'class-component'

@Component({
  components: {}
})
export default class Home {
  /**
   * 1.BMAP_NORMAL_MAP 2.BMAP_PERSPECTIVE_MAP 3.BMAP_SATELLITE_MAP 4.BMAP_HYBRID_MAP
   * @type {string}
   */
  mapType = 'BMAP_NORMAL_MAP';
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
  radarData = {
    columns: ['对象', '咨询', '包装', '描述', '服务', '配送'],
    rows: [
      { 对象: '药房(33)', 咨询: 5, 包装: 5, 描述: 5, 服务: 5, 配送: 5 },
      { 对象: '药店(22)', 咨询: 3, 包装: 3, 描述: 3, 服务: 3, 配送: 3 },
      { 对象: '全部(55)', 咨询: 4, 包装: 4, 描述: 4, 服务: 4, 配送: 4 }
    ]
  };
  radarSettings = {
    dimension: ['对象'],
    metrics: ['咨询', '包装', '描述', '服务', '配送']
  };
  scatterData = {
    columns: ['年龄', '全部', '医院', '药店'],
    rows: [
      { 年龄: '19-30', 全部: 123, 医院: 3, 药店: 1244 },
      { 年龄: '30-40', 全部: 1223, 医院: 6, 药店: 2344 },
      { 年龄: '41-60', 全部: 7123, 医院: 9, 药店: 3245 },
      { 年龄: '60+', 全部: 4123, 医院: 12, 药店: 4355 }
    ]
  };
  ringData1 = {
    columns: ['渠道', '数量'],
    rows: [
      { 渠道: '处方', 数量: 1393 },
      { 渠道: '处方流出', 数量: 3530 },
      { 渠道: '医保', 数量: 2923 }
    ]
  };
  ringData2 = {
    columns: ['药品类别', '数量'],
    rows: [
      { 药品类别: '家庭常用', 数量: 1393 },
      { 药品类别: '心脑血管', 数量: 3530 },
      { 药品类别: '抗肿瘤药', 数量: 2923 },
      { 药品类别: '五官科药', 数量: 3530 },
      { 药品类别: '妇科用品', 数量: 3530 },
      { 药品类别: '其他', 数量: 3530 }
    ]
  };
  ringSettings2 = {
    radius: [10, 100]
  };
  platData = [
    {
      name: '999感冒灵',
      count: 323234
    },
    {
      name: '999感冒灵',
      count: 323234
    },
    {
      name: '999感冒灵',
      count: 323234
    },
    {
      name: '999感冒灵',
      count: 323234
    },
    {
      name: '999感冒灵',
      count: 323234
    },
    {
      name: '999感冒灵',
      count: 323234
    },
    {
      name: '999感冒灵',
      count: 323234
    }
  ];
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
      {
        show: false,
        title: '百家惠大药房',
        introduction: '百家惠大药房',
        point: { lng: '120.897189', lat: '31.404902' }
      },
      {
        show: false,
        title: '同德堂大药房',
        introduction: '同德堂大药房',
        point: { lng: '120.956095', lat: '31.397078' }
      }
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
    grid-area: 2/1/3/2;
  }
  .wrapper {
    background-color: white;
    z-index: 1;
    opacity: 0.9;
  }
}
.plat {
  display: grid;
  grid-row-gap: 10px;
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-gap: 10px;
    .item {
      display: flex;
      overflow: hidden;
      align-items: center;
    }
    .item1 {
      span {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
      }
      .top {
        background-color: rgb(43, 61, 79);
        color: white;
      }
      .bottom {
        background-color: rgb(238, 240, 244);
        color: black;
      }
    }
  }
}
</style>
