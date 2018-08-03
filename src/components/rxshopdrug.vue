<template>
  <div class="rx-shop-drugs-box is-flex flex-row flex-item pl-20 position-relative">
    <span class="toc-tip position-absolute all-center" v-if="isOtc === true">非处</span>
    <span class="toc-tip position-absolute all-center bg-2BB292" v-else>处</span>
    <img class="is-200x200" :src="getImgURL(fileId, 'LOGO')">
    <div class="box-right is-flex flex-column flex-sa ml-40">
      <div>
        <i class="iconfont ic-yao text-13C1FE"></i>
        <span class="text-box">名称:</span>
        <span class="">{{name}}</span>
      </div>
      <div>
        <span>
           <i class="iconfont ic-yaopinshuju text-13C1FE"></i>
           <span class="text-box">规格:</span>
           <span class="">{{spec}}</span>
        </span>
      </div>
      <div>
        <i class="iconfont ic-qian text-13C1FE"></i>
        <span class="text-box">最低价:</span>
        <span class="text-red">&yen; {{price}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'rxshopdrug',
      props: {
        name: {
          default: '儿童复方感冒颗粒'
        },
        spec: {
          default: '16粒x2板/盒'
        },
        price: {
          default: 58.5
        },
        isOtc: {
          default: false
        },
        fileId: {
          default: '1'
        }
      }
    };
</script>

<style scoped>
  .rx-shop-drugs-box{
    width: 720px;
    height:216px;
    background:rgba(255,255,255,1);
  }
  .is-200x200{
    width: 200px;
    height: 200px;
  }
  .pl-20{
    padding-left: 20px !important;
    box-sizing: border-box;
  }
  .ml-40{
    margin-left: 40px !important;
  }
  .is-flex{
    display: flex !important;
  }

  .flex-row{
    flex-direction: row;
  }
  .flex-column{
    flex-direction: column;
  }
  .flex-sa{
    justify-content: space-around;
  }
  .flex-item{
    align-items: center;
  }

  .box-right{
    height: 150px;
  }
  /*处方标识*/
  .toc-tip{
    left: 5px;
    top: 5px;
    width:50px;
    height:30px;
    background:#bfbfbf;
    color:#666666;
    border-radius:100px / 50px;
  }
  .all-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .bg-2BB292{
    background: #2BB292;
    color: white;
  }
  .text-box{
    width: 90px !important;
    display: inline-block;
  }
</style>
