<template>
  <div>
    <header class="height-l-6 bg-blue">
      <div class="line-height-12 height-l-2 pt-l-2 position-relative">

        <i class="icon iconfont ic-ditu width-l-1  height-l-1  text-white fz-s-14"></i>
        <span class="elps text-white width-s-47 d-inline-block" @click="nearby">江苏省昆山市
          </span>
        <i class="icon iconfont ic-arrLeft-fill text-white fz12 line-height-20 height-l-2"></i>
        <input type="text" v-model="shopName" placeholder="通用名、商品名、症状" @blur="$router.push('/components/search')"
               @keyup.enter="$router.push('/components/search')" @click="$router.push('/components/search')"
               class="width-percent-64 bg-white line-height-20 height2 text-center"/>
        <img src="/assets/image/search.png" class="position-absolute left-l-10 position-absolute width-l-2"
             style="left:10rem;width:15px;top:2.5rem;"/>
        <i class="icon iconfont ic-lingdang text-white"></i>
      </div>
    </header>
    <div class="height-l-15 has-background-grey width-percent-100"></div>
    <div class="height-l-1 has-background-grey"></div>
    <div class="bg-white height-l-13">
      <div class="d_homefour bg-white pb-l-1 pt-10 d-flex mt-s-15 width-percent-96 m-auto height-l-8">
        <router-link to="/rxs">
          <div><img src="static/img/homefirst.png"/></div>
          <div class="width-11 d-inline">我的处方</div>
        </router-link>
        <router-link to="/repositoryTypes">
          <div><img src="static/img/hometwo.png"/></div>
          <div>知识库</div>
        </router-link>
        <router-link to="/shops">
          <div><img src="static/img/homethree.png"/></div>
          <div>药房</div>
        </router-link>
        <router-link to="/">
          <div><img src="static/img/homefor.png"/></div>
          <div>移动医疗</div>
        </router-link>
      </div>
      <div class="mt-l-0 border-top-238 bg-white pt-s-6 pd-l-5 pt-l-1">
        <div class="ml-l-1 d-inline-block">
          <img src="static/img/health.png" class="width-l-3 height-l-3 align-bottom"/>
        </div>
        <div class="d-inline-block width-percent-83">
          <div class="scroll-wrap">
            <ul class="scroll-content" :style="{ top }">
              <router-link class="f_knowledgeList" v-for="(repositoryType,index) in repositoryTypeList" :key="index"
                           :to="{path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}}">
                <li style="line-height:20px;height:20px;" v-for="(repositoryType,index) in repositoryTypeList"
                    :key="index"
                    :to="{path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}}"
                    v-if="index!=2">

                  <span class="elps width-81 d-inline-block"> <span class="hot d-inline-block text-center mr1">热门</span>{{ repositoryType.name }}</span>
                </li>
              </router-link>

            </ul>
          </div>
          <div class="scroll-wrap">
            <ul class="scroll-content">
              <li style="line-height:20px;height:20px;">
                  <span class="elps width-81 d-inline-block">
                     <span class="hot d-inline-block text-center mr1">必读</span>必读必读必读</span>
              </li>
            </ul>
          </div>
          <div class="scroll-wrap">
            <ul class="scroll-content">
              <li style="line-height:20px;height:20px;">
                  <span class="elps width-81 d-inline-block">
                     <span class="hot d-inline-block text-center mr1">必读</span>必读必读必读</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="height4 fz-14 text-center text-13C1FE mt1 bg-f8 line-height-l-3">
      <span class="d-inline-block width-s-58 bg-eaeaea mr-l-1 align-super height-s-1"></span>让利惠民<span
      class="d-inline-block width-s-58 bg-eaeaea height-s-1 mr1 align-super ml-l-1"></span>
    </div>


    <div class="height-l-29 bg-white">
      <div class="m-auto width-percent-98">
        <div class="pt-10 border-right-f1f1f1 width-percent-49">
          <i class="icon iconfont ic-shijian2 text-FF9800 mr-l-5 font-weight-bold "></i>
          <!--<DownTime @time-end="message = '倒计时结束'" :endTime='endTime' style="display:inline-block;"></DownTime>-->
        </div>
        <!--中间-->
        <div class="of-hidden">
          <div class="border-right-f1f1f1 width-percent-49 d-inline-block height-l-9 border-bottom-f1f1f1 fl pb-l-1 fl">
            <div class="d-inline-block fl">
              <img
                src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=160298345,1164335257&fm=85&s=93B54322CAAA410B065B3A5D0200D0FC"
                class="width-l-3 height-l-6 ml-l-1 mr-l-1">
            </div>
            <div class="d-inline-block fl width-l-7 fl ml1">
              <p class="width-l-7 elp mt-s-l2">标题</p>
              <p><span class="text-F02B2B text-F02B2B">¥50.00</span>
                <span class="text-999999 fz-6 text-decoration-line-through">¥176.3</span></p>
            </div>
       </div>
          <div class="width-percent-49 d-inline-block height-l-9 pt-l-2 border-bottom-f1f1f1 pb-l-1">
            <div class="d-inline-block fl ml-l-1">
              <img
                src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=160298345,1164335257&fm=85&s=93B54322CAAA410B065B3A5D0200D0FC"
                class="width-l-3 height-l-6">
            </div>
            <div class="d-inline-block fl width-l-7 fl ml-l-1">
              <p class="width-l-7 elp mt-2">标题</p>
              <p><span class="text-F02B2B text-F02B2B">¥50</span> <span
                class="text-999999 fz-6 text-decoration-line-through">¥176.3</span></p>
            </div>
          </div>
        </div>
        <!--中间-->
        <!--第三部分开始-->
     <div class="height-l-15">
          <div class="width-percent-49 d-inline-block fl text-center m-auto border-right-f1f1f1 height-l-15">
           <div class="width-l-7 height-l-7  m-auto pt-l-2">
              <img
                src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=160298345,1164335257&fm=85&s=93B54322CAAA410B065B3A5D0200D0FC">
            </div>
            <p class="elp mt-l-3">名字</p>
            <p><span class="text-F02B2B text-F02B2B">¥50</span>
              <span class="text-999999 fz-6 text-decoration-line-through">¥176.3</span>
            </p>
         </div>


          <div class="width-percent-49 d-inline-block fl">
            <ul class="mt-s-12">
              <li class="border-bottom-f1f1f1 height-l-7">
                <img
                  src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=160298345,1164335257&fm=85&s=93B54322CAAA410B065B3A5D0200D0FC"
                  class="width-l-5 height-l-4 ml-l-1 d-inline-block fl mr-l-1">
                <p class="height-1"></p>
                <p class="text-F02B2B text-F02B2B mt-l-1">¥50</p>
                <p class="width-l-5 elp fl">标题标题</p>
              </li>
              <li class="mt-s-22 height-l-8">
                <img
                  src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=160298345,1164335257&fm=85&s=93B54322CAAA410B065B3A5D0200D0FC"
                  class="width-l-5 height-l-4 ml-l-1 d-inline-block fl mr-l-1">
                <p class="text-F02B2B text-F02B2B mt-l-1">¥50</p>
                <p class="width-l-5 elp fl d-inline-block">标题题</p>
              </li>
            </ul>
          </div>
        </div>

        <!--第三部分结束-->

      </div>
    </div>


    <div class="height-l-4 fz-14 text-center text-13C1FE mt1 bg-f8" style="line-height:3rem;">
      <span class="d-inline-block width-s-58 bg-eaeaea mr-l-1 align-super height-s-1"></span>
      医保定点药房
      <span class="d-inline-block width-s-58 bg-eaeaea height-s-1 mr1 align-super ml-l-1"></span>
    </div>
    <div class="height-l-4 fz-14 text-center text-13C1FE mt1 bg-f8" style="line-height:3rem;">
      <span class="d-inline-block width-s-58 bg-eaeaea mr-l-1 align-super height-s-1"></span><i
      class="icon iconfont ic-aixin text-red"></i>好货推荐<span
      class="d-inline-block width-s-58 bg-eaeaea height-s-1 mr1 align-super ml-l-1"></span>
    </div>
    <div>
      <ul>
        <li class="width-percent-50 height-l-17 border-bottom-f1f1f1 border-right-f1f1f1">
          <div
            class="mt-s-12 bg-2BB292 width-s-21 height-s-12  d-inline-block text-white text-center line-height-s-12 ml-l-1 ellipse">
            处
          </div>
          <div class="text-center">
            <img
              src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=160298345,1164335257&fm=85&s=93B54322CAAA410B065B3A5D0200D0FC"
              class="d-block width-l-13 height-l-10 m-auto"/>
          </div>
          <p class="elps text-center mt-l-1">小儿免疫蛋白颗粒</p>
          <p class="text-FF0000 elps text-center">¥56.2/盒</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data() {
      return {
        discountLists: [],
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created() {
      var url = this.URL_PATH + '/drugs/discount';
      this.$http.get(url).then(res => {
        this.discountLists = res.data;
        getImages(this.discountLists, this, 'LARGE_LOGO');
      });
    }
  }
</script>


<style scoped>
  .ellipse {
    border-radius: 100px / 50px;
  }

  .d_homefour {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
  }

  .hot {
    width: 3rem;
    height: 1.2rem;
    font-size: 0.8rem;
    color: #FF9800;
    border: 1px solid #FF9800;
    line-height: 1.2rem;
  }
</style>
